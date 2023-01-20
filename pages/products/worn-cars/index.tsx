import { FC, useEffect, useState } from 'react'

import { IProductGetAll } from 'core/wcs/product'
import { ProductsType } from 'interfaces/globalEnums'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import ProductsCtxProvider from '../context'

const FormData = require('form-data')

import Meta from 'components/uiKit/meta/meta'
import Products from 'modules/products'
import { CommonService, IProductGroup } from 'core/wcs/common'
import { useLoading } from 'hooks/useLoading'

const WornCarsPage: FC = () => {
  const { setLoading } = useLoading()

  const [products, setProducts] = useState<IProductGetAll[]>([])
  const [productGroup, setProductGroup] = useState<IProductGroup[]>([])
  const [noData, setNoData] = useState<boolean>(false)

  const fetchProduct = async () => {
    setLoading(true)
    const formDataProduct = new FormData()
    const formDataProductGroup = new FormData()
    formDataProduct.append('Filter_ProductsType', ProductsType.WORN_CARS)
    formDataProductGroup.append('TypeP', ProductsType.WORN_CARS)

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
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProduct().then(res => {
      setProducts(res.products)
      setProductGroup(res.productGroup)
      if (!res.products.length) {
        setNoData(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ProductsCtxProvider products={products} productGroup={productGroup} noData={noData}>
      <Meta
        title="سایت آستکو یدک / خودرو وارداتی "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک , خودرو وارداتی"
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک /  وسایل نقلیه فرسوده "
        ogType="company"
      />
      <Products />
    </ProductsCtxProvider>
  )
}

export default WornCarsPage
