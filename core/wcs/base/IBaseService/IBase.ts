
interface IGetAllResult<T> {
  success: boolean
  data?: T[]
}
interface IGetOneResult<T> {
  success: boolean
  data?: T
}
export interface IBaseService<T> {
  token: string
  getAll: (langId: FormData) => Promise<IGetAllResult<T>>
  getById: (id: FormData) => Promise<IGetOneResult<T>>
  create: (arg: T) => Promise<IGetOneResult<T>>
  update: (arg: T) => Promise<IGetOneResult<T>>
  delete: (id: FormData) => Promise<boolean>
  exist: () => Promise<boolean>
}
