import { createContext, FC, useContext, useEffect, useState } from 'react'

import { IProductGetAll } from 'core/wcs/product'
import { useUserInfo } from 'hooks/userInfo'
import { IImportedCar, IOrderS, OrderService } from 'core/wcs/order'
import { CityService, ICity, ICityS } from 'core/wcs/city'
import { IProvince, IProvinceS, ProvinceService } from 'core/wcs/province'
import { IPaymentServiceS, PaymentService } from 'core/wcs/payment'

interface contextValue {
  OrderService: IOrderS<IImportedCar>
  cities: ICityS<ICity>
  province: IProvinceS<IProvince>
  paymentService: IPaymentServiceS
}

export const OrderContext = createContext<contextValue | undefined>(undefined)

interface OrderProps {
  children: React.ReactNode
}
const OrderCtx: FC<OrderProps> = ({ children }) => {
  const { token } = useUserInfo()
  const [services, setServices] = useState<contextValue | undefined>()

  useEffect(() => {
    if (token) {
      console.log({ token })
      setServices({
        cities: new CityService(token),
        province: new ProvinceService(token),
        OrderService: new OrderService(token),
        paymentService: new PaymentService(token),
      })
    }
  }, [token])

  //const contextValue: contextValue = { OrderService: new OrderService(token), cities: new CityService() }

  return <OrderContext.Provider value={services}>{children}</OrderContext.Provider>
}

export const useOrderServiceContext = () => useContext(OrderContext)!

export default OrderCtx
