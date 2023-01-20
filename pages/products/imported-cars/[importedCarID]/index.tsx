import { FC, useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { IProductDetail, ProductService } from 'core/wcs/product'
import ProductDetail from 'modules/products/module/productDetail'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import ImportedCarsDetailDataContext from '../../detailsContext'
import { useLoading } from 'hooks/useLoading'

const FormData = require('form-data')
const ImportedCarDetail: FC = () => {
  const [product, setProduct] = useState<IProductDetail>()
  const route = useRouter()
  const { setLoading } = useLoading()

  const fetchProduct = useCallback(async () => {
    if (!route.query.importedCarID) return
    setLoading(true)

    const productService = new ProductService()
    const formData = new FormData()
    formData.append('PID', route.query.importedCarID)
    try {
      const { data } = await productService.getProductByID(formData)

      switch (data?.status) {
        case 200:
          setProduct(data)
          break
        case 400:
          ToastAlert.error('محصول مورد نظر یافت نشد')
          route.push('/404')
          break
        default:
          ToastAlert.error('خطا در دریافت یاطلاعات  ')
          break
      }
    } catch {
      ToastAlert.error('خطا در دریافت یاطلاعات  ')
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.query.importedCarID])
  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])
  return (
    <ImportedCarsDetailDataContext productDetail={product}>
      <ProductDetail />
    </ImportedCarsDetailDataContext>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const commonService = new CommonService()
//   const formDataProduct = new FormData()
//   formDataProduct.append('Filter_ProductsType', ProductsType.IMPORTED_CAR)
//   const { data } = await commonService.getAllProducts(formDataProduct)

//   const paths = data?.map(({ p_ID }) => ({ params: { importedCarID: p_ID.toString() } }))

//   if (!paths) return { paths: [], fallback: false }
//   return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async params => {
//   if (!params.params)
//     return {
//       props: {
//         error: 'صحفه مورد نظر یافت نشد',
//       },
//       revalidate: 3600,
//     }

//   const productService = new ProductService()
//   const formData = new FormData()
//   formData.append('PID', params.params.importedCarID)

//   try {
//     const { data } = await productService.getProductByID(formData)

//     if (data) {
//       return {
//         props: {
//           product: data || [],
//         },
//         revalidate: 3600,
//       }
//     }

//     return {
//       props: {
//         error: 'خطا در دریافت اطلاعات',
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

export default ImportedCarDetail
