import { configureStore } from '@reduxjs/toolkit'
import { modalReducer, photosReducer } from './reducers'

export const store = configureStore({
  reducer: {
    photos: photosReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch