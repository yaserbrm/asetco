export interface IAuthentication {
  success: boolean
  message: string
}

export interface ISendActiveCode {
  message: string
  status: string
}

export interface IConfirmActiveCode {
  message: string
  status: string
  token?: string
}

export interface IWcsSecurityCode {
  readonly bitmapSecurityCode: string
  readonly tokenSecurityCode: string
}
