import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'
import { BaseService } from 'core/wcs/base/service/Base'

import { IUserRole } from '../InterfaceUserRole/interface/IUserRole'
import { IUserRoleS } from '../IUserRoleService'

export class UserRoleService extends BaseService<IUserRole> implements IUserRoleS<IUserRole> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.userRole
  constructor(token: string) {
    super()
    this.token = token
  }

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async insertUserRole(userRole: IUserRole[]) {
    const response = await axios
      .post<{ message: string; status: string }>(this.endpoint.concat(this.actions.insert), userRole, this.config)
      .then(res => {
        if (res.data.message === 'Succeed') {
          return { success: true, data: res.data }
        } else return { success: false }
      })
    return response
  }
  async deleteAllUserRole(userId: FormData) {
    const response = await axios
      .post<{ message: string; status: string }>(this.endpoint.concat(this.actions.deleteAllUserRole), userId, this.config)
      .then(res => {
        if (res.data.message === 'Succeed') {
          return { success: true, data: res.data }
        } else return { success: false }
      })
    return response
  }
}
