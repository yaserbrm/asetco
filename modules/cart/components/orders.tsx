import { Col, Row } from 'antd'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { getCartCount } from 'store/selectors'
import { DontHaveOrderToCart } from './dontHaveOrder'
import { OrdersList } from './ordersList'
import { TotalOrders } from './totalOrders'

export const Orders: FC = () => {
  const cartCount = useSelector(getCartCount)

  if (cartCount < 1) {
    return <DontHaveOrderToCart />
  }
  return (
    <Row dir="rtl">
      <Col xs={{ span: 24 }} lg={{ span: 18 }}>
        <OrdersList />
      </Col>
      <Col span={6} xs={{ span: 24 }} lg={{ span: 6 }} className="mt-xs-5 mt-md-0 ">
        <TotalOrders />
      </Col>
    </Row>
  )
}
