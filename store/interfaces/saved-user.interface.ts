import { IUserInfo, IOwnerInfo } from 'core/wcs/common'

export interface SavedUser {
  accessToken: string
  userInfo?: Partial<IUserInfo> | undefined
  ownerInfo?: Partial<IOwnerInfo> | undefined
}
