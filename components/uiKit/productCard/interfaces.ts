import { IProductGetAll } from 'core/wcs/product'

export interface ICardProductProps {
  item: IProductGetAll
  type?: string
  // onRequestRegistration: (data: IModalRequestCarFormData) => void
}
