import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { getAllPhotos } from './store/reducers/photosReducer'
import { Cards } from './components'

import './App.css'


function App() {
  const dispatch = useAppDispatch()
  const { photos, error, status } = useAppSelector((state) => state.photos)
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
      {status === 'loading' && 'Photos is loading...'}
      {error !== null && <div>{error}</div>}
      {status === 'idle' && error === null && <Cards photos={photos} />}
    </div>
  )
}

export default App
