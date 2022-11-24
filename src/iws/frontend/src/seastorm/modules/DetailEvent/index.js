import React from 'react';
import { Breadcrumb, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import { useGetEventQuery } from "../../../services/seastorm";

import False from '../../assets/False.png'
import True from '../../assets/True.png'
import None from '../../assets/None.png'
import ListEffects from '../ListEffects';

function IconRender(value) {
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
    const { data, isLoading, isError, isSuccess, error } = useGetEventQuery({ id, params: '?include[]=origins' });

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
                                        <td>Date start</td>
                                        <td className="text-center">{data.storm_event_entry.date_start}</td>
                                    </tr>
                                    <tr>
                                        <td>Date end</td>
                                        <td className="text-center">{data.storm_event_entry.date_end}</td>
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
                    <ListEffects />
                </>
            )}
            
        </Container>
        </>
    )
}