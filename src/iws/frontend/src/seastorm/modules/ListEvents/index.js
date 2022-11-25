import React from "react"
import { Badge, Button, Card, Spinner } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useGetEventsQuery } from "../../../services/seastorm";
import { usePagination } from '../../../libs/usePagination';
import { useSelector } from "react-redux";
import { authSelectors } from "../../store/auth.slice";

export default function ListEvents() {
    const { id } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1

    const isAuthenticated = useSelector(authSelectors.isAuthenticated)

    const { data, isLoading, isError, isSuccess } = useGetEventsQuery(`?page=${page}&filter{coastalsegment_id}=${id}`);

    const pagination = usePagination({
        totPages: (data && Math.ceil(data.total / data.page_size)) || 1,
        page,
        loadPage: p => setSearchParams(`page=${p}`)
    })

    return (
        <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <h5>Storm Events {isSuccess && <Badge pill>{data.total}</Badge>}</h5>
                <div class="d-flex align-items-center">
                    {isAuthenticated && <Button as={Link} to={`/sea_storm_atlas/segments/${id}/create-event/`}>Create</Button>}
                </div>
            </div>
            {isLoading && <Spinner animation="border" />}
            {isError && <p className="text-danger">{data.error.message}</p>}
            {isSuccess && (
                <>
                    {data.storm_event_entries.map(e => (
                        <Card key={e.id} className="my-3">
                            <Card.Body>
                                <h3>{moment(e.date_start).format('DD/MM/YYYY hh:mm')} <Badge pill>{e.effects_count}</Badge></h3>
                                {e.name && <h4>{e.name}</h4>}
                                <p>{e.description}</p>
                                <Button as={Link} to={`/sea_storm_atlas/events/${e.id}/`}>Open</Button>
                            </Card.Body>
                        </Card>))}
                    {!data.total && <p>No events found</p>}
                    {pagination}
                </>
            )}
        </div>
    )
}