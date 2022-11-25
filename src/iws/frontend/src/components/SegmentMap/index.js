import React from 'react';
import {
    MapContainer, TileLayer, GeoJSON, LayersControl
} from 'react-leaflet';


export default function SegmentMap({ extent, segment, ...props }) {
    const ref = React.useRef(null);

    const bounds = extent ? [
        [extent[1], extent[0]], 
        [extent[3], extent[2]],
    ] : null


    return (
        <div style={{ height: '350px' }}>
            <MapContainer style={{ height: '350px' }} bounds={bounds} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />  
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Coastal Segment">
                        <GeoJSON data={segment} pathOptions={{ fillColor: 'yellow', color: 'red', fillOpacity: 0.5, opacity: 0.7 }} />
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    )
}