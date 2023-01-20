import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { ICityS } from '../ICityService/City'
import { ICity } from '../interfaceCity/ICty'

export class CityService extends BaseService<ICity> implements ICityS<ICity> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.common

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }
  
  async getByProvinceID(id: FormData) {
    const response = await axios.post<{ city: ICity[] }>(this.endpoint.concat(this.actions.getAllCity), id, this.config).then(res => {
      if (res.status === 200) {
        return { success: true, data: res.data.city }
      } else return { success: false }
    })
    return response
  }
}
