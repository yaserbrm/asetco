import { IBaseService } from 'core/wcs/base/IBaseService/IBase'
import { IProductGetAll } from 'core/wcs/product'
import { IOwnerInfo, IProductGroup, IUserInfo, IUserMessage } from '../interfaceCommon/ICommon'

export interface ICommonS<T> extends IBaseService<T> {
  getInfoUser: () => Promise<{
    success: boolean
    data?: { message?: string; user?: IUserInfo; owner?: IOwnerInfo; status: number | string }
  }>
  deleteOwnerImage: () => Promise<{ success: boolean; data?: IUserMessage }>
  uploadOwnerImage: (arg: FormData) => Promise<{ success: boolean; data?: { message: string; status: string; path: string } }>
  updateUserProfile: (arg: FormData) => Promise<{ success: boolean; data?: IUserMessage }>
  deleteFile: (annexID: FormData) => Promise<{ success: boolean; data?: { message: string; status: number } }>
  getAllProducts: (type: FormData) => Promise<{ success: boolean; data?: IProductGetAll[] }>
  getAllProductGroup: (type: FormData) => Promise<{ success: boolean; data?: IProductGroup[] }>
}
