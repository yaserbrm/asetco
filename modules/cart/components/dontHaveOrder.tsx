import Image from 'next/image'
import { FC } from 'react'
import { DontHaveOrderToCartContainer } from '../styles/dontHaveOrder'

export const DontHaveOrderToCart: FC = () => {
  return (
    <DontHaveOrderToCartContainer>
      <Image src={'/assets/svg/cart/empty-cart.svg'} width={567} height={300} alt="empty" />
      <h6 className="emptyText">سفارشی وجود ندارد </h6>
    </DontHaveOrderToCartContainer>
  )
}
