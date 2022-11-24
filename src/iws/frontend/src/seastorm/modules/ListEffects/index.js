import React from "react"
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useGetEffectsQuery } from "../../../services/seastorm";
import { usePagination } from '../../../libs/usePagination';

export default function ListEffects() {
    const { id } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1

    const { data, isLoading, isError, isSuccess } = useGetEffectsQuery(`?page=${page}&filter{event_id}=${id}&page_size=100000000000000`);

    const pagination = usePagination({
        totPages: (data && Math.ceil(data.total / data.page_size)) || 1,
        page,
        loadPage: p => setSearchParams(`page=${p}`)
    })


    return (
        <div className="mt-4">
            <h5>Effects {isSuccess && <Badge pill>{data.total}</Badge>}</h5>
            {isLoading && <Spinner animation="border" />}
            {isError && <p className="text-danger">An exception occurred</p>}
            {isSuccess && (
                <>
                    {!data.total && <p>No effects found</p>}
                    {data.total && (
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Flooding level</th>
                                    <th>Damage</th>
                                    <th>Damage Type</th>
                                    <th>Coordinates</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.storm_event_effects.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.date}</td>
                                        <td>{e.flooding_date}</td>
                                        <td>{e.damage}</td>
                                        <td>{e.damage_categories.map(d => d.name).join(', ')}</td>
                                        <td>{e.lat && e.lon ? `${e.lat},${e.lon}` : null}</td>
                                        <td>{e.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    {pagination}
                </>
            )}
        </div>
    )
}