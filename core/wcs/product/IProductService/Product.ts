import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IProduct, IProductGetAll, IProductDetail } from '../interfaceProduct/IProduct'

export interface IProductS<T> extends IBaseService<T> {
  getProductByID: (id: FormData) => Promise<{ success: boolean; data?: IProductDetail }>
  BuyProducts: (ids: FormData) => Promise<{ success: boolean; data?: IProductGetAll[] }>
}
