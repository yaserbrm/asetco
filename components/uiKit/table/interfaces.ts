import { TablePaginationConfig } from 'antd'
import { ColumnType } from 'rc-table/lib/interface'
import React, { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'

import { ExpandableConfig, GetComponentProps } from 'rc-table/lib/interface'

// export interface ITableColumn extends Partial<ColumnsType<ITableData>> {
//   title: string
//   dataIndex: string | number
//   key: string
// }
export interface ITableData {
  [key: string]: ReactNode
}
export interface IFixedItems {
  column: string
  position: 'left' | 'right' | boolean
  value?: number
}

export interface ITableProps {
  data: ITableData[]
  columns: (string | ColumnType<ITableData>)[]
  sortsArray?: string[]
  hasKey?: boolean
  bordered?: boolean
  pagination?: false | TablePaginationConfig | undefined
  scroll?: {
    x?: string | number | true | undefined
    y?: string | number | undefined
  } & {
    scrollToFirstRowOnChange?: boolean | undefined
  }
  headerBorder?: boolean
  fixed?: IFixedItems[]
  headerFix?: boolean
  style?: CSSProperties
  maxHeight?: number
  minHeight?: number
  tableShadow?: boolean
  className?: string
  direction?: 'rtl' | 'ltr'
  expandable?: ExpandableConfig<ITableData> | undefined
  onRow?: GetComponentProps<ITableData> | undefined
}
export interface ISortObject {
  [key: string]: string
}

export interface IColumnItem {
  dataIndex: React.ReactNode
  key: React.Key
  title: string
  sorter?: (a: any, b: any) => number
  size?: 'default' | 'middle' | 'small'
  width?: number
  fixed?: 'left' | 'right' | boolean | undefined
  render?: () => JSX.Element
}

export interface IEmailTableProps {
  email?: string
}
export interface IActionsButtonProps {
  action?: string
  iconName?: string
  onClick?: () => void
}
export interface IUserStatusProps {
  isActive: boolean
  isBlock: boolean

  onChangeBlock: () => void
  onChangeStatus: (status: boolean) => void
}
