import { configureStore } from '@reduxjs/toolkit'
import { geonodeApi } from '../../services/geonode'
import { seastormApi } from '../../services/seastorm'

export const store = configureStore({
  reducer: {
    [geonodeApi.reducerPath]: geonodeApi.reducer,
    [seastormApi.reducerPath]: seastormApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(geonodeApi.middleware, seastormApi.middleware),
})
