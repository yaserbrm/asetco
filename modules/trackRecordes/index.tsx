import React, { useCallback, useEffect } from 'react'

import { CurrentTable } from './constant/page'
import { TrackRecordsContainer } from './style'

import HeaderMenu from './components/HeaderMenu'
import TableTrackRecords from './components/TableTrackRecords'
import HeaderTitle from './components/HeaderTitle'

import { useTrackRecordsService } from 'pages/track-records/context'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { useTractRecordsStateCtx } from './context'
import { ProductsType } from 'interfaces/globalEnums'
import ImagesPreviewModal from 'components/uiKit/ImagesPreviewModal/ImagesPreviewModal'
import WornCarImagesModal from './components/modal/wornCarImagesModal'

const TrackRecords = () => {
  const services = useTrackRecordsService()

  const {
    productType,
    filterArg,
    setDataSourceHandler,
    setPaginationTotalHandler,
    activePage,
    setLoadingHandler,
    createDataTableImportedCars,
    createDataTableWornCars,
    visibleImagesPreviewModal,
    switchImagesPreviewModalHandler,
    orderImages,
    productsInfo,
    setModalImagesHandler,
    toggleModalImagesLoading,
    modalImagesLoading,
    imagesWornCar,
    getWornCarsImagesReq,
    createDataTableTransactions,
  } = useTractRecordsStateCtx()

  //REQUESTS
  const getWornCarsRequest = useCallback(async () => {
    const formData = new FormData()
    formData.append('PageIndex', String(filterArg.PageIndex))
    formData.append('PageSize', String(filterArg.PageSize))
    formData.append('SortType', String(filterArg.SortType))

    try {
      const { data } = await services?.wornMaster.getAllWornCars(formData)

      if (data?.status != '200') {
        ToastAlert.error(' خطا در دریافت اطلاعات خودرو های فرسوده')
        return
      }

      if (data?.wMatsers) setDataSourceHandler(createDataTableWornCars(data.wMatsers.reverse()))
      if (data?.count) setPaginationTotalHandler(data.count)
    } catch {
      ToastAlert.error(' خطا در دریافت اطلاعات خودرو های فرسوده')
    } finally {
      setLoadingHandler(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterArg, services?.wornMaster])

  const getImportedCarsRequest = useCallback(async () => {
    const formData = new FormData()
    formData.append('PageIndex', String(filterArg.PageIndex))
    formData.append('PageSize', String(filterArg.PageSize))
    formData.append('SortType', String(filterArg.SortType))
    formData.append('Filter_ProductType', productType)

    try {
      const { data } = await services?.orderServices.getAllImportedCars(formData)

      if (data?.status != 200) {
        ToastAlert.error(' خطا در دریافت اطلاعات')
        return
      }

      if (data?.orders) {
        setDataSourceHandler(createDataTableImportedCars(data.orders.reverse()))
      }
      if (data?.count) setPaginationTotalHandler(data.count)
    } catch {
      ToastAlert.error(' خطا در دریافت اطلاعات')
    } finally {
      setLoadingHandler(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterArg, services?.orderServices, productType])

  const getOrderImagesReq = useCallback(async () => {
    const formData = new FormData()
    formData.append('PID', String(productsInfo?.id))

    try {
      const { data } = await services?.productService.getProductByID(formData)

      if (data?.status != 200) {
        ToastAlert.error(' خطا در دریافت اطلاعات')
        return
      }

      if (data?.listFiles) setModalImagesHandler(data.listFiles)
    } catch {
      if (ProductsType.AUTO_PARTS_CARS === 1) {
        ToastAlert.error(' خطا در دریافت تصاویر خودرو های وارداتی')
      } else {
        ToastAlert.error(' خطا در دریافت تصاویر قطعات خودرو')
      }
    }

    toggleModalImagesLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInfo, services])

  const getOrderTransactions = useCallback(() => {
    services?.transactionsService
      .getAllByUser()
      .then(res => {
        if (res.data) {
          setDataSourceHandler(createDataTableTransactions(res.data.reverse()))
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoadingHandler(false))
  }, [services])
  //get data sources
  useEffect(() => {
    setLoadingHandler(true)
    setDataSourceHandler([])
    if (services) {
      switch (activePage) {
        case CurrentTable.WORN_CARS:
          getWornCarsRequest()
          break
        case CurrentTable.TRANSACTIONS:
          getOrderTransactions()
          break
        default:
          getImportedCarsRequest()
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, getWornCarsRequest, services, productType])

  //get image details modal
  useEffect(() => {
    if (services && visibleImagesPreviewModal) {
      toggleModalImagesLoading()
      if (CurrentTable.WORN_CARS === activePage) {
        getWornCarsImagesReq()
      } else {
        getOrderImagesReq()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleImagesPreviewModal, getOrderImagesReq, services, activePage])

  return (
    <>
      <ImagesPreviewModal
        visible={visibleImagesPreviewModal && activePage !== CurrentTable.WORN_CARS}
        onClose={switchImagesPreviewModalHandler}
        title={{
          name: productsInfo?.name || '',
          model: productsInfo?.model || '',
        }}
        images={orderImages || []}
        loading={modalImagesLoading}
      />

      <WornCarImagesModal
        setShowImagesDialog={switchImagesPreviewModalHandler}
        showImagesDialog={visibleImagesPreviewModal && activePage == CurrentTable.WORN_CARS}
        wornInfo={{
          name: productsInfo?.name || '',
          model: productsInfo?.model || '',
        }}
        files={imagesWornCar}
        loading={modalImagesLoading}
      />

      <TrackRecordsContainer>
        <HeaderTitle />
        <HeaderMenu />
        <TableTrackRecords />
      </TrackRecordsContainer>
    </>
  )
}

export default TrackRecords
