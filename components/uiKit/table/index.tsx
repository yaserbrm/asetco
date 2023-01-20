import { FC, useEffect, useState } from 'react'
import Table from 'rc-table'
import { ISortObject, ITableData, ITableProps } from './interfaces'
import { TableContainer } from './styles'
import { ColumnType } from 'rc-table/lib/interface'
import { Space } from 'antd'
import { IObject } from 'interfaces/IObject'
export const TableUiKit: FC<ITableProps> = ({
  data,
  columns,
  sortsArray,
  hasKey,
  scroll,
  headerBorder = false,
  fixed,
  style,
  maxHeight,
  tableShadow = true,
  className,
  direction = 'rtl',
  minHeight = 400,
  expandable,
  onRow,
}) => {
  const [columnsTable, setColumnsTable] = useState<ColumnType<ITableData>[]>([])
  const [dataTable, setDataTable] = useState<ITableData[]>([])
  const [sortType, setSortType] = useState<'ASC' | 'DES' | undefined>(undefined)
  useEffect(() => {
    const newColumns: ColumnType<ITableData>[] = []
    let sortsObj: ISortObject = {}
    sortsArray?.forEach(sortObj => {
      sortObj = sortObj.toLowerCase()
      sortsObj[sortObj] = sortObj
    })
    const fixedItems: IObject = {}
    fixed?.forEach(item => {
      fixedItems[item.column.toLowerCase()] = item.position
    })
    columns.forEach(col => {
      let colObj: ColumnType<ITableData> = {
        dataIndex: '',
        key: '',
        title: '',
      }
      if (typeof col === 'string') {
        colObj = {
          dataIndex: col.toLowerCase(),
          key: col.toLowerCase(),
          title: col,
        }
        if (fixedItems && fixedItems[col.toLowerCase()]) {
          colObj.fixed = fixedItems[col.toLowerCase()]
        }
      } else {
        colObj = col
      }
      if (typeof col === 'string' && sortsObj[col.toLowerCase()]) {
        colObj.title = (
          <div>
            {col.toLowerCase()} <Space />{' '}
            <span
              style={{ transition: '1s' }}
              className="material-icons"
              onClick={() => {
                setSortType(perv => (!perv ? 'ASC' : perv === 'ASC' ? 'DES' : undefined))
              }}
            >
              {sortType === 'ASC' ? '' : sortType === 'DES' ? 'straight' : 'sort'}
            </span>
          </div>
        )
      }
      newColumns.push(colObj)
    })

    setColumnsTable(newColumns)
    if (hasKey) {
      const colObj: ColumnType<ITableData> = {
        dataIndex: 'key',
        key: 'key',
        title: '#',
        width: 44,
        fixed: 'left',
      }
      const data: ITableData[] = []
      dataTable.forEach((item, index) => {
        data.push({ key: index + 1, ...item })
      })
      setColumnsTable(perv => [colObj, ...perv])
      setDataTable(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, sortsArray, hasKey, fixed, sortType])

  useEffect(() => {
    const newData: ITableData[] = []
    data.forEach((item, index) => {
      newData.push({ ...item, key: (index + 1).toString() })
    })
    setDataTable(newData)
  }, [data])

  return (
    <TableContainer
      headerBorder={headerBorder}
      maxHeight={maxHeight}
      dir={direction}
      tableShadow={tableShadow}
      className={className ? className : ''}
      minHeight={minHeight}
    >
      <Table<ITableData>
        columns={columnsTable}
        data={dataTable}
        // bordered={bordered}
        // pagination={pagination}
        expandable={expandable}
        scroll={scroll}
        direction={'rtl'}
        style={style}
        className="customTable"
        // useFixedHeader={true}
        onRow={onRow}
      />
    </TableContainer>
  )
}
