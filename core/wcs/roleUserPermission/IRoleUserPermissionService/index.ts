import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IRoleUserPermission, IUserPermissionRoutePath } from '../InterfaceRoleUserPermission/IRoleUserPermission'
import { IUserRoleActions } from '../InterfaceRoleUserPermission/IRoleUserPermission'

export interface IRoleUserPermissionS<T> extends IBaseService<T> {
  config: { headers: { Authorization: string } }
  insert: (arg: IRoleUserPermission[]) => Promise<{
    success: boolean
    data?: { message: string; status: string }
  }>

  deleteAllPermissionUser: (id: FormData) => Promise<{
    success: boolean
    data?: { code?: string | 'Succeed' }
  }>
  getAllPermissionUserActions: (usrRolAndFormID: FormData) => Promise<{
    success: boolean
    data?: IUserRoleActions[]
  }>
  getAllPermissionUserRoutePath: (userId: FormData) => Promise<{
    success: boolean
    data?: IUserPermissionRoutePath[]
  }>
}
