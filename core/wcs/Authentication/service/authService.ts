import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'
import { BaseService } from 'core/wcs/base/service/Base'
import { IAuthenticationS } from '../IAuthService/Auth'
import { IAuthentication, ISendActiveCode, IConfirmActiveCode, IWcsSecurityCode } from '../interfaceAuth/IAuth'

export class AuthService extends BaseService<IAuthentication> implements IAuthenticationS<IAuthentication> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.authentication

  async sendActiveCode(formData: FormData) {
    const response = await axios.post<ISendActiveCode>(this.endpoint.concat(this.actions.sendActiveCode), formData).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }

  async isValidActiveCode(formData: FormData) {
    const response = await axios.post<IConfirmActiveCode>(this.endpoint.concat(this.actions.isValidActiveCode), formData).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async genrateSecurityCode() {
    const response = await axios.get<IWcsSecurityCode>(this.endpoint.concat(this.actions.genrateSecurityCode)).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
}
