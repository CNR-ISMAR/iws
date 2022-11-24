import React from "react"
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useGetEventsQuery } from "../../../services/seastorm";
import { usePagination } from '../../../libs/usePagination';

export default function ListEvents() {
    const { id } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1

    const { data, isLoading, isError, isSuccess } = useGetEventsQuery(`?page=${page}`);

    const pagination = usePagination({
        totPages: (data && Math.ceil(data.total / data.pageSize)) || 1,
        page,
        loadPage: p => setSearchParams(`page=${p}`)
    })

    return (
        <div className="mt-4">
            <h5>Storm Events {isSuccess && <Badge pill>{data.total}</Badge>}</h5>
            {isLoading && <Spinner animation="border" />}
            {isError && <p className="text-danger">{data.error.message}</p>}
            {isSuccess && (
                <>
                    {data.storm_event_entries.map(r => (
                        <Card key={r.id} className="my-3">
                            <Card.Body>
                                <h2></h2>
                                <Button as={Link} to={`/casestudies/${id}/runs/${r.id}/`}>Open</Button>
                            </Card.Body>
                        </Card>))}
                    {!data.total && <p>No events found</p>}
                    {pagination}
                </>
            )}
        </div>
    )
}