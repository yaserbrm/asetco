import { IWornCarAgents, IWornCarGetAll, IWornMasterFiles } from '../interfaceWornMaster/IWornMaster'

import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IWornCars } from 'core/wcs/wornCars'

export interface IWornMasterS<T> {
  token: string
}
export interface IWornMasterS<T> extends IBaseService<T> {
  priceInquiry: (formData: FormData) => Promise<{
    success: boolean
    data?: { message: string; status: number | string }
  }>
  getAllWornCarByUserId: () => Promise<{
    success: boolean
    data?: { message?: string; wornCars?: Pick<IWornCars, 'wCars_Id' | 'wCars_Name'>[]; status: number | string }
  }>
  getWornCarById: (WCarID: FormData) => Promise<{
    success: boolean
    data?: { message?: string; wornCar?: IWornCars; brandID: number; status: number | string }
  }>
  getAllUserAgents: () => Promise<{
    success: boolean
    data?: { message?: string; userAgents?: IWornCarAgents[]; status: number | string }
  }>
  insertWornMaster: (arg: FormData) => Promise<{
    success: boolean
    data?: { message?: string; status: number | string; trackingCode: string }
  }>
  getAllWornCars: (formData: FormData) => Promise<{
    success: boolean
    data?: { count: number; status: number | string; wMatsers: IWornCarGetAll[] }
  }>
  getAllWornMasterFiles: (wornId: FormData) => Promise<{
    success: boolean
    data?: IWornMasterFiles
  }>
  uploadWornCarImage: (formData: FormData) => Promise<{
    success: boolean
    data?: { message?: string; status: number | string }
  }>
  getDetailByWMasterID: (formData: FormData) => Promise<{
    success: boolean
    data?: IWornCarGetAll
  }>
}
