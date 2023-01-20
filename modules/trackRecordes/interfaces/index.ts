import { ReactNode } from 'react'
import { CurrentTable } from '../constant/page'

export type PagesType =
  | CurrentTable.WORN_CARS
  | CurrentTable.IMPORTED_CARS
  | CurrentTable.AUTO_PARTS
  | CurrentTable.BUY_WORN_CARS
  | CurrentTable.TRANSACTIONS

export interface IGetAllUserArg {
  PageIndex: number
  PageSize: number
  SortType: number
}

export interface ITitleTableCol {
  title: ReactNode
  dataIndex: string
  sortAble: boolean
  setFilterArg: (arg: IGetAllUserArg) => void
}

export interface IUserInfoTractRecords {
  fName: string
  lName: string
  mobile: string | number
}
