import { ReducerType } from '../interfaces/reducer-payload.type'
import { SavedUser } from '../interfaces/saved-user.interface'
import * as types from '../interfaces/action-types'
import { initialLoadingText } from 'constants/initialLoadingText'

export interface ILoadingStore {
  perLoading: boolean
  preLoadingTitle: string
}
export interface initialStateType {
  user: SavedUser
  carImagePosition: number
  backButton: boolean
  loading: ILoadingStore
}

const initialState: initialStateType = {
  user: { accessToken: '', userInfo: undefined, ownerInfo: undefined },
  carImagePosition: 0,
  backButton: false,
  loading: { perLoading: true, preLoadingTitle: initialLoadingText },
}

export const globals = (state = initialState, { type, payload }: ReducerType) => {
  switch (type) {
    case types.SAVE_USER:
      return {
        ...state,
        user: payload,
      }
    case types.CARE_IMAGE_POSITION:
      return {
        ...state,
        carImagePosition: payload,
      }
    case types.ACTIVE_BACK_BUTTON:
      return {
        ...state,
        backButton: payload,
      }
    case types.PER_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          perLoading: payload,
        },
      }
    case types.PER_LOADING_TITLE:
      return {
        ...state,
        loading: {
          ...state.loading,
          preLoadingTitle: payload,
        },
      }
    default:
      return state
  }
}
