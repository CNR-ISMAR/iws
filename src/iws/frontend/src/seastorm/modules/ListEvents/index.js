import React from "react"
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useGetEventsQuery } from "../../../services/seastorm";
import { usePagination } from '../../../libs/usePagination';
import { useSelector } from "react-redux";
import { authSelectors } from "../../store/auth.slice";
import { IconRender } from "../DetailEvent";
import { toDateTimeString } from "../../../libs/toDateString";

export default function ListEvents() {
    const { id } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1

    const isAuthenticated = useSelector(authSelectors.isAuthenticated)

    const { data, isLoading, isError, isSuccess } = useGetEventsQuery(`?page=${page}&filter{coastalsegment_id}=${id}&page_size=30&sort[]=date_start`);

    const pagination = usePagination({
        totPages: (data && Math.ceil(data.total / data.page_size)) || 1,
        page,
        loadPage: p => setSearchParams(`page=${p}`)
    })

    return (
        <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h5>Storm Events {isSuccess && <Badge pill>{data.total}</Badge>}</h5>
                <div className="d-flex align-items-center">
                    {isAuthenticated && <Button as={Link} to={`/sea_storm_atlas/segments/${id}/create-event/`}>Create</Button>}
                </div>
            </div>
            {isLoading && <Spinner animation="border" />}
            {isError && <p className="text-danger">{data.error.message}</p>}
            {isSuccess && (
                <>
                   {!data.total && <p>No events found</p>}
                    {data.total && (
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date start</th>
                                    <th>Date end</th>
                                    <th>Description</th>
                                    <th>Effects</th>
                                    <th>Origins</th>
                                    <th>Is aggregated</th>
                                    {isAuthenticated && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {data.storm_event_entries.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{toDateTimeString(e.date_start)}</td>
                                        <td>{toDateTimeString(e.date_end)}</td>
                                        <td>{e.description}</td>
                                        <td>{e.effects_count}</td>
                                        <td>{e.origins.map(d => d.name).join(', ')}</td>
                                        <td>{IconRender(e.is_aggregated)}</td>
                                        {isAuthenticated && (<td>
                                            <Button as={Link} to={`/sea_storm_atlas/events/${e.id}/`} className="me-1" title="view"><i className="fa fa-eye" /></Button>
                                            <Button as={Link} to={`/sea_storm_atlas/events/${e.id}/edit/`} className="me-1" title="edit"><i className="fa fa-edit" /></Button>
                                            {/* <Button className="me-1" disabled={isCloning} title="clone" onClick={() => runClone(e.id)}><i className="fa fa-clone" /></Button> */}
                                            {/* <Button className="ms-3" disabled={isRemoving} variant="danger" title="delete" onClick={() => runRemove(e.id)}><i className="fa fa-trash" /></Button> */}
                                        </td>)}
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