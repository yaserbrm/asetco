import { FC, useCallback, useEffect, useState } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { useRouter } from 'next/router'
import { useLoading } from 'hooks/useLoading'
import { PaymentFailedMainContainer } from './styles'
import { Routes } from 'interfaces/Routes'

const { Title } = Typography

const PaymentFailedMain: FC = () => {
  const [cardLoading, setCardLoading] = useState<boolean>(true)
  const [isCancel, setIsCancel] = useState<boolean>(false)
  const router = useRouter()
  const { trackCode } = router.query
  const { setLoading } = useLoading()

  useEffect(() => {
    if (router.isReady) {
      setLoading(false)
      setCardLoading(false)
      if (trackCode) setIsCancel(false)
      else setIsCancel(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackCode])

  return (
    <PaymentFailedMainContainer>
      <Row align="middle" justify="center" className="row">
        <Col xs={23} md={16} lg={8}>
          {!cardLoading && (
            <Card
              title={
                <div className="title">
                  <span>پرداخت ناموفق</span>
                  <span className="material-icons icon">error</span>
                </div>
              }
              actions={[
                <ButtonUiKit type="primary" key="orders" onClick={() => router.push(Routes.cart)} className="card-link">
                  سبد سفارش
                </ButtonUiKit>,
                <ButtonUiKit type="primary" key="home" onClick={() => router.push(Routes.Home)} className="card-link">
                  صفحه اصلی
                </ButtonUiKit>,
              ]}
              dir="rtl"
              hoverable={true}
            >
              <div className="text-center py-3">
                {isCancel ? (
                  <Title level={5} type="warning">
                    انصراف از پرداخت
                  </Title>
                ) : (
                  <Title level={5} type="danger">
                    خطا در انجام تراکنش
                  </Title>
                )}
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </PaymentFailedMainContainer>
  )
}

export default PaymentFailedMain
