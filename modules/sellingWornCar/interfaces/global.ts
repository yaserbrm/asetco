import { Dispatch, SetStateAction } from 'react'

export interface IModalConfirm {
  showCodeDialog: boolean
  setShowCodeDialog: Dispatch<SetStateAction<boolean>>
  trackingCode: string
}
