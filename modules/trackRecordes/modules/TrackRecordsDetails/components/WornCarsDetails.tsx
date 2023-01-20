import Image from 'next/image'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spin, Typography } from 'antd'
import { useTrackRecordsDetailsCtx } from '../context'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { useTrackRecordsService } from 'pages/track-records/context'
import { SuggestedPricesTable } from 'components/uiKit/table/components'
import UploadImage from 'components/uiKit/uploadImage/component/uploadImage'
import moment from 'moment-jalaali'
import { formatNumberToCurrency } from 'helper/formatNumberToCurrency'
import { RcFile } from 'antd/es/upload/interface'
import { WornImageFilesTab } from '../interfaces/wornImageFilesTab'
import { AspectWornCarUpload } from 'constants/aspectWornCarUpload'

const WornCarsDetails = () => {
  const services = useTrackRecordsService()
  const { states, handlers } = useTrackRecordsDetailsCtx()
  const [loading, setLoading] = useState<boolean>(false)
  // const [fileList, setFileList] = useState<UploadFile[]>([])
  const [cropAspect, setCropAspect] = useState<number>(1.8)

  const { switchImagesModalVisibility, setWornCarImagesHandler } = handlers
  const {
    imagesPreviewModal,
    currentTabWornImages,
    detailData: { wornCar },
  } = states

  const onChange = (info: UploadChangeParam) => {
    const isValidType = info.file.type === 'image/png' || info.file.type === 'image/jpeg' || info.file.type === 'image/jpg'
    if (!isValidType) {
      ToastAlert.error('فایل با فرمت png , jpg و jpeg قابل بارگزاری است')
      return
    }
    const isValidSize = info && info.file && info.file.size ? (info.file.size < 2000000 ? true : false) : false
    if (!isValidSize) {
      ToastAlert.error('حجم فایل باید کمتر از 2 مگا بایت باشد.')
      return
    }

    info.file.originFileObj && uploadImageReq(info.file.originFileObj)
    setLoading(true)
  }

  const uploadImageReq = async (file: RcFile) => {
    if (!services) return

    const id = String(wornCar?.wornCarID)

    const formData = new FormData()
    formData.append('Type', currentTabWornImages)
    formData.append('WCID', id)
    formData.append('IFileWorn', file)

    try {
      const { data } = await services.wornMaster.uploadWornCarImage(formData)

      if (data?.status === 'Status200') {
        ToastAlert.success('بارگزاری با موفقیت انجام شد')
        updateImagesReq(id)
        return
      }

      ToastAlert.error('بارگزاری با خطا مواجه شد')
      setLoading(false)
    } catch {
      ToastAlert.error('بارگزاری با خطا مواجه شد')
      setLoading(false)
    }
  }

  const updateImagesReq = async (id: string) => {
    const formData = new FormData()
    formData.append('WornCarId', id)

    try {
      const { data } = await services?.wornMaster.getAllWornMasterFiles(formData)
      if (data) setWornCarImagesHandler(data)
      else ToastAlert.error(' خطا در دریافت تصاویر خودرو های فرسوده')
    } catch {
      ToastAlert.error(' خطا در دریافت تصاویر خودرو های فرسوده')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const { filesOthers, filesDocuments, filesCards, filesImages } = WornImageFilesTab

    switch (currentTabWornImages) {
      case filesOthers.toString():
        setCropAspect(AspectWornCarUpload.other)
        break
      case filesDocuments.toString():
        setCropAspect(AspectWornCarUpload.document)
        break
      case filesCards.toString():
        setCropAspect(AspectWornCarUpload.cards)
        break
      case filesImages.toString():
        setCropAspect(AspectWornCarUpload.carImg)
        break
    }
  }, [currentTabWornImages])

  return (
    <Row gutter={[0, 24]}>
      <Row className="title-detail-header">
        <Col span={24}>
          <Typography.Title level={5} className="title-detail">
            {wornCar?.wornCarName}
          </Typography.Title>
        </Col>
      </Row>

      <section className="image-wrapper">
        <section className="images-detail">
          <div>
            <Spin spinning={loading}>
              <ImgCrop modalTitle="ویرایش عکس" modalOk="تایید" modalCancel="انصراف">
                <UploadImage fileList={[]} onChange={onChange} count={4} aspect={cropAspect} />
              </ImgCrop>
            </Spin>
          </div>
          {imagesPreviewModal?.reverse().map(image => {
            const fileHost = process.env.NEXT_PUBLIC_GOD_FTP_SERVER || ''
            return (
              <div className="img-box" key={image?.annex_Id} onClick={switchImagesModalVisibility}>
                <Image width={72} height={72} src={fileHost + image?.pathFile} alt="car-image" />
              </div>
            )
          })}
        </section>
      </section>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text> {wornCar?.wornCarName}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>نام خودرو</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{moment(wornCar?.wm_DateReg).format('jYYYY/jMM/jD')}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>تاریخ ثبت</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12} className="flex">
          <SuggestedPricesTable
            maxPrice={Number(wornCar?.b_MaxPrice || 0)}
            minPrice={Number(wornCar?.b_MinPrice || 0)}
            flexDir="column-reverse"
          />
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>قیمت های پیشنهادی (ریال)</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{wornCar?.c_BuyAmount ? formatNumberToCurrency(+wornCar?.c_BuyAmount) : 0}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>قیمت خرید (ریال)</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{wornCar?.c_PreAmount ? formatNumberToCurrency(+wornCar?.c_PreAmount) : 0}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>پیش پرداخت (ریال)</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{formatNumberToCurrency(Number(wornCar?.f_Remaining || 0))}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>مانده (ریال)</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{formatNumberToCurrency(Number(wornCar?.f_OtherPayed || 0))}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>سایر هزینه‌ها (ریال)</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{wornCar?.c_Parking}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>پارکینگ</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{wornCar?.b_AgentName}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>نماینده</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{wornCar?.c_WornCarStateStr}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>وضعیت نهایی</Typography.Text>
        </Col>
      </Row>
    </Row>
  )
}

export default WornCarsDetails
