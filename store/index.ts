import { configureStore } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import { rootReducer } from './root-reducer'
import { initSplitSdk } from '@splitsoftware/splitio-redux'

const sdkBrowserConfig = {
  core: {
    authorizationKey: 'knuhd5b0322iesg45k9btmp9nfurv3polb9h',
    key: 'key',
  },
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})
store.dispatch(initSplitSdk({ config: sdkBrowserConfig }))

export type AppDispatch = typeof store.dispatch

export default store
