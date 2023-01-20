import SellingWornCarMain from 'modules/sellingWornCar'
import { useAccessLoadPage } from 'hooks/accessLoadPage'
import SellingWornCarContext from './context'
import { IProvince } from 'core/wcs/province'
import { IBrandCar } from 'core/wcs/brandCar'
import { FC, useEffect } from 'react'
import { IWornCarAgents, WornMasterService } from 'core/wcs/wornMaster'
import { useLoading } from 'hooks/useLoading'
import Meta from 'components/uiKit/meta/meta'

const SellingWornCar: FC = () => {
  const { accessLoad } = useAccessLoadPage()
  const { setLoading } = useLoading()
  useEffect(() => {
    if (accessLoad) setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessLoad])
  if (!accessLoad) {
    return <></>
  }
  //if (error) ToastAlert.error(error)
  return (
    <>
      <SellingWornCarContext>
        <Meta
          title="سایت آستکو یدک / فروش خودروی فرسوده "
          description="Asetco yadak application "
          keywords=" خودرو فرسوده, آستکو , استکو , آستکو یدک , فروش خودروی فرسوده "
          ogImage="assets/png/home-page.jpg"
          ogUrl="https://www.asetcoyadak.com"
          ogTitle="سایت آستکو یدک / فروش خودروی فرسوده "
          ogType="company"
        />

        <SellingWornCarMain />
      </SellingWornCarContext>
    </>
  )
}
export default SellingWornCar

// export const getStaticProps = async () => {
//   try {
//     const service = {
//       brands: new BrandCarService(),
//       provinces: new ProvinceService(),
//       wornMaster: new WornMasterService(),
//     }
//     const { data: province } = await service.provinces.getAllProvince()
//     const { data: brands } = await service.brands.getAllBrand()
//     const { data: wornMasterAgents } = await service.wornMaster.getAllUserAgents()
//     if (province && brands) {
//       return {
//         props: {
//           province,
//           brands,
//           wornMasterAgents: wornMasterAgents?.userAgents,
//         },
//         revalidate: 3600,
//       }
//     } else {
//       return {
//         props: {
//           error: 'خطا در دریافت اطلاعات',
//         },
//         revalidate: 3600,
//       }
//     }
//   } catch {
//     return {
//       props: {
//         error: 'خطا در دریافت اطلاعات',
//       },
//       revalidate: 3600,
//     }
//   }
// }
