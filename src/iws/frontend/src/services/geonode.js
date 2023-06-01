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
        getGeonodeDocs: builder.query({
            query: (params = '') => `documents/${params}`,
            providesTags: () => [{ type: 'docs', id: 'LIST' }],
        }),
    }),
})

export const { 
    useGetLayersQuery,
    useLazyGetLayersQuery,
    useLazyGetGeonodeDocsQuery,
} = geonodeApi;
