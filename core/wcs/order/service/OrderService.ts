import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from 'core/wcs/base/service/Base'
import { IImportedCar, IOrderArg } from '../interfaceOrder/IOrder'
import { IOrderS } from '../IOrderService/Order'

export class OrderService extends BaseService<IImportedCar> implements IOrderS<IImportedCar> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  //actions = new BaseUrlActions()
  endpoint = this.controller.order

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getAllImportedCars(formData: FormData) {
    const response = await axios
      .post<{ count: number; status: number | string; orders: IImportedCar[] }>(
        this.endpoint.concat(this.actions.getAllByUser),
        formData,
        this.config,
      )
      .then(res => {
        if (res.status === 200) {
          return {
            success: true,
            data: res?.data,
          }
        } else return { success: false }
      })

    return response
  }

  async orderInsert(arg: IOrderArg) {
    const response = await axios
      .post<{ message: string; status: string }>(this.endpoint.concat(this.actions.insert), arg, this.config)
      .then(res => {
        if (res.status === 200) {
          return { success: true, data: res?.data }
        } else return { success: false }
      })
    return response
  }

  async getDetailByOrderID(formData: FormData) {
    const response = await axios
      .post<{ status: number | string; order: IImportedCar }>(this.endpoint.concat(this.actions.getByOrderID), formData, this.config)
      .then(res => {
        if (res.status === 200) {
          return {
            success: true,
            data: res?.data.order,
          }
        } else return { success: false }
      })

    return response
  }
}
