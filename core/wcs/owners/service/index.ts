import axios from 'axios'
import { IOwners } from 'core/wcs/owners/interfaceOwners/IOwners'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IOwnersS } from '../IOwnersService'

export class OwnersService extends BaseService<IOwners> implements IOwnersS<IOwners> {
  // should be require endpoint for call api
  controller = new WCSControllers()

  endpoint = this.controller.common

 
}