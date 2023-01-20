import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'
import { IOrderArg } from 'core/wcs/order'

import { IPaymentServiceS, IPaymentResult } from '../IPaymentService/IPaymentService'

export class PaymentService implements IPaymentServiceS {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.payment
  token = '123'
  config = {}
  constructor(tk: string) {
    this.token = tk
    this.config = {
      headers: {
        Authorization: 'Bearer ' + tk,
      },
    }
  }

  async payment(arg: IOrderArg) {
    const response = await axios.post<IPaymentResult>(this.endpoint.concat(this.actions.payment), arg, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res?.data,
        }
      } else return { success: false }
    })

    return response
  }
}
