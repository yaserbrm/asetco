import { combineReducers } from 'redux'
import * as reducers from './reducers'
import { splitReducer } from '@splitsoftware/splitio-redux'

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  ...reducers,
  splitio: splitReducer,
})
