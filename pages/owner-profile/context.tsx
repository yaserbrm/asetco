import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

import { CityService, ICity, ICityS } from 'core/wcs/city'
import { IProvince, IProvinceS, ProvinceService } from 'core/wcs/province'
import { useUserInfo } from 'hooks/userInfo'
import { IOwners, IOwnersS, OwnersService } from 'core/wcs/owners'
import { CommonService, ICommon, ICommonS } from 'core/wcs/common'

interface contextValue {
  owner: IOwnersS<IOwners>
  provinces: IProvinceS<IProvince>
  cities: ICityS<ICity>
  common: ICommonS<ICommon>
}

export const OwnerProfileServiceContext = createContext<contextValue | undefined>(undefined)

const OwnerProfileContext: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useUserInfo()
  const [services, setServices] = useState<contextValue | undefined>()

  useEffect(() => {
    if (token) {
      setServices({
        owner: new OwnersService(token),
        provinces: new ProvinceService(token),
        cities: new CityService(token),
        common: new CommonService(token),
      })
    }
  }, [token])

  return <OwnerProfileServiceContext.Provider value={services}>{children}</OwnerProfileServiceContext.Provider>
}

export const useOwnerProfileService = () => useContext(OwnerProfileServiceContext)!

export default OwnerProfileContext
