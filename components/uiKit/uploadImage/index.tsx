import { FC } from 'react'
import UploadImage from './component/uploadImage'
import { IUploadImage } from './interface/IUploadImage'

const UploadImages: FC<IUploadImage> = ({ action, fileList, onChange, count, aspect }) => {
  return <UploadImage action={action} fileList={fileList} onChange={onChange} count={count} aspect={aspect} />
}

export default UploadImages
