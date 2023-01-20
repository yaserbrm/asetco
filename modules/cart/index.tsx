import { Col } from 'antd'

import { FC } from 'react'
import { CartHeader } from './components/header'
import { Orders } from './components/orders'
import { CartContent } from './styles'

export const CartModule: FC = () => {
  return (
    <CartContent>
      <Col span={24} dir="rtl">
        <CartHeader />
      </Col>
      <Col span={24}>
        <Orders />
      </Col>
    </CartContent>
  )
}
