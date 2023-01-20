import { localStorageName } from 'constants/localItem'
import { AuthService, IAuthentication, IAuthenticationS } from 'core/wcs/Authentication'
import { BrandCarService, IBrandCar, IBrandCarS } from 'core/wcs/brandCar'
import { CityService, ICity, ICityS } from 'core/wcs/city'
import { IModelCar, IModelCarS, ModelCarService } from 'core/wcs/modelCar'
import { IProvince, IProvinceS, ProvinceService } from 'core/wcs/province'
import { IWornCarAgents, IWornMaster, IWornMasterS, WornMasterService } from 'core/wcs/wornMaster'

import { useUserInfo } from 'hooks/userInfo'
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

interface contextValue {
  cities: ICityS<ICity>
  models: IModelCarS<IModelCar>
  wornCars?: IWornMasterS<IWornMaster>
  authentication?: IAuthenticationS<IAuthentication>
  brands: IBrandCarS<IBrandCar>
  provinces: IProvinceS<IProvince>
  wornMaster: IWornMasterS<IWornMaster>
}

export const SellingWornCarServiceContext = createContext<contextValue | undefined>(undefined)

const SellingWornCarContext: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useUserInfo()
  const [services, setServices] = useState<contextValue | undefined>()
  useEffect(() => {
    if (token) {
      setServices({
        cities: new CityService(token),
        models: new ModelCarService(token),
        wornCars: new WornMasterService(token),
        authentication: new AuthService(token),
        brands: new BrandCarService(token),
        provinces: new ProvinceService(token),
        wornMaster: new WornMasterService(token),
      })
    }
  }, [token])
  return <SellingWornCarServiceContext.Provider value={services}>{children}</SellingWornCarServiceContext.Provider>
}

export const useSellingWornCarService = () => useContext(SellingWornCarServiceContext)!

export default SellingWornCarContext
