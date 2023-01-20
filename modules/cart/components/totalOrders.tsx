import { Card, Col, Typography } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { formatNumberToCurrency } from 'helper/formatNumberToCurrency'
import { useUserInfo } from 'hooks/userInfo'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { cartSelector, getCartCount } from 'store/selectors'
import { TotalOrderRow } from '../styles/totalOrder'

export const TotalOrders: FC = () => {
  const { Paragraph, Text, Title } = Typography
  const cart = useSelector(cartSelector)
  const totalCartCount = useSelector(getCartCount)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const router = useRouter()
  const { userIsLogin } = useUserInfo()

  useEffect(() => {
    let newTotalPrice: number = 0
    cart.forEach(order => {
      newTotalPrice = newTotalPrice + order.product.p_Price * order.count
    })
    setTotalPrice(newTotalPrice)
  }, [cart])
  return (
    <TotalOrderRow>
      <Col span={24} className="totalOrderDesktop">
        <Card className="rounded-[16px]">
          <Title level={5}>جمع سبد سفارشات :</Title>
          <Text className="price">
            {formatNumberToCurrency(totalPrice)} {' ریال '}
          </Text>
          <Title level={5}>تعداد محصول :</Title>
          <Text className="count">
            {totalCartCount} {' عدد '}
          </Text>
          <Paragraph className="description">برای ثبت نهایی سفارش خود بر روی دکمه زیر بزنید</Paragraph>

          <div className="buttonHolder">
            <ButtonUiKit
              className="submitButton"
              onClick={() => {
                if (!cart.length) {
                  ToastAlert.info('سفارش شما خالی است.')
                  return
                }
                userIsLogin ? router.push('/order') : router.push('/login?returnUrl=order')
              }}
            >
              {userIsLogin ? 'ثبت سفارش' : 'ورود و ثبت سفارش'}
            </ButtonUiKit>
          </div>
        </Card>
      </Col>

      <Col span={24} className="totalOrderMobileScreen">
        <Col span={24}>
          <Card className="rounded-[16px]">
            <Title level={5}>جمع سبد سفارشات :</Title>
            <Text className="price">
              {formatNumberToCurrency(totalPrice)} {' ریال '}
            </Text>
            <Title level={5}>تعداد محصول :</Title>
            <Text className="count">
              {totalCartCount} {' عدد '}
            </Text>
            <Paragraph className="description">برای ثبت نهایی سفارش خود بر روی دکمه زیر بزنید</Paragraph>
          </Card>
        </Col>

        <Card className="totalOrderFixed">
          <section className="totalOrderFixed__title">
            <Text className="count">
              {totalCartCount} {' محصول '}
            </Text>

            <Text className="price">
              {formatNumberToCurrency(totalPrice)} {' ریال '}
            </Text>
          </section>

          <div className="buttonHolder">
            <ButtonUiKit
              className="submitButton"
              onClick={() => {
                if (!cart.length) {
                  ToastAlert.info('سفارش شما خالی است.')
                  return
                }
                userIsLogin ? router.push('/order') : router.push('/login?returnUrl=order')
              }}
            >
              {userIsLogin ? 'ثبت سفارش' : 'ورود و ثبت سفارش'}
            </ButtonUiKit>
          </div>
        </Card>
      </Col>
    </TotalOrderRow>
  )
}
