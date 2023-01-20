import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IBrandCar } from '../interfaceBrandCar/IBrandCar'

export interface IBrandCarS<T> {
  getAllBrand: () => Promise<{ success: boolean; data?: IBrandCar[] }>
}
