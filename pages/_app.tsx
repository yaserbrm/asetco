import 'styles/global.style.css'

import { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { GlobalStyle } from 'styles/global.style'
import { Provider } from 'react-redux'
import store from 'store'
import { MainLayout } from 'modules/layout'
import { FC, useEffect, useState } from 'react'
import { localStorageName } from 'constants/localItem'
import { saveUser } from 'store/actions/global.action'
import { SavedUser } from 'store/interfaces/saved-user.interface'
import { CommonService } from 'core/wcs/common/service'
import { useCartStorageHandler } from 'hooks/cartStorageHandler'
import { PerLoading } from 'components/uiKit/pageLoading'
import Meta from 'components/uiKit/meta/meta'
import { useUnauthorizedLogOut } from 'hooks/logOut'
import { Routes } from 'interfaces/Routes'
import LocalBusinessJsonLD from 'components/uiKit/jsonLD/LocalBusiness'
import { BrandJsonLD } from 'components/uiKit/jsonLD/BrandJsonLd '
import { GoogleAnalytics } from 'nextjs-google-analytics'

const CustomApp: FC<AppProps> = (props: AppProps) => {
  useCartStorageHandler()
  const { Component, pageProps } = props
  const [user, setUser] = useState<SavedUser | null>(null)

  const _subscribe = store.subscribe(() => {
    const { globals } = store.getState()
    setUser(globals.user)
  })

  const { unauthorizedLogOut } = useUnauthorizedLogOut()

  useEffect(() => {
    const storage = localStorage.getItem(localStorageName)
    if (storage) {
      if (!user?.accessToken || user.accessToken === '') {
        store.dispatch(saveUser({ accessToken: storage }))
      }
      if (!user?.userInfo) {
        const getCurrentUser = new CommonService(storage)
        getCurrentUser
          .getInfoUser()
          .then(res => {
            if (res.success && res.data) {
              if (res.data.status == '200') {
                store.dispatch(saveUser({ accessToken: storage, userInfo: res.data.user, ownerInfo: res.data.owner }))
              } else if (res.data.message === 'Unauthorized') {
                unauthorizedLogOut(Routes.login)
              }
            }
          })
          .catch(err => console.log({ err }))
      } else store.dispatch(saveUser({ accessToken: storage }))
    }

    if (user?.accessToken && user.accessToken !== '' && !storage) {
      localStorage.setItem(localStorageName, user.accessToken)
    }

    return () => {
      _subscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Provider store={store}>
      <GoogleAnalytics strategy="lazyOnload" />

      <LocalBusinessJsonLD />
      <BrandJsonLD />

      <Meta
        title="سایت آستکو یدک"
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک"
        ogType="company"
      />

      <GlobalStyle />

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
        bodyClassName="toastBody"
      />
      <PerLoading />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}
export default CustomApp
