import type { NextPage } from 'next'
import PriceInquiry from 'modules/priceInquiry'
import PriceInquiryContext from './context'
import { useAccessLoadPage } from 'hooks/accessLoadPage'
import { useLoading } from 'hooks/useLoading'
import { useEffect } from 'react'
import Meta from 'components/uiKit/meta/meta'

const PriceInquiryPage: NextPage = () => {
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
    <PriceInquiryContext>
      <Meta
        title="سایت آستکو یدک /  استعلام  قیمت"
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک , استعلام قیمت خودروی فرسوده "
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک /  استعلام  قیمت"
        ogType="company"
      />
      <PriceInquiry />
    </PriceInquiryContext>
  )
}

export default PriceInquiryPage
