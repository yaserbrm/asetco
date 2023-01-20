import ImagesPreviewModal from 'components/uiKit/ImagesPreviewModal/ImagesPreviewModal'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import useMediaQuery from 'hooks/mediaQuery'
import { useLoading } from 'hooks/useLoading'
import { ProductsType } from 'interfaces/globalEnums'
import { Routes } from 'interfaces/Routes'
import { useRouter } from 'next/router'
import { useTrackRecordsService } from 'pages/track-records/context'
import React, { useCallback, useEffect } from 'react'
import { CurrentTable } from '../../constant/page'
import DetailTitleHeader from './components/DetailTitleHeader'
import TabWornCarImages from './components/TabWornCarImages'
import TrackDetailContent from './components/TrackDetailContent'
import { useTrackRecordsDetailsCtx } from './context'
import { WornImageFilesTab } from './interfaces/wornImageFilesTab'
import { TrackRecordsDetailsContainer } from './style'

const TrackRecordsDetails = () => {
  const { setLoading } = useLoading()
  const router = useRouter()
  const services = useTrackRecordsService()
  const isDesktopScreen = useMediaQuery('(min-width: 593px)')
  const { page, slug } = router.query
  const detailId = slug?.toString()
  const { handlers, states } = useTrackRecordsDetailsCtx()

  const { imagesPreviewModal, imagesModalVisibility, detailData, currentPage, currentTabWornImages, wornCarImages } = states
  const {
    switchImagesModalVisibility,
    setCurrentPageHandler,
    setImagesPreviewModalHandler,
    setDetailDataHandler,
    setWornCarImagesHandler,
  } = handlers

  //REQUESTS
  const getImportedCarsRequest = useCallback(
    async (id: string) => {
      if (!detailId) return

      const formData = new FormData()
      formData.append('OrdrID', id)

      try {
        const { data } = await services?.orderServices.getDetailByOrderID(formData)
        if (data) {
          setDetailDataHandler({ importedCarAutPart: data })
          return
        }
        ToastAlert.error(' خطا در دریافت اطلاعات')
        setLoading(false)
      } catch {
        ToastAlert.error(' خطا در دریافت اطلاعات')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [detailId, services],
  )

  const getWornCarsRequest = useCallback(async () => {
    if (!detailId) return

    const formData = new FormData()

    formData.append('WMasterID', detailId?.toString() || '')

    try {
      const { data } = await services?.wornMaster.getDetailByWMasterID(formData)
      if (data) {
        setDetailDataHandler({ wornCar: data })
        return
      }
      ToastAlert.error(' خطا در دریافت اطلاعات خودرو های فرسوده')
      setLoading(false)
    } catch {
      ToastAlert.error(' خطا در دریافت اطلاعات خودرو های فرسوده')
      setLoading(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId, services])

  const getOrderImagesReq = useCallback(
    async (id: number) => {
      const formData = new FormData()
      formData.append('PID', String(id))

      try {
        const { data } = await services?.productService.getProductByID(formData)

        if (data?.listFiles) setImagesPreviewModalHandler(data.listFiles)
      } catch {
        ToastAlert.error(' خطا در دریافت تصاویر ')
      }
      setLoading(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [services],
  )

  const getWornCarsImagesReq = useCallback(
    async (id: number) => {
      const formData = new FormData()
      formData.append('WornCarId', String(id))

      try {
        const { data } = await services?.wornMaster.getAllWornMasterFiles(formData)
        if (data) setWornCarImagesHandler(data)
      } catch {
        ToastAlert.error(' خطا در دریافت تصاویر خودرو های فرسوده')
      }
      setLoading(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [services],
  )

  //get data
  useEffect(() => {
    if (!services || !page || !detailId) return
    setCurrentPageHandler(String(page))

    switch (page) {
      case CurrentTable.WORN_CARS:
        getWornCarsRequest()
        break

      case CurrentTable.AUTO_PARTS:
        getImportedCarsRequest(detailId)
        break

      case CurrentTable.IMPORTED_CARS:
        getImportedCarsRequest(detailId)
        break

      case CurrentTable.BUY_WORN_CARS:
        getImportedCarsRequest(detailId)
        break
      default:
        router.push('/track-records')
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId, getImportedCarsRequest, page, getWornCarsRequest, services])

  //get images
  useEffect(() => {
    if (detailData?.importedCarAutPart) getOrderImagesReq(detailData?.importedCarAutPart?.ord_PID)
    if (detailData?.wornCar) getWornCarsImagesReq(detailData?.wornCar?.wornCarID)
  }, [detailData, getOrderImagesReq, getWornCarsImagesReq])

  //set loading
  useEffect(() => {
    setLoading(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //wornCarImages tabs
  useEffect(() => {
    if (wornCarImages && currentPage === CurrentTable.WORN_CARS) {
      switch (+currentTabWornImages) {
        case WornImageFilesTab.filesOthers:
          setImagesPreviewModalHandler(wornCarImages?.filesOthers)
          break
        case WornImageFilesTab.filesDocuments:
          setImagesPreviewModalHandler(wornCarImages?.filesDocuments)
          break
        case WornImageFilesTab.filesImages:
          setImagesPreviewModalHandler(wornCarImages?.filesImages)
          break
        case WornImageFilesTab.filesCards:
          setImagesPreviewModalHandler(wornCarImages?.filesCards)
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentTabWornImages, wornCarImages])

  //validate
  if (isDesktopScreen) {
    router.push(Routes.trackRecord)
    return <></>
  }

  const modalTitleCondition = () => {
    let title = {
      name: '',
      model: '',
    }

    if (detailData?.wornCar) {
      return (title = {
        name: detailData.wornCar.wornCarName,
        model: detailData.wornCar?.wm_DateReg,
      })
    }

    if (detailData?.importedCarAutPart) {
      return (title = {
        name: detailData.importedCarAutPart.ord_Name,
        model: detailData.importedCarAutPart?.ord_Model,
      })
    }

    return title
  }

  return (
    <>
      <ImagesPreviewModal
        visible={imagesModalVisibility}
        onClose={switchImagesModalVisibility}
        title={modalTitleCondition()}
        images={imagesPreviewModal || []}
      />

      <TrackRecordsDetailsContainer>
        <DetailTitleHeader />
        {currentPage === CurrentTable.WORN_CARS && <TabWornCarImages />}
        <TrackDetailContent />
      </TrackRecordsDetailsContainer>
    </>
  )
}

export default TrackRecordsDetails
