import { createContext, FC, useContext, useEffect, useState } from 'react'

import { CityService, ICity, ICityS } from 'core/wcs/city'
import { IProvince, IProvinceS, ProvinceService } from 'core/wcs/province'
import { BrandCarService, IBrandCar, IBrandCarS } from 'core/wcs/brandCar'
import { IModelCar, IModelCarS, ModelCarService } from 'core/wcs/modelCar'
import { IWornMaster, IWornMasterS, WornMasterService } from 'core/wcs/wornMaster'
import { useUserInfo } from 'hooks/userInfo'

interface contextValue {
  provinceServices: IProvinceS<IProvince>
  cityServices: ICityS<ICity>
  brandCarServices: IBrandCarS<IBrandCar>
  modelCarServices: IModelCarS<IModelCar>
  inquiryPriceServices: IWornMasterS<IWornMaster>
}

export const PriceInquiryServiceContext = createContext<contextValue | undefined>(undefined)

interface PriceInquiryContextProps {
  children: React.ReactNode
}
const PriceInquiryContext: FC<PriceInquiryContextProps> = ({ children }) => {
  const { token } = useUserInfo()
  const [services, setServices] = useState<contextValue | undefined>()

  useEffect(() => {
    if (token) {
      setServices({
        cityServices: new CityService(token),
        provinceServices: new ProvinceService(token),
        brandCarServices: new BrandCarService(token),
        modelCarServices: new ModelCarService(token),
        inquiryPriceServices: new WornMasterService(token),
      })
    }
  }, [token])

  return <PriceInquiryServiceContext.Provider value={services}>{children}</PriceInquiryServiceContext.Provider>
}

export const usePriceInquiryContext = () => useContext(PriceInquiryServiceContext)!

export default PriceInquiryContext
