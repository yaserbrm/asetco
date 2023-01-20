import axios from 'axios'
import { IWornCars } from 'core/wcs/wornCars/interfaceWornCars/IWornCars'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IWornCarsS } from '../IWornCarsService'

export class WornCarsService extends BaseService<IWornCars> implements IWornCarsS<IWornCars> {
  // should be require endpoint for call api
  controller = new WCSControllers()

  endpoint = this.controller.role
}
