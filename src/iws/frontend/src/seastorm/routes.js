import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import ListSegments from './modules/ListSegments';
import DetailSegment from './modules/DetailSegment';
import DetailEvent from './modules/DetailEvent';
import CreateEvent from './modules/CreateEvent';
import CreateEffect from './modules/CreateEffect';


export default function AppRoutes() {
    return (
        <BrowserRouter path="sea_storm_atlas">
            <Routes>
                <Route path="/sea_storm_atlas/" element={<ListSegments />} />
                <Route path="/sea_storm_atlas/segments/:id/create-event/" element={<CreateEvent />} />
                <Route path="/sea_storm_atlas/segments/:id/" element={<DetailSegment />} />
                <Route path="/sea_storm_atlas/events/:id/create-effect/" element={<CreateEffect />} />
                <Route path="/sea_storm_atlas/events/:id/" element={<DetailEvent />} />
            </Routes>
        </BrowserRouter>
    )
}
