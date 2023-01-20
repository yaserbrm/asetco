import { Col, Row } from 'antd'
import { FC } from 'react'
import AboutUsContent from './components/AboutUsContent'
import { AboutUsContainer } from './styles'

const AboutUS: FC = () => {
  return (
    <AboutUsContainer>
      <Row className="relative">
        <Col lg={12} md={24} className="sm:px-12 px-6">
          <AboutUsContent />
        </Col>
        <Col lg={12} md={24} className="banner flex justify-center ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/svg/aboutUs/iranMapAbout.svg" alt="banner" />
        </Col>
      </Row>
    </AboutUsContainer>
  )
}

export default AboutUS
