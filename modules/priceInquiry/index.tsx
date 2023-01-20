import { FC } from 'react'
import { Col, Row } from 'antd'

import PriceInquiryCarInformation from './component/priceInquiryCardInformation'
import TitleContainer from './component/title'
import { FormContainer } from './style/carInformation'

const PriceInquiry: FC = () => {
  return (
    <>
      <Row>
        <Col xl={12} lg={14} md={16} sm={22} xs={22} className="m-auto mt-[48px]">
          <FormContainer>
            <TitleContainer title="استعلام قیمت از طریق ثبت اطلاعات ماشین" />
            <PriceInquiryCarInformation />
          </FormContainer>
        </Col>
      </Row>
    </>
  )
}

export default PriceInquiry
