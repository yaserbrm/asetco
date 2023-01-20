import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IConfirmActiveCode, ISendActiveCode, IWcsSecurityCode } from '../interfaceAuth/IAuth'

export interface IAuthenticationS<T> extends IBaseService<T> {
  sendActiveCode: (formData: FormData) => Promise<{
    success: boolean
    data?: ISendActiveCode
  }>
  isValidActiveCode: (formData: FormData) => Promise<{
    success: boolean
    data?: IConfirmActiveCode
  }>
  genrateSecurityCode: () => Promise<{
    success: boolean
    data?: IWcsSecurityCode
  }>
}
