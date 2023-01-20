import { IOrderArg } from 'core/wcs/order'
export interface IPaymentResult {
  message: string
  status: number
  url: string
}
export interface IPaymentServiceS {
  token: string
  payment: (arg: IOrderArg) => Promise<{
    success: boolean
    data?: IPaymentResult
  }>
}
