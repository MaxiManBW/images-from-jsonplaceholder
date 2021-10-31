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
  sort: SortType
}

type SortType = {
  fieldName: keyof PhotoType
  sortDirection: 'ASC' | 'DESC'
}

const initialState: PhotosState = {
  photos: [],
  error: null,
  status: 'idle',
  sort: {
    sortDirection: 'ASC',
    fieldName: 'id',
  },
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
    sortDesc: (state, action: PayloadAction<SortType>) => {
      const { fieldName, sortDirection } = action.payload
      state.photos.sort((a, b) => {
        if (fieldName === 'albumId') {
          return sortDirection === 'DESC'
            ? b.albumId - a.albumId
            : a.albumId - b.albumId
        }
        return sortDirection === 'DESC'
          ? b.id - a.id
          : a.id - b.id
      })
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
  sortDesc,
} = photosSlice.actions;

export default photosSlice.reducer