export interface ITransaction {
  ordTrans_ID: number
  ordTrans_UsrID: number
  ordTrans_DateTrans: string
  ordTrans_TrackCode: string
  ordTrans_OrdrCod: number
  ordTrans_Price: number
}

export interface IOrderTransactionResult {
  status: number
  orderTransaction: ITransaction[]
}
export interface IOrderTransactionService {
  getAllByUser: () => Promise<{
    success: boolean
    data?: ITransaction[]
  }>
}
