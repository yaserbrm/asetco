import axios from 'axios'
import { IFinance } from 'core/wcs/finance/interfaceFinance/IFinance'
import { WCSControllers } from 'core/urlTree/controllers'

import { BaseService } from '../../base/service/Base'
import { IFinanceS } from '../IFinanceService'

export class FinanceService extends BaseService<IFinance> implements IFinanceS<IFinance> {
  // should be require endpoint for call api
  controller = new WCSControllers()

  endpoint = this.controller.role
}
