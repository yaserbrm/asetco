import { createContext, FC, useContext } from 'react'
import { IProductDetail } from 'core/wcs/product'

interface contextValue {
  productDetail: IProductDetail | undefined
}

export const DetailsContext = createContext<contextValue | undefined>(undefined)

interface DetailsProps extends contextValue {
  children: React.ReactNode
}
const DetailCtxProvider: FC<DetailsProps> = ({ children, productDetail }) => {
  return <DetailsContext.Provider value={{ productDetail }}>{children}</DetailsContext.Provider>
}

export const useDetailsContext = () => useContext(DetailsContext)!

export default DetailCtxProvider
