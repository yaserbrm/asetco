import { Col, Form, Row } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { AttachFormWrapper } from '../styles/attachForm'
import { ISellingWornCarProps } from '../interfaces/sellingWornCar'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TextArea from 'antd/lib/input/TextArea'
import { IUploadProps } from '../interfaces/uploadProps'
import { useSellingWornCarPageState } from '../context/context'
import UploadImage from 'components/uiKit/uploadImage'
import { UploadFile } from 'antd/lib/upload/interface'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IObject } from 'interfaces/IObject'
import { Routes } from 'interfaces/Routes'
import { AspectWornCarUpload } from 'constants/aspectWornCarUpload'

declare type TImageError = 'success' | 'sizeError' | 'typeError'

const AttachDocument: FC<ISellingWornCarProps> = () => {
  const states = useSellingWornCarPageState()
  const [attachDocumentForm] = Form.useForm()

  const [imageError, setImageError] = useState<{
    doc: TImageError
    card: TImageError
    image: TImageError
    others: TImageError
  }>({ card: 'success', doc: 'success', image: 'success', others: 'success' })

  const router = useRouter()

  const handleAttachDoc = (values: IObject) => {
    console.log(values)

    if (
      (values.card_Uploads && values.card_Uploads.fileList.length > 0) ||
      (values.document_Uploads && values.document_Uploads.fileList.length > 0)
    ) {
      states.setStep(4)
    } else {
      return ToastAlert.error(' بارگزاری  سند و یا کارت ماشین اجباری می باشد. ')
    }
  }

  const onChange: IUploadProps['onChange'] = (info, attachType) => {
    let { fileList: newFileList, file } = info

    setImageError(perv => ({ ...perv, [attachType]: 'success' }))
    newFileList.forEach(file => {
      if (file.size && file.size > 2000000) {
        setImageError(perv => ({ ...perv, [attachType]: 'sizeError' }))
        return
      } else if (file.type && !(file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))) {
        setImageError(perv => ({ ...perv, [attachType]: 'typeError' }))
        return
      }
    })

    states.handleAttachment(newFileList, attachType)
  }

  const handleImageError = (img: UploadFile<any>, docType: string) => {
    if (img.size && img.size > 2000000) {
      setImageError(perv => ({ ...perv, [docType]: 'sizeError' }))
      return
    } else if (img.type && !(img.type.includes('png') || img.type.includes('jpeg') || img.type.includes('jpg'))) {
      setImageError(perv => ({ ...perv, [docType]: 'typeError' }))
      return
    }
  }

  useEffect(() => {
    states.value.attachments.card.forEach(img => {
      handleImageError(img, 'card')
    })
    states.value.attachments.doc.forEach(img => {
      handleImageError(img, 'doc')
    })
    states.value.attachments.image.forEach(img => {
      handleImageError(img, 'image')
    })
    states.value.attachments.others.forEach(img => {
      handleImageError(img, 'others')
    })
  }, [
    states.value.attachments.card,
    states.value.attachments.doc,
    states.value.attachments.image,
    states.value.attachments.others,
    states.step,
  ])

  useEffect(() => {
    attachDocumentForm.setFieldsValue({
      card_Uploads: {
        file: states.value.attachments.card[0],
        fileList: states.value.attachments.card,
      },
      document_Uploads: {
        file: states.value.attachments.doc[0],
        fileList: states.value.attachments.doc,
      },
      image_Uploads: {
        file: states.value.attachments.image[0],
        fileList: states.value.attachments.image,
      },
      other_Uploads: {
        file: states.value.attachments.others[0],
        fileList: states.value.attachments.others,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const descriptionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value

    states.handleAttachmentDescription(value, name)
  }
  return (
    <Row justify="center" align="middle">
      <Col xs={23} sm={20} md={16} lg={15} xl={13}>
        <AttachFormWrapper>
          <div className="attachForm">
            <Form
              name="attachDocument"
              autoComplete="off"
              initialValues={states.value.attachmentsDescription}
              form={attachDocumentForm}
              onFinish={handleAttachDoc}
            >
              <div className="title-responsive">
                <span className="material-icons icon back-responsive" onClick={() => states.setStep(2)}>
                  west
                </span>
                <h1 className="attachFormTitle">بارگزاری تصاویر اسناد و مدارک خودروی فرسوده</h1>
              </div>
              <p className="attachFormDescription" dir="rtl">
                فرمت فایل های ارسالی میبایست jpeg، jpg یا png بوده و حجم آن کمتر از 2 مگابایت باشد.
              </p>

              <Row gutter={[1, 24]} dir="rtl">
                <Col xs={24}>
                  <section className="attach-item">
                    <p className="attach-item-title">سند خودرو</p>
                    <hr />
                    <div className="attach-item-upload">
                      <Form.Item
                        name="document_Uploads"
                        rules={[
                          () => ({
                            validator(_, value) {
                              switch (imageError.doc) {
                                case 'sizeError':
                                  return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد.'))
                                case 'typeError':
                                  return Promise.reject(new Error('فرمت عکس اشتباه می باشد'))
                                case 'success':
                                  return Promise.resolve()
                                default:
                                  return Promise.resolve()
                              }
                            },
                          }),
                        ]}
                      >
                        <UploadImage
                          fileList={states.value.attachments.doc}
                          onChange={info => onChange(info, 'doc')}
                          count={4}
                          aspect={AspectWornCarUpload.document}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item name="document_description" className="attach-item-description">
                      <TextArea
                        name="document_description"
                        className="document_textArea"
                        rows={5}
                        placeholder="توضیحات"
                        onChange={descriptionChangeHandler}
                      />
                    </Form.Item>
                  </section>
                </Col>
                <Col xs={24}>
                  <section className="attach-item">
                    <p className="attach-item-title">کارت ماشین</p>
                    <hr />
                    <div className="attach-item-upload">
                      <Form.Item
                        name="card_Uploads"
                        rules={[
                          ({}) => ({
                            validator(_, value) {
                              switch (imageError.card) {
                                case 'sizeError':
                                  return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد.'))
                                case 'typeError':
                                  return Promise.reject(new Error('فرمت عکس اشتباه می باشد'))
                                case 'success':
                                  return Promise.resolve()
                                default:
                                  return Promise.resolve()
                              }
                            },
                          }),
                        ]}
                      >
                        <UploadImage
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          fileList={states.value.attachments.card}
                          onChange={info => onChange(info, 'card')}
                          count={4}
                          aspect={AspectWornCarUpload.cards}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      name="card_description"
                      className="attach-item-description"
                      // initialValue={states.value.attachmentsDescription.card_description}
                    >
                      <TextArea
                        name="card_description"
                        className="document_textArea"
                        rows={5}
                        placeholder="توضیحات"
                        onChange={descriptionChangeHandler}
                      />
                    </Form.Item>
                  </section>
                </Col>

                <Col xs={24}>
                  <section className="attach-item">
                    <p className="attach-item-title">تصویر خودرو</p>
                    <hr />
                    <div className="attach-item-upload">
                      <Form.Item
                        name="image_Uploads"
                        rules={[
                          ({}) => ({
                            validator(_, value) {
                              if (!(states.value.attachments.image.length > 0)) {
                                return Promise.reject(new Error('بارگزاری تصویر  خودرو الزامی است'))
                              } else {
                                switch (imageError.image) {
                                  case 'sizeError':
                                    return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد.'))
                                  case 'typeError':
                                    return Promise.reject(new Error('فرمت عکس اشتباه می باشد'))
                                  case 'success':
                                    return Promise.resolve()
                                  default:
                                    return Promise.resolve()
                                }
                              }
                            },
                          }),
                        ]}
                      >
                        <UploadImage
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          fileList={states.value.attachments.image}
                          onChange={info => onChange(info, 'image')}
                          count={4}
                          aspect={AspectWornCarUpload.carImg}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      name="image_description"
                      className="attach-item-description"
                      // initialValue={states.value.attachmentsDescription.image_description}
                    >
                      <TextArea
                        name="image_description"
                        className="document_textArea"
                        rows={5}
                        placeholder="توضیحات"
                        onChange={descriptionChangeHandler}
                      />
                    </Form.Item>
                  </section>
                </Col>
                <Col xs={24}>
                  <section className="attach-item">
                    <p className="attach-item-title">سایر مدارک</p>
                    <hr />
                    <div className="attach-item-upload">
                      <Form.Item
                        name="other_Uploads"
                        rules={[
                          () => ({
                            validator(_, value) {
                              if (!(states.value.attachments.others.length > 0)) {
                                return Promise.resolve()
                              } else {
                                switch (imageError.others) {
                                  case 'sizeError':
                                    return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد.'))
                                  case 'typeError':
                                    return Promise.reject(new Error('فرمت عکس اشتباه می باشد'))
                                  case 'success':
                                    return Promise.resolve()
                                  default:
                                    return Promise.resolve()
                                }
                              }
                            },
                          }),
                        ]}
                      >
                        <UploadImage
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          fileList={states.value.attachments.others}
                          onChange={info => onChange(info, 'others')}
                          count={4}
                          aspect={AspectWornCarUpload.other}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      name="others_description"
                      className="attach-item-description"
                      // initialValue={states.value.attachmentsDescription.others_description}
                    >
                      <TextArea
                        name="others_description"
                        className="document_textArea"
                        rows={5}
                        placeholder="توضیحات"
                        onChange={descriptionChangeHandler}
                      />
                    </Form.Item>
                  </section>
                </Col>
              </Row>

              <Form.Item>
                <div className="steps-action">
                  <ButtonUiKit
                    type="default"
                    className="cancel"
                    icon={<span className="material-icons icon">close</span>}
                    onClick={() => router.push(Routes.Home)}
                  >
                    انصراف
                  </ButtonUiKit>
                  <ButtonUiKit
                    type="default"
                    className="back"
                    icon={<span className="material-icons icon">west</span>}
                    onClick={() => states.setStep(2)}
                  >
                    بازگشت
                  </ButtonUiKit>
                  <ButtonUiKit
                    type="primary"
                    htmlType="submit"
                    className="nextPage"
                    icon={<span className="material-icons icon">east</span>}
                  >
                    مرحله بعدی
                  </ButtonUiKit>
                </div>
              </Form.Item>
            </Form>
          </div>
        </AttachFormWrapper>
      </Col>
    </Row>
  )
}

export default AttachDocument
