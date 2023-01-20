import { FC } from 'react'
import { useSelector } from 'react-redux'
import { cartSelector } from 'store/selectors'
import { OrderCard, OrdersListContainer } from '../styles/orderList.style'
import { Order } from './order'

export const OrdersList: FC = () => {
  const cart = useSelector(cartSelector)

  return (
    <OrdersListContainer>
      {cart.map((order, index) => (
        <OrderCard xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} key={index}>
          <Order order={order} />
        </OrderCard>
      ))}
    </OrdersListContainer>
  )
}
