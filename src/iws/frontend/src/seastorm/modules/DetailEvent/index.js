import React from 'react';
import { Breadcrumb, Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDeleteEventMutation, useGetEventQuery } from "../../../services/seastorm";

import False from '../../assets/False.png'
import True from '../../assets/True.png'
import None from '../../assets/None.png'
import ListEffects from '../ListEffects';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth.slice';
import { toDateTimeString } from '../../../libs/toDateString';

export function IconRender(value) {
    const style = { width: '2rem' }
    if (value === null) {
        return <img src={None} style={style} />
    }
    return (
        <img src={value ? True : False} style={style} />
    )
}

export default function EventPage() {
    const { id } = useParams()
    const { data, isLoading, isError, isSuccess, error } = useGetEventQuery({ id, params: '?include[]=origins&include[]=coastalsegment.geom' });

    const isAuthenticated = useSelector(authSelectors.isAuthenticated);
    const navigate = useNavigate();

    const [remove, { isLoading: isRemoving }] = useDeleteEventMutation();
    async function runRemove() {
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
            navigate(`/sea_storm_atlas/segments/${data.storm_event_entry.coastalsegment.id}/`)
        }

    }

    return (
        <>
        <Container>
            {isLoading && <Spinner animation="border" />}
            {isError && <h1 className="text-danger">{error.error.message}</h1>}
            {isSuccess && (
                <>
                    <div className='d-flex'>
                        <div>
                            <h1 className=''>{id} - {data.storm_event_entry.name || data.storm_event_entry.date_start}</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item linkAs={Link} linkProps={{to: "/sea_storm_atlas/"}}>All Segments</Breadcrumb.Item>
                                <Breadcrumb.Item linkAs={Link} linkProps={{to: `/sea_storm_atlas/segments/${data.storm_event_entry.coastalsegment.id}/`}}>{data.storm_event_entry.coastalsegment.code} - {data.storm_event_entry.coastalsegment.subregion}</Breadcrumb.Item>
                                <Breadcrumb.Item linkAs={Link} active>Event {id} - {data.storm_event_entry.name || data.storm_event_entry.date_start}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        
                        <div className='ms-auto d-flex align-items-start'>
                            {isAuthenticated && <Button className="me-1" as={Link} to={`/sea_storm_atlas/events/${id}/edit/`}>Edit</Button>}
                            {isAuthenticated && <Button className="me-1" onClick={runRemove} variant="danger" disabled={isRemoving}>Delete</Button>}
                        </div>
                    </div>
                    <hr />
                    <Row>
                        <Col>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>Attibute</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td className="text-center">{data.storm_event_entry.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Date start</td>
                                        <td className="text-center">{toDateTimeString(data.storm_event_entry.date_start)}</td>
                                    </tr>
                                    <tr>
                                        <td>Date end</td>
                                        <td className="text-center">{toDateTimeString(data.storm_event_entry.date_end)}</td>
                                    </tr>

                                    <tr>
                                        <td>Description</td>
                                        <td className="text-center">{data.storm_event_entry.description}</td>
                                    </tr>

                                    <tr>
                                        <td>Origins</td>
                                        <td className="text-center">{data.storm_event_entry.origins.map(o => o.name).join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td>Is Aggregated</td>
                                        <td className="text-center">{IconRender(data.storm_event_entry.is_aggregated)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <ListEffects segment={data.storm_event_entry.coastalsegment.geom} extent={data.storm_event_entry.coastalsegment.geom.bbox} />
                </>
            )}
            
        </Container>
        </>
    )
}