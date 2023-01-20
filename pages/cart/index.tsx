import Meta from 'components/uiKit/meta/meta'
import { useLoading } from 'hooks/useLoading'
import { CartModule } from 'modules/cart'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import CartPageContext from './context'

const CartPage: NextPage = () => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <CartPageContext>
      <Meta
        title="سایت آستکو یدک / سفارشات "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک / سفارشات "
        ogType="company"
      />
      <CartModule />
    </CartPageContext>
  )
}

export default CartPage
