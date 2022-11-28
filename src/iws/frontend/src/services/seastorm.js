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
        updateEvent: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `stormevent/${id}/`,
                method: 'PATCH',
                body,
                headers: {
                    'X-CSRFToken': getCSRF(),
                }
            }),
            invalidatesTags: (req) => [{ type: 'events', id: req.id }, { type: 'events', id: 'LIST' }]
        }),
        getEffects: builder.query({
            query: (params = '') => `stormeffect/${params}`,
            providesTags: () => [{ type: 'effects', id: 'LIST' }],
        }),
        getEffect: builder.query({
            query: ({ id, params = '' }) => `stormeffect/${id}/${params}`,
            providesTags: (req) => [{ type: 'effect', id: req.id }],
        }),
        createEffect: builder.mutation({
            query: (body) => ({
                url: `stormeffect/`,
                method: 'POST',
                body,
                headers: {
                    'X-CSRFToken': getCSRF(),
                }
            }),
            invalidatesTags: [{ type: 'effects', id: 'LIST' }]
        }),
        cloneEffect: builder.mutation({
            query: ({ id }) => ({
                url: `stormeffect/${id}/clone/`,
                method: 'POST',
                body: {},
                headers: {
                    'X-CSRFToken': getCSRF(),
                }
            }),
            invalidatesTags: [{ type: 'effects', id: 'LIST' }]
        }),
        deleteEffect: builder.mutation({
            query: ({ id }) => ({
                url: `stormeffect/${id}/`,
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': getCSRF(),
                }
            }),
            invalidatesTags: [{ type: 'effects', id: 'LIST' }]
        }),
        updateEffect: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `stormeffect/${id}/`,
                method: 'PATCH',
                body,
                headers: {
                    'X-CSRFToken': getCSRF(),
                }
            }),
            invalidatesTags: (req) => [{ type: 'effects', id: 'LIST' }, { type: 'effects', id: req.id }]
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
    useGetEffectQuery,
    useLazyGetOriginsQuery,
    useLazyGetCategoriesQuery,
    useCreateEventMutation,
    useCreateEffectMutation,
    useUpdateEventMutation,
    useUpdateEffectMutation,
    useCloneEffectMutation,
    useDeleteEffectMutation,
} = seastormApi;
