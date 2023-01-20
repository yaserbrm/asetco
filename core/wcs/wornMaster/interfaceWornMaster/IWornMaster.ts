export interface IWornMaster {
  wMstr_ID: number
  wMstr_OwnID: number
  wMstr_WCarID: number
  wMstr_AgtID: number
  wMstr_CvilConID: number
  wMstr_BusiID: number
  wMstr_RegDate: string
}

export interface IUserInfo {
  user_TnatID: number
  usr_Address: string
  usr_Cty_ID: number
  usr_DateReg: string
  usr_FName: string
  usr_Gender: string
  usr_HPass: string
  usr_ID: number
  usr_IdentNum: string
  usr_Img: string | null
  usr_IsA: boolean
  usr_IsBlk: boolean
  usr_LName: string
  usr_Mobile: string
  usr_Prov_ID: number
  usr_Tell: string | null
  usr_UName: string
  usr_mail: string
}
export interface IWornCarAgents {
  user_ID: number
  user_FullName: string
}

export interface IWornCarGetAll {
  wm_User: string
  wm_FName: string
  wm_LName: string
  wm_IdentNum: string
  wm_Mobile: string
  wm_DateReg: string
  wm_UName: string
  wm_UserProvID: string
  wm_UserCtyID: string
  wm_ProvName: string
  wm_CtyName: string
  wm_Address: string
  b_MinPrice: string
  b_MaxPrice: string
  b_AgentName: string
  c_BuyAmount: string
  c_PreAmount: string
  f_Payed: string
  f_Remaining: string
  f_OtherPayed: string
  c_InquiryState: string
  c_InquiryStateStr: string
  c_ContractState: string
  c_ContractStateStr: string
  c_WornCarState: string
  c_WornCarStateStr: string
  c_Parking: string
  wornCarName: string
  c_SplitCenter: string
  total_Count: string
  wM_Desc: string
  wm_ID: number
  wornCarID: number
}
export interface IFileWorn {
  annex_Id?: number
  pathFile?: string
}

export interface IWornMasterFiles {
  status: number | string
  filesDocuments: IFileWorn[]
  filesCards: IFileWorn[]
  filesImages: IFileWorn[]
  filesOthers: IFileWorn[]
}
