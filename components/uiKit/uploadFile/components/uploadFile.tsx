import { Col, Modal, Row } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import { ButtonUiKit } from '../../buttons'
import { IUploadFile } from '../interface/IUploadFile'
import { UploadFileStyle } from '../styles/uploadFile'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
//import '../styles/modalStyle.css'
import { ToastContainer } from 'react-toastify'
import { Routes } from 'interfaces/Routes'

export const UploadFiles: FC<IUploadFile> = ({
  setImageUrl,
  imageError,
  imageUrl,
  title,
  onDelete,
  onSelect,
  hasSendButton,
  imageSrc,
  setImageSrc,
  loading,
}) => {
  const uploadedImage = useRef<any>(null)
  const imageUploader = useRef<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [state, setState] = useState({ url: false })
  const [activeUpload, setActiveUpload] = useState<boolean>(false)
  const [oldImage, setOldImage] = useState<string | File | null>(imageUrl)

  useEffect(() => {
    if (!imageUrl || typeof imageUrl === 'string') {
      setOldImage(imageUrl)
    }
  }, [imageUrl])

  const handleImageUpload = async (e: any) => {
    const [file] = e.target.files
    setState({ url: true })

    if (file) {
      if (file.size > 1000000) {
        ToastAlert.error('اندازه تصویر انتخابی باید کمتر از یک مگا بایت باشد.')
        imageUploader.current.value = null
        return
      }
      const fileType = file.type.split(Routes.Home)
      if (fileType[0] === 'image') {
        if (fileType[1] !== 'png' && fileType[1] !== 'jpg' && fileType[1] !== 'jpeg') {
          ToastAlert.error('تصویر با پسوند های (png , jpg , jpeg) مجاز است.')
          imageUploader.current.value = null
          return
        }
      } else {
        ToastAlert.error('تنها مجاز به انتخاب فایل از نوع تصویر می باشید.')
        imageUploader.current.value = null
        return
      }
      const reader = new FileReader()
      const { current } = uploadedImage

      current.file = file
      setImageUrl(file)

      if (!hasSendButton) {
        if (onSelect && !(await onSelect(file))) {
          imageUploader.current.value = null
          setImageUrl(oldImage)
          return
        }
      }

      setActiveUpload(true)

      reader.onload = (e): void => {
        if (setImageSrc) {
          setImageSrc(e.target?.result)
        }
        current.src = e.target?.result
      }

      reader.readAsDataURL(file)
    }
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    setIsModalVisible(false)
    setImageSrc && setImageSrc('')

    if (!activeUpload && onDelete && !(await onDelete())) {
      return
    }
    //setHasImage(false)
    if (activeUpload) {
      setActiveUpload(false)
      setImageUrl(oldImage)
    } else {
      setImageUrl(null)
    }
    //setOldImage(null)
    setState({ url: false })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleUpload = async () => {
    if (onSelect && (await onSelect(imageUrl))) {
      //setHasImage(true)
      setActiveUpload(false)
    }
  }
  return (
    <UploadFileStyle className="upload">
      <Row>
        <Col xs={10} sm={6} md={8} lg={4} xl={3}>
          <div className="imageUploaded">
            {/* eslint-disable */}
            <img
              src={
                imageSrc && imageSrc !== ''
                  ? imageSrc
                  : (imageUrl && imageUrl === 'no-image') || !imageUrl
                  ? '/assets/images/person_2x.png'
                  : imageUrl
              }
              ref={uploadedImage}
              className={!imageUrl ? 'icon' : 'image'}
              alt="avatar"
              onClick={() => imageUploader.current?.click()}
            />
            {/* eslint-enable */}
          </div>
        </Col>
        <Col xs={14} sm={18} md={16} lg={20} xl={21}>
          <div className="text">
            <span className="size">عکس پروفابل باید کمتر از یک مگابایت باشد</span>
            <span className="format">فرمت فایل باید jpg , jpeg یا png باشد</span>
          </div>
          <input
            type="file"
            accept="image/*"
            name="upload"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: 'none',
            }}
            id="imageInput"
          />
          <div className="buttons">
            <ButtonUiKit type="default" className="chooseImageButton" onClick={() => imageUploader.current?.click()}>
              {!imageUrl ? 'انتخاب' : 'ویرایش'}
            </ButtonUiKit>
            <ButtonUiKit onClick={showModal} type="default" className="deleteButton" disabled={!imageUrl ? true : false}>
              حذف
            </ButtonUiKit>
            {hasSendButton! == true && activeUpload ? (
              <ButtonUiKit onClick={handleUpload} type="default" className="deleteButton" loading={loading}>
                آپلود
              </ButtonUiKit>
            ) : null}
          </div>
        </Col>
      </Row>
      <Modal
        closable={false}
        width="288px"
        title={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={'UploadFile'}
        footer={
          <>
            <ButtonUiKit className="dontDeleted" type="default" onClick={handleCancel}>
              خیر
            </ButtonUiKit>
            <ButtonUiKit className="deleted" type="default" onClick={handleOk}>
              بله
            </ButtonUiKit>
          </>
        }
      >
        <p>آیا عکس پروفایل شما حذف شود ؟</p>
      </Modal>
    </UploadFileStyle>
  )
}
