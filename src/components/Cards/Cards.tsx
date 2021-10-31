import { FC, SyntheticEvent } from 'react'
import { Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deletePhotoById, PhotoType } from '../../store/reducers/photosReducer'
import { useAppDispatch } from '../../hooks/reduxHooks'

import styles from './style.module.css'

const { Meta } = Card

type Props = {
  photos: PhotoType[]
}

const Cards: FC<Props> = ({ photos }) => {
  const dispatch = useAppDispatch()
  const handleDelete = (id: number) => (e: SyntheticEvent) => {
    dispatch(deletePhotoById(id))
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
