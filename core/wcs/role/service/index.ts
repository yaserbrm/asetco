import axios from 'axios'
import { IRole } from 'core/wcs/role/InterfaceRole/IRole'
import { WCSControllers } from 'core/urlTree/controllers'

import { IRoleS } from '../IRoleService'
import { BaseService } from 'core/wcs/base/service/Base'

export class RoleService extends BaseService<IRole> implements IRoleS<IRole> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  endpoint = this.controller.role
  constructor(token: string) {
    super()
    this.token = token
  }
  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getAllSP(langId: FormData) {
    const response = await axios.post<IRole[]>(this.endpoint.concat(this.actions.getAllSP), langId, this.config).then(res => {
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
