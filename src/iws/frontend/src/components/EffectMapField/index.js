import React, { useCallback, useMemo, useState } from 'react';
import {
    MapContainer, FeatureGroup, LayersControl, Marker, GeoJSON
} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

import "react-leaflet-fullscreen/dist/styles.css";
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet.fullscreen';


const FullscreenControl = createControlComponent(props => L.control.fullscreen(props))

import { useField } from 'formik';

import { Form } from 'react-bootstrap';
import LeafletControlGeocoder from '../Geocoder';
import BaseLayers from '../BaseLayers';


export default function EffectMapField({ label, height = '350px', extent, segment, as, controlId, md, ...props }) {
    const ref = React.useRef(null);
    const [field, meta, { setValue }] = useField(props);

    const [canDraw, setCanDraw] = useState(!field.value);

    console.log(field.value);

    const coordinates = useMemo(() => {
        if (!field.value) {
            return null;
        }

        return `${field.value.coordinates[1]},${field.value.coordinates[0]}` 
    }, [field.value])

    const bounds = extent ? [
        [extent[1], extent[0]],
        [extent[3], extent[2]],
    ] : null

    function onEdited() {
        console.log(ref.current.toGeoJSON())
        try {
            setValue(ref.current.toGeoJSON().features[0].geometry);
        } catch(e) {
            console.error(e)
        }
    }

    function onCreated() {
        console.log(ref.current.toGeoJSON())
        try {
            setValue(ref.current.toGeoJSON().features[0].geometry);
        } catch (e) {
            console.error(e)
        }
        setCanDraw(false);
    }

    const onSelect = useCallback((geom) => {
        setValue({
            type: 'Point',
            coordinates: [
                geom.lng,
                geom.lat,
            ]
        })
    }, [setValue]);

    return (
        <Form.Group as={as} md={md} controlId={controlId} className="mt-2">
            <Form.Label>{label}</Form.Label>           
            <div style={{ height }}>
                <MapContainer style={{ height }} bounds={bounds} scrollWheelZoom>
                    <LeafletControlGeocoder onSelect={onSelect} />
                    <FullscreenControl />
                    <LayersControl position="topright">
                        <BaseLayers />
                        <LayersControl.Overlay checked name="Coastal Segment">
                            <GeoJSON data={segment} pathOptions={{ fillColor: 'yellow', color: 'red', fillOpacity: 0.5, opacity: 0.7 }} />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Effect point">
                        <FeatureGroup ref={ref} color="yellow">
                            <EditControl
                                position='bottomright'
                                onEdited={onEdited}
                                onCreated={onCreated}
                                draw={{
                                    marker: canDraw,
                                    polyline: false,
                                    circlemarker: false,
                                    circle: false,
                                    polygon: false,
                                    rectangle: false,
                                }}
                                edit={{
                                    remove: false,
                                }}
                            />
                            {field.value && (
                                <Marker position={[field.value.coordinates[1], field.value.coordinates[0]]} />
                            )}
                        </FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </MapContainer>
            </div>
            <div className='mb-5'>
                <h6 className='fw-bold'>Coordinates</h6>
                <div className="d-flex"> 
                    <Form.Group className="me-3">
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control value={field.value.coordinates[1]} onChange={e => setValue({ ...field.value, coordinates: [field.value.coordinates[0], e.target.value]})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control value={field.value.coordinates[0]} onChange={e => setValue({ ...field.value, coordinates: [e.target.value, field.value.coordinates[1]]})} />
                    </Form.Group>
                </div>
            </div>
            {meta.error && (
                <Form.Control.Feedback type="invalid" className="d-block">
                    {meta.error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}