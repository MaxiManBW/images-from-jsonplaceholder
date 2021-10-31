import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { getAllPhotos, PhotoType } from './store/reducers/photosReducer'
import { Cards, Pagination } from './components'

import './App.css'

const PAGE_SIZE = 10

function App() {
  const dispatch = useAppDispatch()
  const { photos, error, status } = useAppSelector((state) => state.photos)
  
  const [slicedPhotos, setSlicedPhotos] = useState<PhotoType[]>([])
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE)

  useEffect(() => {
    const run = async () => {
      try {
        dispatch(getAllPhotos())
        setSlicedPhotos(photos.slice(0, PAGE_SIZE))
      } catch (error) {
        console.log('Request photo error', error)
      }
    }
    run()
  }, [])

  useEffect(() => {
    setSlicedPhotos(photos.slice(0, PAGE_SIZE))
  }, [photos])


  const handleChange = (page: number, currentPageSize?: number) => {
    const x = currentPageSize ?? PAGE_SIZE
    if (currentPageSize && pageSize !== currentPageSize) {
      setPageSize(currentPageSize)
    }
    if (page === 1) {
      setSlicedPhotos(photos.slice(0, x))
    }
    if (page > 1) {
      const nextIndex = x * (page - 1) - 1
      setSlicedPhotos(photos.slice(nextIndex, nextIndex + x))
    }
  }

  return (
    <div className="App">
      {status === 'loading' && 'Photos is loading...'}
      {error !== null && <div>{error}</div>}
      {status === 'idle' && error === null &&
        <Cards photos={slicedPhotos} />
      }
      <Pagination 
        pageSize={pageSize}
        total={photos.length}
        onChange={handleChange}
      />
    </div>
  )
}

export default App
