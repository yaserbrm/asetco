import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IProductDetail, ProductService } from 'core/wcs/product'
import ProductDetail from 'modules/products/module/productDetail'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import ImportedCarsDetailDataContext from '../../detailsContext'
import { useLoading } from 'hooks/useLoading'
const FormData = require('form-data')

const WornCarsDetail: FC = () => {
  const [product, setProduct] = useState<IProductDetail>()
  const route = useRouter()
  const { setLoading } = useLoading()

  const fetchProduct = useCallback(async () => {
    if (!route.query.wornCarsID) return
    setLoading(true)

    const productService = new ProductService()
    const formData = new FormData()
    formData.append('PID', route.query.wornCarsID)
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
  }, [route.query.wornCarsID])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  return (
    <ImportedCarsDetailDataContext productDetail={product}>
      <ProductDetail />
    </ImportedCarsDetailDataContext>
  )
}

export default WornCarsDetail
