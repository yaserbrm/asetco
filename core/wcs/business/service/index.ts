import axios from 'axios'
import { IBusiness } from 'core/wcs/business/interfaceBusiness/IBusiness'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IBusinessS } from '../IBusinessService'

export class BusinessService extends BaseService<IBusiness> implements IBusinessS<IBusiness> {
  // should be require endpoint for call api
  controller = new WCSControllers()

  endpoint = this.controller.role
}
