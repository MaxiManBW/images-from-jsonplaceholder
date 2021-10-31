import { Card } from 'antd'
import { FC } from 'react'
import { PhotoType } from '../../store/reducers/photosReducer'

import styles from './style.module.css'

const { Meta } = Card

type Props = {
  photos: PhotoType[]
}

const Cards: FC<Props> = ({ photos }) => {
  return (
    <div className={styles.CardsWrapper}>
      {photos.map(p => {
        return (
          <Card
            hoverable
            style={{ width: 320, margin: 10 }}
            cover={<img alt={p.title} src={p.thumbnailUrl} />}
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
