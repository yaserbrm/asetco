import axios from 'axios'
import { IProvince } from 'core/wcs/province/InterfaceProvinse/IProvince'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IProvinceS } from '../IProvinceService'

export class ProvinceService extends BaseService<IProvince> implements IProvinceS<IProvince> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  endpoint = this.controller.common

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getAllProvince() {
    const response = await axios.get<{ provinces: IProvince[] }>(this.endpoint.concat(this.actions.getAllProvince), this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data.provinces,
        }
      } else return { success: false }
    })
    return response
  }
}
