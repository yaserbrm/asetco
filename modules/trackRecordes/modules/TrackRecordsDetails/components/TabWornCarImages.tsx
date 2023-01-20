import React from 'react'
import { Tabs } from 'antd'
import { TabWornCarImagesContainer } from '../style'
import { useTrackRecordsDetailsCtx } from '../context'
import { WornImageFilesTab } from '../interfaces/wornImageFilesTab'

const { TabPane } = Tabs

const TabWornCarImages = () => {
  const { handlers } = useTrackRecordsDetailsCtx()
  const { setCurrentTabWornImagesHandler } = handlers

  const defaultActiveTab = WornImageFilesTab.filesImages.toString()

  return (
    <TabWornCarImagesContainer>
      <Tabs defaultActiveKey={defaultActiveTab} centered onChange={current => setCurrentTabWornImagesHandler(current)}>
        <TabPane tab="سایر مدارک" key={WornImageFilesTab.filesOthers} />
        <TabPane tab="سند خودرو" key={WornImageFilesTab.filesDocuments} />
        <TabPane tab="کارت ماشین" key={WornImageFilesTab.filesCards} />
        <TabPane tab="تصاویر خودرو" key={WornImageFilesTab.filesImages} />
      </Tabs>
    </TabWornCarImagesContainer>
  )
}

export default TabWornCarImages
