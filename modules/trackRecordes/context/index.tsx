import { SuggestedPricesTable } from 'components/uiKit/table/components'
import { ITableData } from 'components/uiKit/table/interfaces'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IImportedCar } from 'core/wcs/order'
import { ITransaction } from 'core/wcs/orderTransactions/IOrderTransaction'
import { IFileWorn, IWornCarGetAll, IWornMasterFiles } from 'core/wcs/wornMaster'
import { formatNumberToCurrency } from 'helper/formatNumberToCurrency'
import moment from 'moment-jalaali'
import { useTrackRecordsService } from 'pages/track-records/context'
import { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react'
import { CurrentTable } from '../constant/page'
import { IGetAllUserArg, PagesType } from '../interfaces'
import { OrderStatusText } from '../modules/TrackRecordsDetails/interfaces/OrderStatus'

interface IProductsInfo {
  name: string
  id: string | number
  model: string
}

const imagesIconPath = '/assets/svg/tractRecords/imagesIcon.svg'

interface IContextValue {
  activePage: PagesType
  dataSource: ITableData[]
  paginationTotal: number
  filterArg: IGetAllUserArg
  productType: string
  loading: boolean
  visibleImagesPreviewModal: boolean
  orderImages: IFileWorn[] | null
  productsInfo: IProductsInfo | undefined
  modalImagesLoading: boolean
  imagesWornCar: IWornMasterFiles | undefined

  switchPageHandler: (page: PagesType) => void
  setDataSourceHandler: (data: ITableData[]) => void
  setPaginationTotalHandler: (total: number) => void
  setFilterArgHandler: (arg: IGetAllUserArg) => void
  setProductType: (id: string) => void
  setLoadingHandler: (loading: boolean) => void
  switchImagesPreviewModalHandler: () => void
  createDataTableImportedCars: (data: IImportedCar[]) => ITableData[]
  createDataTableWornCars: (data: IWornCarGetAll[]) => ITableData[]
  setModalImagesHandler: (images: IFileWorn[]) => void
  toggleModalImagesLoading: () => void
  setWornCarsImagesHandler: (images: IWornMasterFiles) => void
  getWornCarsImagesReq: () => void
  createDataTableTransactions: (data: ITransaction[]) => ITableData[]
}

export const TractRecordsStateCtx = createContext<IContextValue | undefined>(undefined)

export const TractRecordsStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const services = useTrackRecordsService()

  const [activePage, setActivePage] = useState<PagesType>(CurrentTable.WORN_CARS)
  const [dataSource, setDataSource] = useState<ITableData[]>([])
  const [paginationTotal, setPaginationTotal] = useState<number>(0)
  const [productType, setProductType] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [visibleImagesPreviewModal, setVisibleImagesPreviewModal] = useState<boolean>(false)
  const [filterArg, setFilterArg] = useState<IGetAllUserArg>({
    PageIndex: 1,
    PageSize: 10,
    SortType: 1,
  })
  const [orderImages, setOrderImages] = useState<IFileWorn[] | null>(null)
  const [productsInfo, setProductsInfo] = useState<IProductsInfo>()
  const [modalImagesLoading, setModalImagesLoading] = useState<boolean>(false)
  const [imagesWornCar, setImagesWornCar] = useState<IWornMasterFiles | undefined>()

  //HANDLERS
  const switchPageHandler = (page: PagesType) => setActivePage(page)
  const setDataSourceHandler = (data: ITableData[]) => setDataSource(data)
  const setPaginationTotalHandler = (total: number) => setPaginationTotal(total)
  const setFilterArgHandler = (arg: IGetAllUserArg) => setFilterArg(arg)
  const setLoadingHandler = (loading: boolean) => setLoading(loading)
  const setProductTypeHandler = (id: string) => setProductType(id)
  const switchImagesPreviewModalHandler = () => {
    if (visibleImagesPreviewModal) {
      setOrderImages(null)
      setImagesWornCar(undefined)
    }
    setVisibleImagesPreviewModal(prev => !prev)
  }
  const setModalImagesHandler = (images: IFileWorn[]) => setOrderImages(images)
  const toggleModalImagesLoading = () => setModalImagesLoading(prev => !prev)
  const setWornCarsImagesHandler = (images: IWornMasterFiles) => setImagesWornCar(images)

  //create data table
  const createDataTableWornCars = (data: IWornCarGetAll[]): ITableData[] => {
    const newData: ITableData[] = []
    data.forEach((item, index) => {
      const newTableData = {
        uid: item.wm_ID,
        name: item.wornCarName,
        date: moment(item.wm_DateReg).format('jYYYY/jM/jD'),
        suggestedPrices: <SuggestedPricesTable minPrice={+item.b_MinPrice} maxPrice={+item.b_MaxPrice} />,
        buyAmount: formatNumberToCurrency(+item.c_BuyAmount),
        preAmount: formatNumberToCurrency(+item.c_PreAmount),
        remaining: formatNumberToCurrency(+item.f_Remaining),
        otherPayed: formatNumberToCurrency(+item.f_OtherPayed),
        parking: item.c_Parking,
        agentName: item.b_AgentName,
        photos: (
          <>
            {
              <span
                className="material-icons photos-icon-column"
                onClick={() => {
                  switchImagesPreviewModalHandler()
                  setProductsInfo({
                    name: item.wm_FName + ' ' + item.wm_LName,
                    model: item.wornCarName,
                    id: item.wm_ID,
                  })
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagesIconPath} alt="photos" />
              </span>
            }
          </>
        ),
        carState: item.c_WornCarStateStr,
      }

      newData.push(newTableData)
    })
    return newData
  }

  const createDataTableImportedCars = (data: IImportedCar[]): ITableData[] => {
    const newData: ITableData[] = []
    data.forEach((item, index) => {
      const newTableData = {
        uid: item.ord_ID,
        name: item.ord_Name,
        carName: item.ord_FullName,
        orderIsUsed: item.ord_IsUsedStr,
        date: moment(item.ord_Date).format('jYYYY/jM/jD'),
        price: formatNumberToCurrency(+item.ord_Price),
        count: item.ord_Count,
        totalPrice: formatNumberToCurrency(item.ord_TotalPrice),
        description: item.ord_Description,
        photos: (
          <>
            {
              <span
                className="material-icons photos-icon-column"
                onClick={() => {
                  switchImagesPreviewModalHandler()
                  setProductsInfo({
                    name: item.ord_Name,
                    model: item.ord_FullName,
                    id: item.ord_PID,
                  })
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagesIconPath} alt="photos" />
              </span>
            }
          </>
        ),
        resultComment: OrderStatusText[Number(item?.ord_ResultComment)],
      }

      newData.push(newTableData)
    })
    return newData
  }

  //REQUESTS
  const getWornCarsImagesReq = useCallback(async () => {
    const formData = new FormData()
    formData.append('WornCarId', String(productsInfo?.id))

    try {
      const { data } = await services?.wornMaster.getAllWornMasterFiles(formData)
      if (data) setImagesWornCar(data)
    } catch {
      ToastAlert.error(' خطا در دریافت تصاویر خودرو های فرسوده')
    } finally {
      toggleModalImagesLoading()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsInfo, services])
  const createDataTableTransactions = (data: ITransaction[]): ITableData[] => {
    const newData: ITableData[] = []
    data.forEach(item => {
      const newTableData = {
        ordTrans_ID: item.ordTrans_ID,
        ordTrans_UsrID: item.ordTrans_UsrID,
        ordTrans_DateTrans: moment(item.ordTrans_DateTrans).format('jYYYY/jM/jD'),
        ordTrans_TrackCode: item.ordTrans_TrackCode,
        ordTrans_OrdrCod: item.ordTrans_OrdrCod,
        ordTrans_Price: item.ordTrans_Price.toLocaleString(),
      }

      newData.push(newTableData)
    })
    return newData
  }

  const ctxValue: IContextValue = {
    productType,
    setProductType: setProductTypeHandler,
    activePage,
    switchPageHandler,
    dataSource,
    setDataSourceHandler,
    paginationTotal,
    setPaginationTotalHandler,
    filterArg,
    setFilterArgHandler,
    loading,
    setLoadingHandler,
    visibleImagesPreviewModal,
    switchImagesPreviewModalHandler,
    createDataTableWornCars,
    createDataTableImportedCars,
    orderImages,
    productsInfo,
    setModalImagesHandler,
    modalImagesLoading,
    toggleModalImagesLoading,
    imagesWornCar,
    setWornCarsImagesHandler,
    getWornCarsImagesReq,
    createDataTableTransactions,
  }

  return <TractRecordsStateCtx.Provider value={ctxValue}>{children}</TractRecordsStateCtx.Provider>
}

export const useTractRecordsStateCtx = () => useContext(TractRecordsStateCtx)!
