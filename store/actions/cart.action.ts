import { IProduct, IProductGetAll } from 'core/wcs/product'
import { ICartItem } from 'store/reducers/cart.reducer'
import * as types from '../interfaces/action-types'

export const insertCart = (payload: IProductGetAll) => {
  return {
    type: types.INSERT_PRODUCT,
    payload,
  }
}
export const insertOldCart = (payload: ICartItem[]) => {
  return {
    type: types.INSERT_Old_PRODUCT,
    payload,
  }
}
export const deleteProduct = (payload: number) => {
  return {
    type: types.DELETE_PRODUCT,
    payload,
  }
}
export const changeCount = (payload: { pro_ID: number; count: number }) => {
  return {
    type: types.CHANGE_PRODUCT_COUNT,
    payload,
  }
}
export const clearCart = (payload: boolean) => {
  return {
    type: types.CLEAR_CART,
    payload,
  }
}
