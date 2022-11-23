import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const seastormApi = createApi({
    reducerPath: 'seastormApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v2/' }),
    tagTypes: ['segments', 'events', 'effects', 'origins', 'categories'],
    endpoints: (builder) => ({
        getSegments: builder.query({
            query: (params = '') => `coastalsegments/${params}`,
            providesTags: () => [{ type: 'segments', id: 'LIST' }],
        }),
        getEvents: builder.query({
            query: (params = '') => `stormevent/${params}`,
            providesTags: () => [{ type: 'events', id: 'LIST' }],
        }),
        getEffects: builder.query({
            query: (params = '') => `stormevent/${params}`,
            providesTags: () => [{ type: 'events', id: 'LIST' }],
        }),
        getOrigins: builder.query({
            query: (params = '') => `origins/${params}`,
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
    useGetEventsQuery,
    useGetEffectsQuery,
    useLazyGetOriginsQuery,
    useLazyGetCategoriesQuery,
} = seastormApi;
