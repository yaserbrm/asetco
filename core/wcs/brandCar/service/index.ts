import axios from 'axios'
import { IBrandCar } from 'core/wcs/brandCar/interfaceBrandCar/IBrandCar'
import { IBrandCarS } from '../IBrandCarService'
import { WCSControllers } from 'core/urlTree/controllers'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { BaseService } from 'core/wcs/base/service/Base'

export class BrandCarService extends BaseService<IBrandCar> implements IBrandCarS<IBrandCar> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  endpoint = this.controller.common
  //actions = new BaseUrlActions()

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }


  async getAllBrand() {
    const response = await axios.get<{ brands: IBrandCar[] }>(this.endpoint.concat(this.actions.getAllBrand), this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data.brands,
        }
      } else return { success: false }
    })
    return response
  }
}
