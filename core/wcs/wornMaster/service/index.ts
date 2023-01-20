import axios from 'axios'
import {
  IUserInfo,
  IWornCarAgents,
  IWornCarGetAll,
  IWornMaster,
  IWornMasterFiles,
} from 'core/wcs/wornMaster/interfaceWornMaster/IWornMaster'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IWornMasterS } from '../IWornMasterService'
import { IWornCars } from 'core/wcs/wornCars'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'

export class WornMasterService extends BaseService<IWornMaster> implements IWornMasterS<IWornMaster> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  endpoint = this.controller.wornMaster
  actions = new BaseUrlActions()

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async priceInquiry(formData: FormData) {
    const response = await axios
      .post<{ message: string; status: string }>(this.endpoint.concat(this.actions.inquiryPrice), formData, this.config)
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

  async getAllWornCarByUserId() {
    const response = await axios
      .get<{ message?: string; wornCars?: Pick<IWornCars, 'wCars_Id' | 'wCars_Name'>[]; status: number | string }>(
        this.endpoint.concat(this.actions.getAllWornCarByUserId),
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

  async getWornCarById(WCarID: FormData) {
    const response = await axios
      .post<{ message?: string; wornCar?: IWornCars; brandID: number; status: number | string }>(
        this.endpoint.concat(this.actions.getWornCarById),
        WCarID,
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

  async getAllUserAgents() {
    const response = await axios
      .get<{ message?: string; userAgents?: IWornCarAgents[]; status: number | string }>(
        this.endpoint.concat(this.actions.getAllUserAgents),
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

  async insertWornMaster(arg: FormData) {
    const response = await axios
      .post<{ message?: string; status: number | string; trackingCode: string }>(
        this.endpoint.concat(this.actions.insertWornMaster),
        arg,
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

  async getAllWornCars(formData: FormData) {
    const response = await axios
      .post<{ count: number; status: number | string; wMatsers: IWornCarGetAll[] }>(
        this.endpoint.concat(this.actions.getAll),
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

  async getAllWornMasterFiles(wornId: FormData) {
    const response = await axios.post<IWornMasterFiles>(this.endpoint.concat(this.actions.getAllFiles), wornId, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res?.data,
        }
      } else return { success: false }
    })

    return response
  }

  async uploadWornCarImage(formData: FormData) {
    const response = await axios
      .post<{ message?: string; status: number | string }>(this.endpoint.concat(this.actions.uploadImage), formData, this.config)
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

  async getDetailByWMasterID(formData: FormData) {
    const response = await axios
      .post<{ wMatser: IWornCarGetAll; status: number | string }>(this.endpoint.concat(this.actions.getByWMasterID), formData, this.config)
      .then(res => {
        if (res.status === 200) {
          return {
            success: true,
            data: res?.data.wMatser,
          }
        } else return { success: false }
      })

    return response
  }
}
