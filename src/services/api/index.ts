import { get } from './axios'

export const getAllPhotos = () => get('/photos')
