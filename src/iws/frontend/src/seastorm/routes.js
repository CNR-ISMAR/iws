import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import ListSegments from './modules/ListSegments';
import DetailSegment from './modules/DetailSegment';


export default function AppRoutes() {
    return (
        <BrowserRouter path="sea_storm_atlas">
            <Routes>
                <Route path="/sea_storm_atlas/" element={<ListSegments />} />
                <Route path="/sea_storm_atlas/segments/:id/" element={<DetailSegment />} />
            </Routes>
        </BrowserRouter>
    )
}
