import React from 'react';
import {
    MapContainer, GeoJSON, LayersControl
} from 'react-leaflet';
import BaseLayers from '../BaseLayers';


export default function SegmentMap({ extent, segment, ...props }) {
    const ref = React.useRef(null);

    const bounds = extent ? [
        [extent[1], extent[0]], 
        [extent[3], extent[2]],
    ] : null


    return (
        <div style={{ height: '350px' }}>
            <MapContainer style={{ height: '350px' }} bounds={bounds} scrollWheelZoom={false}>
                <LayersControl position="topright">
                    <BaseLayers />
                    <LayersControl.Overlay checked name="Coastal Segment">
                        <GeoJSON data={segment} pathOptions={{ fillColor: 'yellow', color: 'red', fillOpacity: 0.5, opacity: 0.7 }} />
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    )
}