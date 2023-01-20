export interface IOrder {
  pid: number
  pCount: number
}

export interface IOrderArg {
  ordersProducts: IOrder[]
  fName: string
  lName: string
  tell: string
  city: number
  province: number
  address: string
}
export interface IImportedCar {
  ord_ID: string
  ord_Date: string
  ord_Group: string
  ord_Type: string
  ord_TypeStr: string
  ord_IsUsed: boolean
  ord_IsUsedStr: string
  ord_Name: string
  ord_Model: string
  ord_Series: string
  ord_CustomerFname: string
  ord_CustomerLname: string
  ord_CustomerMobile: string
  ord_Description: string
  ord_ResultComment: string
  ord_Price: string
  ord_Count: string
  ord_TotalPrice: number
  ord_FullName: string
  total_Count: string
  ord_PID: number
}
