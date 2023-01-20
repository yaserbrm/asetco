import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IModelCar } from '../interfaceModelCar/IModelCar'

export interface IModelCarS<T> {
  getModelByBrandID: (id: FormData) => Promise<{ success: boolean; data?: IModelCar[] }>
}
