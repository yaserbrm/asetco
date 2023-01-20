import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IProductGetAll } from 'core/wcs/product'
import { ProductsType } from 'interfaces/globalEnums'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import ProductsCtxProvider from '../context'

const FormData = require('form-data')

import Meta from 'components/uiKit/meta/meta'
import Products from 'modules/products'
import { CommonService, IProductGroup } from 'core/wcs/common'
import { useLoading } from 'hooks/useLoading'

const ImportedCarsPage: FC = () => {
  const { setLoading } = useLoading()
  const router = useRouter()
  const [products, setProducts] = useState<IProductGetAll[]>([])
  const [productGroup, setProductGroup] = useState<IProductGroup[]>([])
  const [noData, setNoData] = useState<boolean>(false)
  const fetchProduct = async () => {
    const formDataProduct = new FormData()
    const formDataProductGroup = new FormData()
    formDataProduct.append('Filter_ProductsType', ProductsType.IMPORTED_CAR)
    formDataProductGroup.append('TypeP', ProductsType.IMPORTED_CAR)

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
    setLoading(true)
    fetchProduct()
      .then(res => {
        setProducts(res.products)
        setProductGroup(res.productGroup)
        if (!res.products.length) {
          setNoData(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])
  return (
    <ProductsCtxProvider products={products} productGroup={productGroup} noData={noData}>
      <Meta
        title="سایت آستکو یدک / خودرو وارداتی "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک , خوردرو وارداتی"
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک / خودرو وارداتی "
        ogType="company"
      />
      <Products />
    </ProductsCtxProvider>
  )
}

// export const getStaticProps = async () => {
//   const formDataProduct = new FormData()
//   const formDataProductGroup = new FormData()
//   formDataProduct.append('Filter_ProductsType', ProductsType.IMPORTED_CAR)
//   formDataProductGroup.append('TypeP', ProductsType.IMPORTED_CAR)

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
//     }

//     return {
//       props: {
//         error: 'خطایی در دریافت اطلاعات رخ داده است',
//       },
//       revalidate: 3600,
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

export default ImportedCarsPage
