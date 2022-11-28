import React, { useMemo } from 'react';
import {
    MapContainer, GeoJSON, LayersControl
} from 'react-leaflet';
import BaseLayers from '../BaseLayers';
import LeafletControlGeocoder from '../Geocoder';



export default function EffectsMap({ extent, segment, effects, height='350px' }) {

    const bounds = extent ? [
        [extent[1], extent[0]], 
        [extent[3], extent[2]],
    ] : null

    const effectsData = useMemo(() => {
        return ({
            type: 'FeatureCollection',
            features: effects.filter(e => e.geom).map(e => ({
                type: 'Feature',
                geometry: e.geom,
            }))
        })
    }, [effects]);

    console.log(effectsData);

    return (
        <div style={{ height }}>
            <MapContainer style={{ height }} bounds={bounds} scrollWheelZoom={false}>     
                <LeafletControlGeocoder />
                <LayersControl position="topright">
                    <BaseLayers />
                    <LayersControl.Overlay checked name="Coastal Segment">
                        <GeoJSON data={segment} pathOptions={{ fillColor: 'yellow', color: 'red', fillOpacity: 0.5, opacity: 0.7 }} />
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Effect point">
                        <GeoJSON data={effectsData} pathOptions={{ fillColor: 'yellow', color: 'yellow' }} />
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    )
}