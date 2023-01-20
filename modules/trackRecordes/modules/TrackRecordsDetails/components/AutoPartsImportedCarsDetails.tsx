import { Col, Row, Typography } from 'antd'
import { formatNumberToCurrency } from 'helper/formatNumberToCurrency'
import moment from 'moment-jalaali'
import Image from 'next/image'
import React from 'react'
import { useTrackRecordsDetailsCtx } from '../context'
import { OrderStatusText } from '../interfaces/OrderStatus'

const AutoPartsImportedCarsDetails = () => {
  const { handlers, states } = useTrackRecordsDetailsCtx()

  const { switchImagesModalVisibility } = handlers
  const {
    imagesPreviewModal,
    detailData: { importedCarAutPart },
  } = states

  return (
    <Row gutter={[0, 24]}>
      <Row className="title-detail-header">
        <Col span={24}>
          <Typography.Title level={5} className="title-detail">
            {importedCarAutPart?.ord_Name}
          </Typography.Title>
        </Col>
      </Row>

      <Row className="image-wrapper">
        <section className="images-detail">
          {imagesPreviewModal?.reverse().map(image => {
            const fileHost = process.env.NEXT_PUBLIC_GOD_FTP_SERVER || ''
            return (
              <div className="img-box" key={image?.annex_Id} onClick={switchImagesModalVisibility}>
                <Image width={72} height={72} src={fileHost + image?.pathFile} alt="car-image" />
              </div>
            )
          })}
        </section>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{importedCarAutPart?.ord_Name}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>نام </Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{importedCarAutPart?.ord_Model}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>مدل </Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{importedCarAutPart?.ord_TypeStr}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>نوع </Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{moment(importedCarAutPart?.ord_Date).format('jYYYY/jMM/jD')}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>تاریخ ثبت</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{importedCarAutPart?.ord_IsUsedStr}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>کارکرد</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{importedCarAutPart?.ord_Count} عدد</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>تعداد</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{formatNumberToCurrency(Number(importedCarAutPart?.ord_Price || 0))}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>قیمت خرید (ریال)</Typography.Text>
        </Col>
      </Row>

      <Row justify="space-between" className="row-detail">
        <Col span={12}>
          <Typography.Text>{OrderStatusText[Number(importedCarAutPart?.ord_ResultComment)]}</Typography.Text>
        </Col>
        <Col span={12} className="text-align-right">
          <Typography.Text>در حال ارسال</Typography.Text>
        </Col>
      </Row>
    </Row>
  )
}

export default AutoPartsImportedCarsDetails
