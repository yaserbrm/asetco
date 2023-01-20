import { IBaseService } from '../IBaseService/IBase'
import axios from 'axios'
import { BaseUrlActions } from 'core/urlTree/actions/baseActions'

export abstract class BaseService<T> implements IBaseService<T> {
  public endpoint = ''
  actions = new BaseUrlActions()
  token = ''
  constructor(token?: string | null) {
    if (token) this.token = token
  }

  config = {
    headers: {
      Authorization: 'Bearer ' + this.token,
    },
  }

  async getAll(langId: FormData) {
    const response = await axios.post<T[]>(this.endpoint.concat(this.actions.getAll), langId, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async create(arg: T) {
    const response = await axios.post<T>(this.endpoint.concat(this.actions.insert), arg, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async getById(id: FormData) {
    const response = await axios.post<T>(this.endpoint.concat(this.actions.getByID), id, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async getByIdSP(id: FormData) {
    const response = await axios.post<T>(this.endpoint.concat(this.actions.getByIDSP), id, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async update(arg: T) {
    const response = await axios.post(this.endpoint.concat(this.actions.update), arg, this.config).then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data,
        }
      } else return { success: false }
    })
    return response
  }
  async delete(id: FormData) {
    const response = await axios.post(this.endpoint.concat(this.actions.delete), id, this.config).then(res => {
      if (res.status === 200) {
        return true
      } else return false
    })
    return response
  }

  async exist() {
    return true
  }
}
