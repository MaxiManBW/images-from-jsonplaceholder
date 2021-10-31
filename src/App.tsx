import { useEffect, useState } from 'react'
import './App.css'
import { getAllPhotos } from './services/api'

type PhotoType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

function App() {

  const [photos, setPhotos] = useState<PhotoType[] | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const photos = await getAllPhotos()
        setPhotos(photos)
      } catch (error) {
        console.log('Request photo error', error)
      }
    }
    run()
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App
