import { ControllersUrlEnums } from './controllersEnums'
export class WCSControllers {
  Host: string = process.env.NEXT_PUBLIC_WCS_HOST || ''
  city = this.Host.concat(ControllersUrlEnums.city)
  common = this.Host.concat(ControllersUrlEnums.common)
  wornMaster = this.Host.concat(ControllersUrlEnums.wornMaster)
  authentication = this.Host.concat(ControllersUrlEnums.authentication)
  product = this.Host.concat(ControllersUrlEnums.product)
  order = this.Host.concat(ControllersUrlEnums.order)
  productGroup = this.Host.concat(ControllersUrlEnums.productGroup)
  // we don`t need these controllers
  role = this.Host.concat(ControllersUrlEnums.role)
  userRole = this.Host.concat(ControllersUrlEnums.userRole)
  roleUserPermission = this.Host.concat(ControllersUrlEnums.roleUserPermission)
  // we don`t need these controllers
  message = this.Host.concat(ControllersUrlEnums.message)
  payment = this.Host.concat(ControllersUrlEnums.payment)
  orderTransaction = this.Host.concat(ControllersUrlEnums.orderTransaction)
}
