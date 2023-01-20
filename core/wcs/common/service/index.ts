import axios from 'axios'

import { WCSControllers } from 'core/urlTree/controllers'
import { IProductGetAll } from 'core/wcs/product'
import { BaseService } from '../../base/service/Base'
import { ICommonS } from '../ICommonService'
import { ICommon, IOwnerInfo, IProductGroup, IUserInfo } from '../interfaceCommon/ICommon'

export class CommonService extends BaseService<ICommon> implements ICommonS<ICommon> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  endpoint = this.controller.common

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getInfoUser() {
    const response = await axios
      .get<{ message?: string; user?: IUserInfo; owner?: IOwnerInfo; status: number | string }>(
        this.endpoint.concat(this.actions.getInfoUser),
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

  async deleteOwnerImage() {
    const response = await axios.get(this.endpoint.concat(this.actions.deleteImage), this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }

  async uploadOwnerImage(arg: FormData) {
    const response = await axios
      .post<{ message: string; status: string; path: string }>(this.endpoint.concat(this.actions.uploadImage), arg, this.config)
      .then(res => {
        if (res.status === 200) {
          return {
            success: true,
            data: res.data,
          }
        } else return { success: false }
      })
    return response
  }

  async updateUserProfile(arg: FormData) {
    const response = await axios.post(this.endpoint.concat(this.actions.updateUserProfile), arg, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }

  async deleteFile(annexID: FormData) {
    const response = await axios
      .post<{ message: string; status: number }>(this.endpoint.concat(this.actions.deleteFile), annexID, this.config)
      .then(res => {
        if (res.status === 200) {
          return {
            success: true,
            data: res.data,
          }
        } else return { success: false }
      })
    return response
  }

  async getAllProducts(type: FormData) {
    const response = await axios.post<{ products: IProductGetAll[] }>(this.endpoint.concat(this.actions.getAllProduct), type).then(res => {
      if (res.status === 200) {
        return { success: true, data: res?.data.products }
      } else return { success: false }
    })
    return response
  }

  async getAllProductGroup(type: FormData) {
    const response = await axios
      .post<{ productGroups: IProductGroup[] }>(this.endpoint.concat(this.actions.getAllProductGroup), type)
      .then(res => {
        if (res.status === 200) {
          return { success: true, data: res.data.productGroups }
        } else return { success: false }
      })
    return response
  }
}
