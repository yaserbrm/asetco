import { UploadFile } from 'antd/lib/upload/interface'
import { IOwners } from 'core/wcs/owners'
import { IObject } from 'interfaces/IObject'

export interface IUpload {
  doc: UploadFile<any>[]
  card: UploadFile<any>[]
  image: UploadFile<any>[]
  others: UploadFile<any>[]
}

export interface IUploadDescription {
  document_description: string
  card_description: string
  image_description: string
  others_description: string
}

export interface IStepsValue {
  owner: Partial<IOwners>
  car: IObject
  attachments: IUpload
  attachmentsDescription: IUploadDescription
  finall: IObject
}
