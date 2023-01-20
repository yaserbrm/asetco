import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'
import { IOrderTransactionResult, IOrderTransactionService } from './IOrderTransaction'

export class TransactionsService implements IOrderTransactionService {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.orderTransaction
  token = '123'
  config = {}
  constructor(tk: string) {
    this.token = tk
    this.config = {
      headers: {
        Authorization: 'Bearer ' + tk,
      },
    }
  }

  async getAllByUser() {
    const response = await axios.get<IOrderTransactionResult>(this.endpoint.concat(this.actions.getAllByUser), this.config).then(res => {
      if (res.status === 200 && res.data.status === 200) {
        return {
          success: true,
          data: res?.data.orderTransaction,
        }
      } else return { success: false }
    })

    return response
  }
}
