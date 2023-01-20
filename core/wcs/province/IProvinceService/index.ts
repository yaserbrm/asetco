import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IProvince } from '../InterfaceProvinse/IProvince'

export interface IProvinceS<T> extends IBaseService<T> {
  getAllProvince: () => Promise<{ success: boolean; data?: IProvince[] }>
}
