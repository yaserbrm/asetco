import axios from 'axios'
import { ICivilContract } from 'core/wcs/civilContract/interfaceCivilContract/ICivilContract'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { ICivilContractS } from '../ICivilContractService'

export class CivilContractService extends BaseService<ICivilContract> implements ICivilContractS<ICivilContract> {
  // should be require endpoint for call api
  controller = new WCSControllers()

  endpoint = this.controller.role
}
