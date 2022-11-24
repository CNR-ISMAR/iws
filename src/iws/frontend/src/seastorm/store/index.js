import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../../services/auth'
import { geonodeApi } from '../../services/geonode'
import { seastormApi } from '../../services/seastorm'
import { authSlice } from './auth.slice'

export const store = configureStore({
  reducer: {
    [geonodeApi.reducerPath]: geonodeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [seastormApi.reducerPath]: seastormApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    geonodeApi.middleware, 
    seastormApi.middleware,
    authApi.middleware,
  ),
})
