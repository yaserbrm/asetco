import Meta from 'components/uiKit/meta/meta'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IProvince, ProvinceService } from 'core/wcs/province'
import { useLoading } from 'hooks/useLoading'
import { OrderModule } from 'modules/order'
import { FC, useEffect } from 'react'

import OrderCtx from './context'

const Order: FC = () => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <OrderCtx>
      <Meta
        title="سایت آستکو یدک /  سفارشات "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک  , سفارش خودرو"
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک /  سفارشات "
        ogType="company"
      />
      <OrderModule />
    </OrderCtx>
  )
}
export default Order

export const getStaticProps = async () => {
  try {
    const service = {
      provinces: new ProvinceService(),
    }
    const { data: province } = await service.provinces.getAllProvince()

    return {
      props: {
        province: province || [],
      },
      revalidate: 3600,
    }
  } catch {
    ToastAlert.error('خطایی در دریافت لیست استان ها رخ داده است')

    return {
      props: {
        province: [],
      },
      revalidate: 3600,
    }
  }
}
