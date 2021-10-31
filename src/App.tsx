import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { getAllPhotos, PhotoType } from './store/reducers/photosReducer'
import { Cards, Pagination } from './components'
import { Modal } from 'antd'

import './App.css'

const PAGE_SIZE = 10

function App() {
  const dispatch = useAppDispatch()
  const { photos, error, status } = useAppSelector((state) => state.photos)
  const { modalData } = useAppSelector((state) => state.modal)
  
  const [slicedPhotos, setSlicedPhotos] = useState<PhotoType[]>([])
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE)

  const [modalVisible, setModalVisible] = useState<boolean>(false)

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
        <Cards
          photos={slicedPhotos}
          onClick={() => setModalVisible(true)}
        />
      }
      <Pagination 
        pageSize={pageSize}
        total={photos.length}
        onChange={handleChange}
      />

      <Modal
        title={modalData?.title ?? 'Title is missed'}
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        width={900}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        { modalData && <img src={modalData?.url} alt={modalData?.title} /> }
      </Modal>
    </div>
  )
}

export default App
