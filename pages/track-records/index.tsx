import React, { useEffect } from 'react'
import TrackRecords from 'modules/trackRecordes'
import { NextPage } from 'next'
import { useAccessLoadPage } from 'hooks/accessLoadPage'
import TrackRecordsContext from './context'
import { TractRecordsStateProvider } from 'modules/trackRecordes/context'
import { useLoading } from 'hooks/useLoading'
import Meta from 'components/uiKit/meta/meta'

const TrackRecordsPage: NextPage = () => {
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
    <TrackRecordsContext>
      <TractRecordsStateProvider>
        <Meta
          title="سایت آستکو یدک /  پیگیری سوابق  "
          description="Asetco yadak application "
          keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
          ogImage="assets/png/home-page.jpg"
          ogUrl="https://www.asetcoyadak.com"
          ogTitle="سایت آستکو یدک /  پیگیری سوابق  "
          ogType="company"
        />
        <TrackRecords />
      </TractRecordsStateProvider>
    </TrackRecordsContext>
  )
}

export default TrackRecordsPage
