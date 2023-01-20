import { ReducerType } from '../interfaces/reducer-payload.type'
import * as types from '../interfaces/action-types'
import { IProductGetAll } from 'core/wcs/product'
import { IOrdersInStorage } from 'hooks/cartStorageHandler'
import moment from 'moment-jalaali'
import { cartItemsNameInLocalStorage } from 'constants/localItem'

export interface ICartItem {
  count: number
  product: IProductGetAll
}

export interface initialStateType {
  cart: ICartItem[]
}

const initialState: initialStateType = {
  cart: [],
}

export const cartReducer = (state = initialState, { type, payload }: ReducerType) => {
  const updateCartCount = (id: number, count: number) => {
    const newCountData: ICartItem[] = []
    state.cart.forEach(cart => {
      if (cart.product.p_ID === id) {
        cart.count = count
        newCountData.push(cart)
      } else {
        newCountData.push(cart)
      }
    })
    return {
      ...state,
      cart: newCountData,
    }
  }

  switch (type) {
    case types.INSERT_PRODUCT:
      const order = payload as IProductGetAll
      const existOrder = state.cart.find(product => product.product.p_ID === order.p_ID)
      if (existOrder) {
        updateCartCount(order.p_ID, existOrder.count + 1)
      } else
        return {
          ...state,
          cart: [...state.cart, { count: 1, product: payload }],
        }

    case types.DELETE_PRODUCT:
      const newData = state.cart.filter(cart => cart.product.p_ID !== payload)
      const productsId: IOrdersInStorage[] = newData.map(product => ({
        pro_id: product.product.p_ID,
        pro_Count: product.count,
        updateDate: moment().format('YYYY-MM-DD'),
      }))
      localStorage.removeItem(cartItemsNameInLocalStorage)
      localStorage.setItem(cartItemsNameInLocalStorage, JSON.stringify(productsId))
      return {
        ...state,
        cart: newData,
      }
    case types.CHANGE_PRODUCT_COUNT:
      return updateCartCount(payload.pro_ID, payload.count)
    case types.INSERT_Old_PRODUCT:
      return {
        ...state,
        cart: payload,
      }
    case types.CLEAR_CART:
      if (payload) {
        return {
          ...state,
          cart: [],
        }
      } else
        return {
          ...state,
          cart: state.cart,
        }

    default:
      return state
  }
}
