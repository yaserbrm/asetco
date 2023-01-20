import { Col, Row } from 'antd'
import Link from 'next/link'
import { instagram, telegram, whatsApp } from 'public/assets/svg/common/logo'
import { FC } from 'react'

export const SocialMedia: FC = () => {
  return (
    <Row justify="end" align="middle" gutter={16}>
      <Col className="gutter-row">
        <Link href="https://telegram.me" target={'_blank'} title="تلگرام آستکو یدک">
          {telegram}
        </Link>
      </Col>
      <Col className="gutter-row">
        <Link href="https://instagram.com" target={'_blank'} title="اینستاگرام آستکو یدک">
          {instagram}
        </Link>
      </Col>
      <Col className="gutter-row">
        <Link href="https://web.whatsapp.com/send?phone=09117372304&text=Hi" target={'_blank'} rel="noreferrer" title="واتساپ آستکو یدک">
          {whatsApp}
        </Link>
      </Col>
    </Row>
  )
}
