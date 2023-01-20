import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IUserRole } from '../InterfaceUserRole/interface/IUserRole'

export interface IUserRoleS<T> extends IBaseService<T> {
  config: { headers: { Authorization: string } }
  insertUserRole: (userRole: IUserRole[]) => Promise<{ success: boolean; data?: { message: string; status: string } }>
  deleteAllUserRole: (id: FormData) => Promise<{ success: boolean; data?: { message: string; status: string } }>
}
