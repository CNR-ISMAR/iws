import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCSRF } from './csrf';

export const seastormApi = createApi({
    reducerPath: 'seastormApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v2/' }),
    tagTypes: ['segments', 'events', 'effects', 'origins', 'categories'],
    endpoints: (builder) => ({
        getSegments: builder.query({
            query: (params = '') => `coastalsegment/${params}`,
            providesTags: () => [{ type: 'segments', id: 'LIST' }],
        }),
        getSegment: builder.query({
            query: ({ id, params = '' }) => `coastalsegment/${id}/${params}`,
            providesTags: (req) => [{ type: 'segments', id: req.id }],
        }),
        getEvents: builder.query({
            query: (params = '') => `stormevent/${params}`,
            providesTags: () => [{ type: 'events', id: 'LIST' }],
        }),
        getEvent: builder.query({
            query: ({ id, params = '' }) => `stormevent/${id}/${params}`,
            providesTags: (req) => [{ type: 'events', id: req.id }],
        }),
        createEvent: builder.mutation({
            query: (body) => ({
                url: `stormevent/`,
                method: 'POST',
                body,
                headers: {
                    'X-CSRFToken': getCSRF(),
                }
            }),
            invalidatesTags: [{ type: 'events', id: 'LIST' }]
        }),
        getEffects: builder.query({
            query: (params = '') => `stormeffect/${params}`,
            providesTags: () => [{ type: 'events', id: 'LIST' }],
        }),
        getOrigins: builder.query({
            query: (params = '') => `origin/${params}`,
            providesTags: () => [{ type: 'origins', id: 'LIST' }],
        }),
        getCategories: builder.query({
            query: (params = '') => `damagecategory/${params}`,
            providesTags: () => [{ type: 'categories', id: 'LIST' }],
        }),
    }),
})

export const { 
    useGetSegmentsQuery,
    useGetSegmentQuery,
    useGetEventsQuery,
    useGetEventQuery,
    useGetEffectsQuery,
    useLazyGetOriginsQuery,
    useLazyGetCategoriesQuery,
    useCreateEventMutation,
} = seastormApi;
