import Meta from 'components/uiKit/meta/meta'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { CommonService, IProductGroup } from 'core/wcs/common'
import { IProductGetAll } from 'core/wcs/product'
import { useLoading } from 'hooks/useLoading'
import { ProductsType } from 'interfaces/globalEnums'
import Products from 'modules/products'
import { FC, useEffect, useState } from 'react'
import ProductsCtxProvider from '../context'

const FormData = require('form-data')

const AutoPartsPage: FC = () => {
  const { setLoading } = useLoading()
  const [products, setProducts] = useState<IProductGetAll[]>([])
  const [productGroup, setProductGroup] = useState<IProductGroup[]>([])
  const [noData, setNoData] = useState<boolean>(false)
  const fetchProduct = async () => {
    setLoading(true)

    const formDataProduct = new FormData()
    const formDataProductGroup = new FormData()
    formDataProduct.append('Filter_ProductsType', ProductsType.AUTO_PARTS_CARS)
    formDataProductGroup.append('TypeP', ProductsType.AUTO_PARTS_CARS)

    const commonService = new CommonService()

    try {
      const { data: productData } = await commonService.getAllProducts(formDataProduct)
      const { data: productGroupData } = await commonService.getAllProductGroup(formDataProductGroup)

      if (productData && productGroupData) {
        return {
          products: productData,
          productGroup: productGroupData,
        }
      } else {
        ToastAlert.error('خطا در دریافت اطلاعات ')
        return {
          products: [],
          productGroup: [],
        }
      }
    } catch {
      ToastAlert.error('خطا در دریافت اطلاعات ')
      return {
        products: [],
        productGroup: [],
      }
    }
  }
  useEffect(() => {
    fetchProduct()
      .then(res => {
        setProducts(res.products)
        setProductGroup(res.productGroup)
        if (!res.products.length) {
          setNoData(true)
        }
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProductsCtxProvider products={products} productGroup={productGroup} noData={noData}>
      <Meta
        title="سایت آستکو یدک / قطعات خودرو "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک , قطعات خودرو  , قطعه استوک"
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک / قطعات خودرو "
        ogType="company"
      />
      <Products />
    </ProductsCtxProvider>
  )
}

// export const getStaticProps = async () => {
//   const formDataProduct = new FormData()
//   const formDataProductGroup = new FormData()
//   formDataProduct.append('Filter_ProductsType', ProductsType.AUTO_PARTS_CARS)
//   formDataProductGroup.append('TypeP', ProductsType.AUTO_PARTS_CARS)

//   const commonService = new CommonService()

//   try {
//     const { data: productData } = await commonService.getAllProducts(formDataProduct)
//     const { data: productGroupData } = await commonService.getAllProductGroup(formDataProductGroup)
//     if (productData && productGroupData) {
//       return {
//         props: {
//           products: productData,
//           productGroup: productGroupData,
//         },
//         revalidate: 3600,
//       }
//     } else {
//       return {
//         props: {
//           error: 'خطا در دریافت اطلاعات',
//           products: [],
//           productGroup: [],
//         },
//       }
//     }
//   } catch {
//     return {
//       props: {
//         products: [],
//         productGroup: [],
//       },
//       revalidate: 3600,
//     }
//   }
// }
export default AutoPartsPage
