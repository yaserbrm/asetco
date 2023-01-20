import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IImportedCar, IOrderArg } from '../interfaceOrder/IOrder'

export interface IOrderS<T> {
  token: string
}
export interface IOrderS<T> extends IBaseService<T> {
  orderInsert: (arg: IOrderArg) => Promise<{
    success: boolean
    data?: { message: string; status: number | string }
  }>
  getAllImportedCars: (formData: FormData) => Promise<{
    success: boolean
    data?: { count: number; status: number | string; orders: IImportedCar[] }
  }>
  getDetailByOrderID: (formData: FormData) => Promise<{
    success: boolean
    data?: IImportedCar
  }>
}
