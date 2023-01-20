import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import { IProductGetAll } from 'core/wcs/product'
import { CommonService, ICommon, ICommonS, IProductGroup } from 'core/wcs/common'

interface contextValue {
  setProducts: Dispatch<SetStateAction<IProductGetAll[]>>
  products: IProductGetAll[] | undefined
  commonService: ICommonS<ICommon>
  productsGroup: IProductGroup[] | undefined
  noData: boolean
}

export const ProductsContext = createContext<contextValue | undefined>(undefined)

interface ProductsProps {
  children: React.ReactNode
  products: IProductGetAll[]
  productGroup: IProductGroup[]
  noData: boolean
}
const ProductsCtxProvider: FC<ProductsProps> = ({ children, products: productsData, productGroup, noData }) => {
  const [products, setProducts] = useState<IProductGetAll[]>([])
  const [productsGroup, setProductsGroup] = useState<IProductGroup[]>([])
  const commonService = new CommonService()

  const contextValue: contextValue = { products, setProducts, commonService, productsGroup, noData }

  useEffect(() => {
    if (productsData) setProducts(productsData)
    if (productGroup) setProductsGroup(productGroup)
  }, [productsData, productGroup])

  return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => useContext(ProductsContext)!

export default ProductsCtxProvider
