import { cartItemsNameInLocalStorage, localStorageName } from 'constants/localItem'
import { ProductService } from 'core/wcs/product'
import moment from 'moment-jalaali'
import { useEffect, useState } from 'react'
import store from 'store'
import { insertOldCart } from 'store/actions/cart.action'
import { ICartItem } from 'store/reducers/cart.reducer'
import { useLocalStorage } from './useLocal'

export interface IOrdersInStorage {
  pro_id: number
  pro_Count: number
  updateDate: string
}

export const useCartStorageHandler = () => {
  const [cart, setCart] = useState<ICartItem[]>([])
  const _subscribe = store.subscribe(() => {
    const global = store.getState()
    if (global.cartReducer.cart && global.cartReducer.cart.length) setCart(global.cartReducer.cart)
  })
  useLocalStorage()
  const insertToLocalStorage = (cartItems: ICartItem[]) => {
    const accessToSave = sessionStorage.getItem('accessToSave')
    if (!accessToSave) return
    if (cartItems.length) {
      const productsId: IOrdersInStorage[] = cartItems.map(product => ({
        pro_id: product.product.p_ID,
        pro_Count: product.count,
        updateDate: moment().format('YYYY-MM-DD'),
      }))
      localStorage.removeItem(cartItemsNameInLocalStorage)
      localStorage.setItem(cartItemsNameInLocalStorage, JSON.stringify(productsId))
    }
  }

  const insertToStore = async () => {
    const OrderInLocalStorage = localStorage.getItem(cartItemsNameInLocalStorage)
    try {
      const newCartForLocalStorage: IOrdersInStorage[] = []
      const orders: IOrdersInStorage[] = JSON.parse(OrderInLocalStorage ? OrderInLocalStorage : '[]')
      const services = new ProductService()
      const ids = orders.map(order => {
        const orderDate = new Date(order.updateDate)
        const newDate = new Date(orderDate.setMonth(orderDate.getMonth() + 1))
        const currentDate = new Date()
        if (moment(newDate).isAfter(currentDate)) {
          newCartForLocalStorage.push(order)
          return order.pro_id
        } else {
          return -1
        }
      })
      if (!OrderInLocalStorage || !orders.length) {
        sessionStorage.setItem('accessToSave', 'ok')
        return
      }
      const formData = new FormData()

      for (let i = 0; i < ids.length; i++) {
        if (ids[i] > 0) {
          formData.append('ProductsID', ids[i].toString())
        }
      }

      services
        .BuyProducts(formData)
        .then(({ data, success }) => {
          if (data && success) {
            const newCartsItem: ICartItem[] = []
            data.forEach(product => {
              const productCount = orders.find(order => order.pro_id === product.p_ID)!.pro_Count
              newCartsItem.push({ count: productCount, product })
            })
            store.dispatch(insertOldCart(newCartsItem))
          }
        })
        .finally(() => sessionStorage.setItem('accessToSave', 'ok'))
      localStorage.removeItem(cartItemsNameInLocalStorage)
      localStorage.setItem(cartItemsNameInLocalStorage, JSON.stringify(newCartForLocalStorage))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!cart.length) {
      const global = store.getState()
      setCart(global.cartReducer.cart)
    }

    return _subscribe
  }, [_subscribe, cart.length])
  useEffect(() => {
    insertToLocalStorage(cart)
  }, [cart])
  useEffect(() => {
    insertToStore()
  }, [])
}
