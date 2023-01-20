import axios from 'axios'
import { IModelCar } from 'core/wcs/modelCar/interfaceModelCar/IModelCar'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IModelCarS } from '../IModelCarService'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'

export class ModelCarService extends BaseService<IModelCar> implements IModelCarS<IModelCar> {
  // should be require endpoint for call api
  controller = new WCSControllers()
 // actions = new BaseUrlActions()
  endpoint = this.controller.common

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getModelByBrandID(id: FormData) {
    const response = await axios.post<{ models: IModelCar[] }>(this.endpoint.concat(this.actions.getAllModel), id, this.config).then(res => {
      if (res.status === 200) {
        return { success: true, data: res.data.models }
      } else return { success: false }
    })
    return response
  }
}
