import { FC } from 'react'
import { Pagination as AntdPagination } from 'antd'

type Props = {
  total: number
  pageSize: number
  onChange: (page: number, pageSize?: number) => void
}

type ItemRenderType = (
  page: number,
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
  originalElement: React.ReactElement<HTMLElement>
) => React.ReactNode

const itemRender: ItemRenderType = (page, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>
  }
  if (type === 'next') {
    return <a>Next</a>
  }
  return originalElement
}

const Pagination: FC<Props> = ({ total, onChange, pageSize }) => {
  return (
    <AntdPagination 
      total={total}
      itemRender={itemRender}
      onChange={onChange}
      pageSize={pageSize}
      defaultCurrent={1}
    />
  )
}

export default Pagination
