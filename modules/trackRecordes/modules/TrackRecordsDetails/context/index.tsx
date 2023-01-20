import { IFileWorn, IWornMasterFiles } from 'core/wcs/wornMaster'
import { createContext, FC, ReactNode, useContext, useState } from 'react'
import { IDetailTrackRecords } from '../interfaces'
import { WornImageFilesTab } from '../interfaces/wornImageFilesTab'

interface ICtxValue {
  states: {
    currentPage: string | undefined
    imagesPreviewModal: IFileWorn[]
    imagesModalVisibility: boolean
    detailData: IDetailTrackRecords
    currentTabWornImages: string
    wornCarImages: IWornMasterFiles | undefined
  }
  handlers: {
    setDetailDataHandler: (data: IDetailTrackRecords) => void
    setCurrentPageHandler: (page: string) => void
    setImagesPreviewModalHandler: (images: IFileWorn[]) => void
    switchImagesModalVisibility: () => void
    setCurrentTabWornImagesHandler: (tab: string) => void
    setWornCarImagesHandler: (images: IWornMasterFiles) => void
  }
}

export const TrackRecordsDetailsContext = createContext<ICtxValue | undefined>(undefined)

export const TrackRecordsDetailsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>()
  const [imagesPreviewModal, setImagesPreviewModal] = useState<IFileWorn[]>([])
  const [imagesModalVisibility, setImagesModalVisibility] = useState<boolean>(false)
  const [detailData, setDetailData] = useState<IDetailTrackRecords>({})
  const [currentTabWornImages, setCurrentTabWornImages] = useState<string>(WornImageFilesTab.filesImages.toString())
  const [wornCarImages, setWornCarImages] = useState<IWornMasterFiles>()

  //HANDLER
  const setDetailDataHandler = (data: IDetailTrackRecords) => setDetailData(data)
  const setCurrentPageHandler = (page: string) => setCurrentPage(page)
  const setImagesPreviewModalHandler = (images: IFileWorn[]) => setImagesPreviewModal(images)
  const switchImagesModalVisibility = () => setImagesModalVisibility(prev => !prev)
  const setCurrentTabWornImagesHandler = (tab: string) => setCurrentTabWornImages(tab)
  const setWornCarImagesHandler = (images: IWornMasterFiles) => setWornCarImages(images)

  const ctxValue: ICtxValue = {
    states: {
      detailData,
      currentPage,
      imagesPreviewModal,
      imagesModalVisibility,
      currentTabWornImages,
      wornCarImages,
    },
    handlers: {
      setDetailDataHandler,
      setCurrentPageHandler,
      setImagesPreviewModalHandler,
      switchImagesModalVisibility,
      setCurrentTabWornImagesHandler,
      setWornCarImagesHandler,
    },
  }

  return <TrackRecordsDetailsContext.Provider value={ctxValue}>{children}</TrackRecordsDetailsContext.Provider>
}

export const useTrackRecordsDetailsCtx = () => useContext(TrackRecordsDetailsContext)!
