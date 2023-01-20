import { IProvince } from 'core/wcs/province'
import { IBrandCar } from 'core/wcs/brandCar'
import { FC, useState, useEffect, useCallback } from 'react'
import SellingWornCarPage from './components/sellingWornCarPage'
import { SellingWornCarPageContext } from './context/context'
import { IWornCarAgents } from 'core/wcs/wornMaster'
import { useSellingWornCarService } from 'pages/selling-worn-car/context'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'

interface ISellingWornCarMainProps {
  province: IProvince[]
  brands: IBrandCar[]
  wornMasterAgents: IWornCarAgents[]
}
const SellingWornCarMain: FC = () => {
  const [brands, setBrands] = useState<IBrandCar[]>([])
  const [province, setProvince] = useState<IProvince[]>([])
  const [wornMasterAgents, setWornMasterAgents] = useState<IWornCarAgents[]>([])
  const service = useSellingWornCarService()

  const fetchAllBrands = useCallback(async () => {
    try {
      const { data } = await service.brands.getAllBrand()
      if (!data) {
        ToastAlert.error('خطا در دریافت لیست  برند ها')
        return
      }

      setBrands(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست  برند ها')
    }
  }, [service])

  const fetchAllProvinces = useCallback(async () => {
    try {
      const { data } = await service.provinces.getAllProvince()

      if (!data) {
        ToastAlert.error('خطا در دریافت لیست استان ها')
        return
      }
      setProvince(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست استان ها')
    }
  }, [service])

  const fetchAllWornMasterCars = useCallback(async () => {
    try {
      const { data } = await service.wornMaster.getAllUserAgents()

      if (!data) {
        ToastAlert.error('خطا در دریافت لیست استان ها')
        return
      }
      setWornMasterAgents(data.userAgents || [])
    } catch {
      ToastAlert.error('خطا در دریافت لیست استان ها')
    }
  }, [service])

  useEffect(() => {
    if (service) {
      fetchAllBrands()
      fetchAllProvinces()
      fetchAllWornMasterCars()
    }
  }, [fetchAllBrands, fetchAllProvinces, fetchAllWornMasterCars, service])
  return (
    <SellingWornCarPageContext brands={brands} province={province} wornMasterAgents={wornMasterAgents}>
      <SellingWornCarPage />
    </SellingWornCarPageContext>
  )
}

export default SellingWornCarMain
