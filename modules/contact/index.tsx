import React, { useEffect } from 'react'
import { ContactContainer } from './styles'
import ContactUs from './components/ContactUs'
import ContactFrom from './components/ContactFrom'
import { Col, Row } from 'antd'
import { useLoading } from 'hooks/useLoading'

const Contact = () => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ContactContainer>
      <Row justify="space-around" align="middle" gutter={[0, 32]}>
        <Col span={24} md={{ span: 12, order: 1, push: 1 }} order={2} push={0}>
          <ContactFrom />
        </Col>
        <Col span={24} md={{ span: 12, pull: 1 }} order={1} pull={0}>
          <ContactUs />
        </Col>
      </Row>
    </ContactContainer>
  )
}

export default Contact
