import React, { useState } from "react"
import { Badge, Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDeleteEventMutation, useGetEventsQuery } from "../../../services/seastorm";
import { usePagination } from '../../../libs/usePagination';
import { useSelector } from "react-redux";
import { authSelectors } from "../../store/auth.slice";
import { IconRender } from "../DetailEvent";
import { toDateTimeString } from "../../../libs/toDateString";

const MAX_YEAR = new Date().getFullYear()

export default function ListEvents() {
    const { id } = useParams()
    const [year, setYear] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1

    const isAuthenticated = useSelector(authSelectors.isAuthenticated)

    const yearFilter = year ? `&filter{date_start.year}=${year}` : ''

    const { data, isLoading, isError, isSuccess } = useGetEventsQuery(`?page=${page}&filter{coastalsegment_id}=${id}&page_size=30&sort[]=date_start${yearFilter}`);

    const pagination = usePagination({
        totPages: (data && Math.ceil(data.total / data.page_size)) || 1,
        page,
        loadPage: p => setSearchParams(`page=${p}`)
    })

    const [remove, { isLoading: isRemoving }] = useDeleteEventMutation();
    async function runRemove(id) {
        const res = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        })

        if (res.isConfirmed) {
            const response = await remove({ id })
            console.log(response)
        }

    }


    return (
        <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h5>Storm Events {isSuccess && <Badge pill>{data.total}</Badge>}</h5>
                <div className="d-flex align-items-center">
                    {isAuthenticated && <Button as={Link} to={`/sea_storm_atlas/segments/${id}/create-event/`}>Create</Button>}
                </div>
            </div>
            <Row className="mb-2">
                <Col md={2}>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        placeholder="Year"
                        type="number"
                        value={year}
                        min={1800}
                        max={MAX_YEAR}
                        onChange={e => setYear(e.target.value)}
                    />
                </Col>
            </Row>
            {isLoading && <Spinner animation="border" />}
            {isError && <p className="text-danger">{data.error.message}</p>}
            {isSuccess && (
                <>
                   {!data.total > 0 && <p className="mt-3">No events found</p>}
                    {data.total > 0 && (
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
                                            <div className="d-flex">
                                                <Button as={Link} to={`/sea_storm_atlas/events/${e.id}/`} className="me-1" title="view"><i className="fa fa-eye" /></Button>
                                                <Button as={Link} to={`/sea_storm_atlas/events/${e.id}/edit/`} className="me-1" title="edit"><i className="fa fa-edit" /></Button>
                                                <Button className="ms-2" disabled={isRemoving} variant="danger" title="delete" onClick={() => runRemove(e.id)}><i className="fa fa-trash" /></Button>
                                            </div>
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