import { FC } from 'react'
import { UploadFiles } from './components/uploadFile'
import { IUploadFile } from './interface/IUploadFile'

export const UploadFile: FC<IUploadFile> = ({
  setImageUrl,
  imageError,
  imageUrl,
  onDelete,
  onSelect,
  hasSendButton,
  imageSrc,
  setImageSrc,
  loading,
}) => {
  return (
    <>
      <UploadFiles
        setImageUrl={setImageUrl}
        imageError={imageError}
        imageUrl={imageUrl}
        onDelete={onDelete}
        onSelect={onSelect}
        hasSendButton={hasSendButton}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        loading={loading}
      />
    </>
  )
}
