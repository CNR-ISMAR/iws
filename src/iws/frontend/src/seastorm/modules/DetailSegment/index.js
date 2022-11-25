import React from 'react';
import { Breadcrumb, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetSegmentQuery } from "../../../services/seastorm";

import False from '../../assets/False.png'
import True from '../../assets/True.png'
import None from '../../assets/None.png'
import ListEvents from '../ListEvents';
import SegmentMap from '../../../components/SegmentMap';

function IconRender(value) {
    const style = { width: '2rem' }
    if (value === null) {
        return <img src={None} style={style} />
    }
    return (
        <img src={value ? True : False} style={style} />
    )
}

export default function SegmentPage() {
    const { id } = useParams()
    const { data, isLoading, isError, isSuccess, error } = useGetSegmentQuery({ id, params: '?include[]=sea&include[]=geom' });

    console.log(data);

    return (
        <>
        <Container>
            {isLoading && <Spinner animation="border" />}
            {isError && <h1 className="text-danger">{error.error.message}</h1>}
            {isSuccess && (
                <>
                    <div className='d-flex'>
                        <div>
                            <h1 className=''>{data.coastal_segment.code} - {data.coastal_segment.subregion}</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item linkAs={Link} linkProps={{to: "/sea_storm_atlas/"}}>All Segments</Breadcrumb.Item>
                                <Breadcrumb.Item active>{data.coastal_segment.code} - {data.coastal_segment.subregion}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        
                        <div className='ms-auto d-flex align-items-start'>
                        </div>
                    </div>
                    <hr />
                    <Row>
                        <Col md={5}>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                        <th>Attibute</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sea</td>
                                        <td className="text-center">{data.coastal_segment.sea.label}</td>
                                    </tr>
                                    <tr>
                                        <td>Early warning system</td>
                                        <td className="text-center">{IconRender(data.coastal_segment.ews)}</td>
                                    </tr>
                                    <tr>
                                        <td>Early warning system Risk</td>
                                        <td className="text-center">{data.coastal_segment.ews_hazard_type__name}</td>
                                    </tr>
                                    <tr>
                                        <td>Institutional forecasting service</td>
                                        <td className="text-center">{IconRender(data.coastal_segment.forecasting_service)}</td>
                                    </tr>
                                    <tr>
                                        <td>Specific Civil Protection procedures</td>
                                        <td className="text-center">{IconRender(data.coastal_segment.cp_procedures)}</td>
                                    </tr>
                                    <tr>
                                        <td>Intervention procedures</td>
                                        <td className="text-center">{IconRender(data.coastal_segment.intervention_procedures)}</td>
                                    </tr>
                                    <tr>
                                        <td>Risk sources of coastal flooding</td>
                                        <td className="text-center">{data.coastal_segment.cf_risk_sources}</td>
                                    </tr>
                                    <tr>
                                        <td>Network for marine measurement/observation</td>
                                        <td className="text-center">{IconRender(data.coastal_segment.network_for_marine_measurement_observation)}</td>
                                    </tr>
                                    <tr>
                                        <td>Post event monitoring system</td>
                                        <td className="text-center">{IconRender(data.coastal_segment.post_event_monitoring_system)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <SegmentMap extent={data.coastal_segment.geom.bbox} segment={data.coastal_segment.geom} />
                        </Col>
                    </Row>
                    <ListEvents />
                </>
            )}
            
        </Container>
        </>
    )
}