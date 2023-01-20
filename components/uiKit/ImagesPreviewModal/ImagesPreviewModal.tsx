import { Modal, Typography } from 'antd'
import { ImageListPreview } from 'components/uiKit/imageListPreview'
import { IFileWorn } from 'core/wcs/wornMaster'
import useMediaQuery from 'hooks/mediaQuery'
import React, { FC } from 'react'
import { TractImagesModalHeader } from './styles'

interface IImagesPreviewModalProps {
  visible: boolean
  images: IFileWorn[]
  onClose: () => void
  title: {
    name: string
    model: string
  }
  loading?: boolean
}

const ImagesPreviewModal: FC<IImagesPreviewModalProps> = ({ visible, onClose, images, title, loading = false }) => {
  const matchScreen = useMediaQuery('(max-width: 768px)')

  const modalWidth = matchScreen ? '93vw' : '50vw'

  return (
    <Modal
      width={modalWidth}
      title={
        <TractImagesModalHeader>
          <section className="modal_info_Header">
            <span className="productName">{title.name}</span>
            <span className="productModel">{title.model}</span>
          </section>
          <span className="material-icons cursor-pointer" onClick={onClose}>
            west
          </span>
        </TractImagesModalHeader>
      }
      closable={false}
      visible={visible}
      footer={null}
    >
      {images?.length > 0 ? (
        <ImageListPreview images={images} />
      ) : (
        <Typography.Title level={2} className="h-64 flex justify-center items-center">
          تصویری وجود ندارد
        </Typography.Title>
      )}
    </Modal>
  )
}

export default ImagesPreviewModal
