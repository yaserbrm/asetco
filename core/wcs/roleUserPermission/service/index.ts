import axios from 'axios'
import { IError } from 'core/wcs/base/interfaceBase'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'
import { BaseService } from 'core/wcs/base/service/Base'
import { IRoleUserPermission, IUserPermissionRoutePath, IUserRoleActions } from '../InterfaceRoleUserPermission/IRoleUserPermission'

import { IRoleUserPermissionS } from '../IRoleUserPermissionService'
export class RoleUserService extends BaseService<IRoleUserPermission> implements IRoleUserPermissionS<IRoleUserPermission> {
  // should be require endpoint for call api
  controller = new WCSControllers().roleUserPermission
  endpoint = this.controller
  actions = new BaseUrlActions()
  constructor(token: string) {
    super()
    this.token = token
  }
  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async insert(arg: IRoleUserPermission[]) {
    const response = await axios.post<{ message: string; status: string }>(this.endpoint.concat(this.actions.insert), arg).then(res => {
      if (res.status === 200 || res.data) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async deleteAllPermissionUser(id: FormData) {
    const response = await axios
      .post<{ code?: string | 'Succeed' }>(this.endpoint.concat(this.actions.deleteAllPermissionUser), id)
      .then(res => {
        if (res.data) {
          return {
            success: true,
            data: res.data,
          }
        } else return { success: false }
      })
    return response
  }
  async getAllPermissionUserActions(usrRolAndFormID: FormData) {
    const response = await axios
      .post<IUserRoleActions[] | IError>(this.endpoint.concat(this.actions.getAllPermissionUserActions), usrRolAndFormID)
      .then(res => {
        if ((res.status === 200 || res.data) && !(res.data as IError).message) {
          return {
            success: true,
            data: res.data as IUserRoleActions[],
          }
        } else return { success: false }
      })
    return response
  }

  async getAllPermissionUserRoutePath(userId: FormData) {
    const response = await axios
      .post<IUserPermissionRoutePath[] | IError>(this.endpoint.concat(this.actions.getAllPermissionUserRoutePath), userId)
      .then(res => {
        if ((res.status === 200 || res.data) && !(res.data as IError).message) {
          return {
            success: true,
            data: res.data as IUserPermissionRoutePath[],
          }
        } else return { success: false }
      })
    return response
  }
}
