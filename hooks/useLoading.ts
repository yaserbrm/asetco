import { initialLoadingText } from 'constants/initialLoadingText'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from 'store'
import { preLoadingAction, preLoadingTitleAction } from 'store/actions/global.action'
import { loadingSelector } from 'store/selectors'

export const useLoading = () => {
  const { preLoadingTitle, perLoading } = useSelector(loadingSelector)
  const dispatch = useDispatch()
  const setLoadingHandler = (state: boolean) => {
    dispatch(preLoadingAction(state))
  }
  const setLoadingTitleHandler = (text: string) => {
    dispatch(preLoadingTitleAction(text))
  }

  return {
    loading: perLoading,
    setLoading: setLoadingHandler,
    loadingTitle: preLoadingTitle,
    setLoadingTitle: setLoadingTitleHandler,
  }
}
