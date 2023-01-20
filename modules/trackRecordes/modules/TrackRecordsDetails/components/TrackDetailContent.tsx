import React from 'react'
import WornCarsDetails from './WornCarsDetails'
import { useTrackRecordsDetailsCtx } from '../context'
import { TrackDetailContentContainer } from '../style'
import { CurrentTable } from 'modules/trackRecordes/constant/page'
import AutoPartsImportedCarsDetails from './AutoPartsImportedCarsDetails'

const TrackDetailContent = () => {
  const {
    states: { currentPage },
  } = useTrackRecordsDetailsCtx()

  return (
    <TrackDetailContentContainer>
      {currentPage === CurrentTable.WORN_CARS ? <WornCarsDetails /> : <AutoPartsImportedCarsDetails />}
    </TrackDetailContentContainer>
  )
}

export default TrackDetailContent
