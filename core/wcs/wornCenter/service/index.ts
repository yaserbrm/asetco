import axios from 'axios'
import { IWornCenter } from 'core/wcs/wornCenter/interfaceWornCenter/IWornCenter'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IWornCenterS } from '../IWornCenterService'

export class WornCenterService extends BaseService<IWornCenter> implements IWornCenterS<IWornCenter> {
  // should be require endpoint for call api
  controller = new WCSControllers()

  endpoint = this.controller.role
}
