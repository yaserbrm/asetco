import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'
import { WCSControllers } from 'core/urlTree/controllers'
import { BaseService } from 'core/wcs/base/service/Base'
import { IProduct, IProductGetAll, IProductDetail } from '../interfaceProduct/IProduct'
import { IProductS } from '../IProductService/Product'

export class ProductService extends BaseService<IProduct> implements IProductS<IProduct> {
  // should be require endpoint for call api
  controller = new WCSControllers()
  actions = new BaseUrlActions()
  endpoint = this.controller.product
  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getProductByID(id: FormData) {
    const response = await axios.post<IProductDetail>(this.endpoint.concat(this.actions.getProductByID), id, this.config).then(res => {
      if (res.status === 200) {
        return { success: true, data: res.data }
      } else return { success: false }
    })
    return response
  }

  async BuyProducts(ids: FormData) {
    const response = await axios
      .post<{ productDetails: IProductGetAll[] }>(this.endpoint.concat(this.actions.BuyProducts), ids, this.config)
      .then(res => {
        if (res.status === 200) {
          return { success: true, data: res.data.productDetails }
        } else return { success: false }
      })
    return response
  }
}
