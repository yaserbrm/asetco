import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IRole } from '../InterfaceRole/IRole'

export interface IRoleS<T> extends IBaseService<T> {
  config: { headers: { Authorization: string } }
  getAllSP: (langId: FormData) => Promise<{ success: boolean; data?: IRole[] }>
}
