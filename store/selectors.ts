import { SavedUser } from './interfaces/saved-user.interface'
import { ICartItem } from './reducers/cart.reducer'
import { ILoadingStore } from './reducers/global.reducer'
import { RootState } from './root-reducer'

export const usersSelector = (state: RootState): SavedUser => state.globals.user
export const carImagePosition = (state: RootState): number => state.globals.carImagePosition
export const activeBackButton = (state: RootState): boolean => state.globals.backButton

export const cartSelector = (state: RootState): ICartItem[] => state.cartReducer.cart
export const getCartCount = (state: RootState): number => {
  let count = 0
  ;(state.cartReducer.cart as ICartItem[]).forEach(item => {
    count = item.count + count
  })

  return count
}
export const loadingSelector = (state: RootState): ILoadingStore => state.globals.loading
