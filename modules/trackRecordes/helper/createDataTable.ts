import { ITableData } from 'components/uiKit/table/interfaces'
import { IImportedCar } from 'core/wcs/order'
import { IWornCarGetAll } from 'core/wcs/wornMaster'

export const createDataTable = (data: IWornCarGetAll[] | IImportedCar[]): ITableData[] => {
  const newData: ITableData[] = []
  data.forEach((item, index) => {
    newData.push({ ...item, key: (index + 1).toString() })
  })
  return newData
}
