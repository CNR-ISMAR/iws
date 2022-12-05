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
import EditEvent from './modules/EditEvent';
import EditEffect from './modules/EditEffect';
import ListDocuments from './modules/ListDocuments';
import ProtectedRoute from '../components/ProtectedRoute';


export default function AppRoutes() {
    return (
        <BrowserRouter path="sea_storm_atlas">
            <Routes>
                <Route path="/sea_storm_atlas/" element={<ListSegments />} />
                <Route path="/sea_storm_atlas/segments/:id/create-event/" element={
                    <ProtectedRoute>
                        <CreateEvent />
                    </ProtectedRoute>
                } />
                <Route path="/sea_storm_atlas/segments/:id/" element={<DetailSegment />} />
                <Route path="/sea_storm_atlas/events/:id/create-effect/" element={
                    <ProtectedRoute>
                        <CreateEffect />
                    </ProtectedRoute>
                } />
                <Route path="/sea_storm_atlas/events/:id/edit/" element={
                    <ProtectedRoute>
                        <EditEvent />
                    </ProtectedRoute>
                } />
                <Route path="/sea_storm_atlas/events/:id/effects/:effectId/documents/" element={<ListDocuments />} />
                <Route path="/sea_storm_atlas/events/:id/effects/:effectId/" element={
                    <ProtectedRoute>
                        <EditEffect />
                    </ProtectedRoute>
                } />
                <Route path="/sea_storm_atlas/events/:id/" element={<DetailEvent />} />
            </Routes>
        </BrowserRouter>
    )
}
