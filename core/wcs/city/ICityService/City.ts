import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { ICity } from '../interfaceCity/ICty'

export interface ICityS<T> extends IBaseService<T> {
  getByProvinceID: (id: FormData) => Promise<{ success: boolean; data?: ICity[] }>
}
