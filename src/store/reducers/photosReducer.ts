import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as api from '../../services/api'

export type PhotoType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

type PhotosState = {
  status: "loading" | "idle"
  error: string | null
  photos: PhotoType[]
}

const initialState: PhotosState = {
  photos: [],
  error: null,
  status: 'idle',
}

export const getAllPhotos = createAsyncThunk<PhotoType[]>(
  'photos/getAllPhotos',
  async () => await api.getAllPhotos(),
)

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    deletePhotoById: (state, action: PayloadAction<number>) => {
      state.photos = state.photos.filter(p => p.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPhotos.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(getAllPhotos.fulfilled, (state, { payload }) => {
      state.photos.push(...payload)
      state.status = 'idle'

    })
    builder.addCase(getAllPhotos.rejected, (state, { error }) => {
      if (error) {
        state.error = `getAllPhotos error: ${error.message}` ?? 'Error getAllPhotos'
      }
      state.status = 'idle'
    })
  }
})

export const {
  deletePhotoById,
} = photosSlice.actions;

export default photosSlice.reducer