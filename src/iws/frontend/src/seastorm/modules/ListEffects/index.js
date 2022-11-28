import React from "react"
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import moment from 'moment';
import { useCloneEffectMutation, useDeleteEffectMutation, useGetEffectsQuery } from "../../../services/seastorm";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { authSelectors } from '../../store/auth.slice';
import EffectsMap from "../../../components/EffectsMap";
import { toDateTimeString } from "../../../libs/toDateString";

export default function ListEffects({ segment, extent }) {
    const { id } = useParams()
    const { data, isLoading, isError, isSuccess } = useGetEffectsQuery(`?page=1&filter{event_id}=${id}&page_size=100000000000000`);
    const isAuthenticated = useSelector(authSelectors.isAuthenticated);

    const [clone, { isLoading: isCloning }] = useCloneEffectMutation();
    const [remove, { isLoading: isRemoving }] = useDeleteEffectMutation();

    async function runClone(id) {
        const response = await clone({ id })
        console.log(response)
    }

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
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Flooding level</th>
                                    <th>Damage (€)</th>
                                    <th>Damage Type</th>
                                    <th>Coordinates</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.storm_event_effects.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{toDateTimeString(e.date)}</td>
                                        <td>{e.flooding_level}</td>
                                        <td>{e.damage}</td>
                                        <td>{e.damage_categories.map(d => d.name).join(', ')}</td>
                                        <td>{e.lat && e.lon ? `${e.lat},${e.lon}` : null}</td>
                                        <td>{e.description}</td>
                                        <td>
                                            {isAuthenticated && (<Button as={Link} to={`/sea_storm_atlas/events/${id}/effects/${e.id}/`} className="me-1" title="edit"><i className="fa fa-edit" /></Button>)}
                                            <Button as={Link} to={`/sea_storm_atlas/events/${id}/effects/${e.id}/documents/`} className="me-1" title="documents"><i className="fa fa-file" /></Button>
                                            {isAuthenticated && (<Button className="me-1" disabled={isCloning} title="clone" onClick={() => runClone(e.id)}><i className="fa fa-clone" /></Button>)}
                                            {isAuthenticated && (<Button className="ms-3" disabled={isRemoving} variant="danger" title="delete" onClick={() => runRemove(e.id)}><i className="fa fa-trash" /></Button>)}
                                        </td>
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