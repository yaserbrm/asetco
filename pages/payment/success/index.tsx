import { FC, useEffect } from 'react'
import Meta from 'components/uiKit/meta/meta'
import { useLoading } from 'hooks/useLoading'
import PaymentSuccessMain from 'modules/paymentSuccess'
import { useAccessLoadPage } from 'hooks/accessLoadPage'

const PaymentSuccess: FC = () => {
  const { accessLoad } = useAccessLoadPage()
  const { setLoading } = useLoading()

  useEffect(() => {
    if (accessLoad) setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessLoad])



  if (!accessLoad) {
    return <></>
  }

  return (
    <>
      <Meta
        title="سایت آستکو یدک /  پرداخت موفق "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک  , سفارش خودرو"
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک /  پرداخت موفق "
        ogType="company"
      />
      <PaymentSuccessMain />
    </>
  )
}

export default PaymentSuccess
