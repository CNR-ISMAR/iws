import React from "react"
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useGetEffectsQuery } from "../../../services/seastorm";
import { useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth.slice';
import EffectsMap from "../../../components/EffectsMap";

export default function ListEffects({ segment, extent }) {
    const { id } = useParams()
    const { data, isLoading, isError, isSuccess } = useGetEffectsQuery(`?page=1&filter{event_id}=${id}&page_size=100000000000000`);
    const isAuthenticated = useSelector(authSelectors.isAuthenticated);

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Effects {isSuccess && <Badge pill>{data.total}</Badge>}</h5>
                <div className="d-flex align-items-center">
                    {isAuthenticated && <Button as={Link} to={`/sea_storm_atlas/events/${id}/create-effect/`}>Create</Button>}
                </div>
            </div>
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
                                        <td>{e.flooding_level}</td>
                                        <td>{e.damage}</td>
                                        <td>{e.damage_categories.map(d => d.name).join(', ')}</td>
                                        <td>{e.lat && e.lon ? `${e.lat},${e.lon}` : null}</td>
                                        <td>{e.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    <h6>Effects Map</h6>
                    <EffectsMap 
                        segment={segment}
                        extent={extent}
                        effects={data.storm_event_effects}
                    />
                </>
            )}
        </div>
    )
}