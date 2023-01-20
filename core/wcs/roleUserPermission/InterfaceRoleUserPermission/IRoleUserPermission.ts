export interface IRoleUserPermission {
  rlUsrPer_ID?: number
  rlUsrPer_RolID_UsrID: number
  rlUsrPer_RoutStrID: number
  rlUsrPer_Tag_ID?: number
  rlUsrPer_TypeRout?: number
  rlUsrPer_BitMrge?: boolean
  rlUsrPer_ParentID?: number
}
export interface IUserRoleActions {
  action_State: boolean
  routstructure_ID: number
  tag_Name: string
}
export interface IUserPermissionRoutePath {
  route_Path: string
  routeStructure_ParentID: number
  routeStructure_ID: number
}
