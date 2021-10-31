import { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { getAllPhotos } from './store/reducers/photosReducer'

function App() {
  const dispatch = useAppDispatch()
  const photos = useAppSelector((state) => state.photos.photos)
  useEffect(() => {
    const run = async () => {
      try {
        dispatch(getAllPhotos())
      } catch (error) {
        console.log('Request photo error', error)
      }
    }
    run()
  }, [])

  return (
    <div className="App">
    </div>
  )
}

export default App
