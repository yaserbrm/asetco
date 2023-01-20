import { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { PaymentSuccessMainContainer } from './styles'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { useRouter } from 'next/router'
import { useLoading } from 'hooks/useLoading'
import { useDispatch } from 'react-redux'
import { clearCart } from 'store/actions/cart.action'
import { cartItemsNameInLocalStorage } from 'constants/localItem'
import { Routes } from 'interfaces/Routes'

const { Title, Paragraph } = Typography

const PaymentSuccessMain: FC = () => {
  const [cardLoading, setCardLoading] = useState<boolean>(true)
  const router = useRouter()
  const { trackCode } = router.query
  const { setLoading } = useLoading()
  const dispatch = useDispatch()

  const removeCart = useCallback(() => {
    dispatch(clearCart(true))
    localStorage.removeItem(cartItemsNameInLocalStorage)
  }, [dispatch])

  useEffect(() => {
    if (router.isReady) {
      if (trackCode) {
        setLoading(false)
        setCardLoading(false)
        setTimeout(() => removeCart(), 500)
      } else router.push(Routes.Home)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeCart, trackCode])

  return (
    <PaymentSuccessMainContainer>
      <Row align="middle" justify="center" className="row">
        <Col xs={23} md={16} lg={8}>
          {!cardLoading && (
            <Card
              title={
                <div className="title">
                  <span>پرداخت موفق</span>
                  <span className="material-icons icon">done</span>
                </div>
              }
              actions={[
                <ButtonUiKit type="primary" key="orders" onClick={() => router.push(Routes.trackRecord)} className="card-link">
                  پیگیری سفارشات
                </ButtonUiKit>,
                <ButtonUiKit type="primary" key="home" onClick={() => router.push(Routes.Home)} className="card-link">
                  صفحه اصلی
                </ButtonUiKit>,
              ]}
              dir="rtl"
              hoverable={true}
            >
              <div className="text-center py-3">
                <Title level={5} type="success">
                  تراکنش با موفقیت انجام شد.
                </Title>
              </div>
              <div className="track-code-container">
                <span>کد پیگیری:</span>
                <span className="track-code">
                  <strong>{trackCode}</strong>
                </span>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </PaymentSuccessMainContainer>
  )
}

export default PaymentSuccessMain
