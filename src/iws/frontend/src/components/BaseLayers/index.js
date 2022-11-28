import { LayersControl, TileLayer } from "react-leaflet";

export default function BaseLayers() {
    return (
        <>
            /* Insert here new base layers to use, the default one should have the checked attribute */
            <LayersControl.BaseLayer name="OpenStreetMap" checked>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
        </>
    )
}