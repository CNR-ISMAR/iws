import { configureStore } from '@reduxjs/toolkit'
import { geonodeApi } from '../../services/geonode'

export const store = configureStore({
  reducer: {
    [geonodeApi.reducerPath]: geonodeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(geonodeApi.middleware),
})
