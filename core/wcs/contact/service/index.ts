import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'

import { IContactS } from '../IContactService'

export class ContactService implements IContactS {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.message
  // async getAll() {
  //   const response = await axios.post<>(this.endpoint.concat(this.actions.getAll), langId, this.config).then(res => {
  //     if (res.status === 200) {
  //       return {
  //         success: true,
  //         data: res.data,
  //       }
  //     } else return { success: false }
  //   })
  //   return response
  // }
  async send(arg: FormData) {
    const response = await axios.post<{ message: string; status: string }>(this.endpoint.concat(this.actions.send), arg).then(res => {
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
