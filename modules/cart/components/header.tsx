import { FC } from 'react'
import { CartHeaderContainer } from '../styles/cartHeader.style'
import { Typography } from 'antd'
import { BackButton } from 'components/uiKit/backButton'
import { useRouter } from 'next/router'

export const CartHeader: FC = () => {
  const router = useRouter()

  return (
    <CartHeaderContainer>
      <Typography.Title className="cartHeaderTitle" level={3}>
        سبد سفارشات شما
      </Typography.Title>
      <BackButton onClick={() => router.back()} />
    </CartHeaderContainer>
  )
}
