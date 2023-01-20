export interface ICommon {}

export interface IUserInfo {
  total_Count: number
  usr_CtyID: number
  usr_CtyName: string
  usr_DateReg: string
  usr_FName: string
  usr_Gender: number
  usr_ID: number
  usr_IdentNum: string
  usr_Img: string
  usr_IsA: boolean
  usr_IsBlk: boolean
  usr_LName: string
  usr_Mail: string
  usr_Mobile: string
  usr_ProvID: number
  usr_ProvName: string
  usr_Roles: string
  usr_RolesID: number
  usr_Tell: string
  usr_TnatID: number
  usr_UName: string
  usr_Address: string
}

export interface IOwnerInfo {
  own_Desc: ''
  own_ID: 8
  own_ShbaNum: ''
  own_Tell: null
  own_UsrID: 52
}

export interface IUserMessage {
  message: string
  status: string
}

export interface IProductGroup {
  pG_ID: number
  pG_Name: string
  pG_Type: number
}
