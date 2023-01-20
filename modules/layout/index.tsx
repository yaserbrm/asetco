import { FC, ReactNode, useEffect } from 'react'
import { Layout } from 'antd'
import { MainLayoutContainer } from './styles'
import { MainHeader } from './header'
import { MainFooter } from './footer'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { carImagePositionAction } from 'store/actions/global.action'
import { Routes } from 'interfaces/Routes'
import store from 'store'
import { getTreatments } from '@splitsoftware/splitio-redux'

interface IMainLayoutProps {
  children: ReactNode
}
export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRouter()
  const { Content } = Layout
  useEffect(() => {
    if (route.route === Routes.Home) {
      dispatch(carImagePositionAction(0))
    }
  }, [dispatch, route])
  useEffect(() => {
    store.dispatch(getTreatments({ splitNames: ['mehraman'] }))
  }, [])
  return (
    <MainLayoutContainer id="mainLayoutHolder">
      <Layout id="mainLayout">
        <MainHeader />
        <Content className="layout-content">{children}</Content>
        <MainFooter />
      </Layout>
    </MainLayoutContainer>
  )
}
