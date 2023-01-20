import { NextPage } from 'next'
import OwnerProfile from 'modules/ownerProfile'
import OwnerProfileContext from './context'
import { useEffect, useState } from 'react'
import { useAccessLoadPage } from 'hooks/accessLoadPage'
import { useLoading } from 'hooks/useLoading'
import Meta from 'components/uiKit/meta/meta'

const OwnerProfilePage: NextPage = () => {
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
    <OwnerProfileContext>
      <Meta
        title="سایت آستکو یدک /  حساب  کاربری"
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک /  حساب  کاربری"
        ogType="company"
        noindex={true}
      />
      <OwnerProfile />
    </OwnerProfileContext>
  )
}

export default OwnerProfilePage
