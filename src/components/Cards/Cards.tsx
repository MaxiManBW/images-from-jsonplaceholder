import { FC, SyntheticEvent } from 'react'
import { Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deletePhotoById, PhotoType } from '../../store/reducers/photosReducer'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setModalData } from '../../store/reducers/modalReducer'

import styles from './style.module.css'

const { Meta } = Card

type Props = {
  photos: PhotoType[]
  onClick: () => void
}

const Cards: FC<Props> = ({ photos, onClick }) => {
  const dispatch = useAppDispatch()
  
  const handleDelete = (id: number) => (e: SyntheticEvent) => {
    e.stopPropagation()
    dispatch(deletePhotoById(id))
  }

  const handleClick = (photo: PhotoType) => (e: SyntheticEvent) => {
    dispatch(setModalData(photo))
    onClick()
  }


  return (
    <div className={styles.CardsWrapper}>
      {photos.map(p => {
        return (
          <Card
            key={p.id}
            hoverable
            style={{ width: 320, margin: 10 }}
            cover={<img alt={p.title} src={p.thumbnailUrl} />}
            actions={[
              <DeleteOutlined key="delete" onClick={handleDelete(p.id)} />,
            ]}
            onClick={handleClick(p)}
          >
            <Meta
              title={`ID:${p.id} | AlbumId: ${p.albumId}`}
              description={p.title}
            />
          </Card>
        )
      })}
    </div>
  )
}

export default Cards
