import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/o/v4/' }),
    tagTypes: ['userinfo',],
    endpoints: (builder) => ({
        getUserinfo: builder.query({
            query: (params = '') => `userinfo/`,
            providesTags: () => [{ type: 'userinfo', id: 'LIST' }],
        }),
    }),
})

export const { 
    useLazyGetUserinfoQuery,
} = authApi;
