import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useAccessLoadPage } from 'hooks/accessLoadPage'
import TrackRecordsContext from './context'
import { useLoading } from 'hooks/useLoading'
import TrackRecordsDetails from 'modules/trackRecordes/modules/TrackRecordsDetails'
import { TrackRecordsDetailsProvider } from 'modules/trackRecordes/modules/TrackRecordsDetails/context'

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
      <TrackRecordsDetailsProvider>
        <TrackRecordsDetails />
      </TrackRecordsDetailsProvider>
    </TrackRecordsContext>
  )
}

export default TrackRecordsPage
