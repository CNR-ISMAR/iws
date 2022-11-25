import React, { useEffect, useMemo, useState } from 'react';
import {
    MapContainer, TileLayer, GeoJSON, FeatureGroup, LayersControl
} from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { useField } from 'formik';

import { Form } from 'react-bootstrap';
import LeafletControlGeocoder from '../Geocoder';


export default function EffectMapField({ label, height = '350px', extent, segment, as, controlId, md, ...props }) {
    const ref = React.useRef(null);
    const [canDraw, setCanDraw] = useState(true);
    const [field, meta, { setValue }] = useField(props);

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

    return (
        <Form.Group as={as} md={md} controlId={controlId} className="mt-2">
            <Form.Label>{label}</Form.Label>           
            <div style={{ height }}>
                <MapContainer style={{ height }} bounds={bounds} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />  
                    <LeafletControlGeocoder />
                    <LayersControl position="topright">
                        <LayersControl.Overlay checked name="Coastal Segment">
                            <GeoJSON data={segment} pathOptions={{ fillColor: 'yellow', color: 'red', fillOpacity: 0.5, opacity: 0.7 }} />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay checked name="Effect point">
                        <FeatureGroup ref={ref}>
                            <EditControl
                                position='bottomright'
                                onEdited={onEdited}
                                onCreated={onCreated}
                                draw={{
                                    marker: false,
                                    polyline: false,
                                    circlemarker: canDraw,
                                    circle: false,
                                    polygon: false,
                                    rectangle: false,
                                }}
                                edit={{
                                    remove: false,
                                }}
                            />
                        </FeatureGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </MapContainer>
            </div>
            <p>Coordinates: {coordinates}</p>
            {meta.error && (
                <Form.Control.Feedback type="invalid" className="d-block">
                    {meta.error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}