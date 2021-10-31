import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PhotoType } from './photosReducer'

type ModalState = {
  modalData: PhotoType | null
}

const initialState: ModalState = {
  modalData: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<PhotoType>) => {
      state.modalData = action.payload
    },
  },
})

export const {
  setModalData,
} = modalSlice.actions;

export default modalSlice.reducer