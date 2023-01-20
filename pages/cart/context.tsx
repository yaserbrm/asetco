import { useUserInfo } from 'hooks/userInfo'
import { createContext, FC, useContext } from 'react'

interface contextValue {}

export const CartServiceContext = createContext<contextValue | undefined>(undefined)

interface CartContextProps {
  children: React.ReactNode
}
const CartPageContext: FC<CartContextProps> = ({ children }) => {
  const { token } = useUserInfo()

  const services: contextValue = {}

  return <CartServiceContext.Provider value={services}>{children}</CartServiceContext.Provider>
}

export const useCartContext = () => useContext(CartServiceContext)!
export default CartPageContext
