import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geonodeApi = createApi({
    reducerPath: 'geonodeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v2/' }),
    tagTypes: ['layers', 'maps',],
    endpoints: (builder) => ({
        getLayers: builder.query({
            query: (params = '') => `layers/${params}`,
            providesTags: () => [{ type: 'layers', id: 'LIST' }],
        }),
        getMaps: builder.query({
            query: (params = '') => `maps/${params}`,
            providesTags: () => [{ type: 'maps', id: 'LIST' }],
        }),
    }),
})

export const { 
    useGetLayersQuery,
    useLazyGetLayersQuery,
    useLazyGetMapsQuery,
} = geonodeApi;
