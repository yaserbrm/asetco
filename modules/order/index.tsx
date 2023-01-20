import FinlayModal from 'components/uiKit/finlayModal'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IProvince } from 'core/wcs/province'
import { useLoading } from 'hooks/useLoading'
import { DontHaveOrderToCart } from 'modules/cart/components/dontHaveOrder'
import { useOrderServiceContext } from 'pages/order/context'
import { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCartCount } from 'store/selectors'
import OwnerOrderInfo from './components/ownerInfo'

export const OrderModule: FC = () => {
  const [sussesModal, setSussesModal] = useState<boolean>(false)
  const [province, setProvince] = useState<IProvince[]>([])
  const cartCount = useSelector(getCartCount)
  const { setLoading } = useLoading()
  const services = useOrderServiceContext()

  const fetchAllProvinces = useCallback(async () => {
    try {
      const { data } = await services.province.getAllProvince()

      if (!data) {
        ToastAlert.error('خطا در دریافت لیست استان ها')
        return
      }
      setProvince(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست استان ها')
    }
  }, [services])

  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (services) fetchAllProvinces()
  }, [fetchAllProvinces, services])
  return (
    <>
      <FinlayModal
        visible={sussesModal}
        onCancel={() => setSussesModal(false)}
        title="درخواست خرید شما در سامانه ثبت شد."
        description="  سامانه هـوشمند آستکو یدک اطلاعات ثـبـت شـده توسط شما را برای واحد فروش ارسال خواهد کرد. برای ادامه مراحل سفارش شما، تیم فروش آستکو یدک با شما تماس خواهد گرفت"
      />

      {cartCount ? (
        <OwnerOrderInfo province={province} setSussesModal={setSussesModal} />
      ) : (
        <div className="mt-[75px]">
          <DontHaveOrderToCart />
        </div>
      )}
    </>
  )
}
