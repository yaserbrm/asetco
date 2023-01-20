import { IImportedCar } from 'core/wcs/order'
import { IWornCarGetAll } from 'core/wcs/wornMaster'

export interface IDetailTrackRecords {
  wornCar?: IWornCarGetAll
  importedCarAutPart?: IImportedCar
}
