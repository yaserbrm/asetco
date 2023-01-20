import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

import { useUserInfo } from 'hooks/userInfo'
import { IWornMaster, IWornMasterS, WornMasterService } from 'core/wcs/wornMaster'
import { CommonService, ICommon, ICommonS } from 'core/wcs/common'
import { IImportedCar, IOrderS, OrderService } from 'core/wcs/order'
import { IProduct, IProductS, ProductService } from 'core/wcs/product'
import { TransactionsService } from 'core/wcs/orderTransactions/transactionsService'
import { IOrderTransactionService } from 'core/wcs/orderTransactions/IOrderTransaction'

interface contextValue {
  wornMaster: IWornMasterS<IWornMaster>
  CommonService: ICommonS<ICommon>
  orderServices: IOrderS<IImportedCar>
  productService: IProductS<IProduct>
  transactionsService: IOrderTransactionService
}

export const TrackRecordsServiceContext = createContext<contextValue | undefined>(undefined)

const TrackRecordsContext: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useUserInfo()

  const [services, setServices] = useState<contextValue | undefined>()
  useEffect(() => {
    if (token) {
      setServices({
        wornMaster: new WornMasterService(token!),
        CommonService: new CommonService(token!),
        orderServices: new OrderService(token!),
        productService: new ProductService(),
        transactionsService: new TransactionsService(token!),
      })
    }
  }, [token])

  return <TrackRecordsServiceContext.Provider value={services}>{children}</TrackRecordsServiceContext.Provider>
}

export const useTrackRecordsService = () => useContext(TrackRecordsServiceContext)!

export default TrackRecordsContext
