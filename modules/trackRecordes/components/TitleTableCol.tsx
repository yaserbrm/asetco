import { Space } from 'antd'
import React, { FC, useState } from 'react'
import { IObject } from 'interfaces/IObject'
import { ITitleTableCol } from '../interfaces'
import { useTractRecordsStateCtx } from '../context'

const TitleTableCol: FC<ITitleTableCol> = ({ title, dataIndex, sortAble, setFilterArg }) => {
  const { filterArg } = useTractRecordsStateCtx()

  const [sortsType, setSortsType] = useState<IObject>({
    type: undefined,
  })
  const [sortKey, setSortKey] = useState<string>('')

  const changeSortTypes = (dataIndex: string, type: string | undefined) => {
    setFilterArg({
      ...filterArg,
      SortType: type === 'ASC' ? 0 : type === 'DES' ? 1 : 1,
      ...(type && { SortItem: dataIndex }),
    })
  }

  return sortAble ? (
    <div
      onClick={() => {
        let type
        if (sortKey === dataIndex) {
          setSortsType(perv => {
            return {
              ...perv,
              type: perv.type === undefined ? 'ASC' : perv.type === 'ASC' ? 'DES' : undefined,
            }
          })
          type = sortsType.type === undefined ? 'ASC' : sortsType.type === 'ASC' ? 'DES' : undefined
        } else {
          setSortsType(perv => {
            return { ...perv, type: 'ASC' }
          })
          type = 'ASC'
          setSortKey(dataIndex)
        }

        changeSortTypes(dataIndex, type)
      }}
      style={{
        cursor: 'pointer',
      }}
    >
      {title} <Space />
      <span className="material-icons users-list-sort-icon text-gray-400">
        {sortsType.type === 'ASC' && sortKey === dataIndex ? 'south' : sortsType.type === 'DES' && sortKey === dataIndex ? 'north' : 'sort'}
      </span>
    </div>
  ) : (
    <div>{title}</div>
  )
}

export default TitleTableCol
