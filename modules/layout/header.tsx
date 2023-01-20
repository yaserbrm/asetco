import { Badge, Col, Dropdown, Row } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { FC, useEffect, useState } from 'react'
import { CartText, HeaderWarper } from './styles'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { HeaderMenu } from './MenuItems'
import { useUserInfo } from 'hooks/userInfo'
import { useRouter } from 'next/router'
import { useMenuItems } from './constant/dashboardMenuItem'
import { basketIcon, dashboardIcon, loginIcon } from 'public/assets/svg/common/headerMenu'
import { useSelector } from 'react-redux'
import { getCartCount } from 'store/selectors'
import Link from 'next/link'
import { Routes } from 'interfaces/Routes'

export const MainHeader: FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('')

  const { userIsLogin } = useUserInfo()

  const router = useRouter()
  const menu = useMenuItems()
  const cartCount = useSelector(getCartCount)
  useEffect(() => {
    setCurrentPath(router.pathname)
  }, [router.pathname])

  return (
    <HeaderWarper>
      <Header className="header">
        <Row align="middle" justify={'end'}>
          <Col xs={{ span: 5, order: 1 }} lg={{ span: 4, order: 1 }} className={'loginButton '}>
            <Row align="middle" justify="center" gutter={16} className="items-baseline-menu-item">
              <Col span={12}>
                {!userIsLogin ? (
                  <ButtonUiKit type="link" onClick={() => router.push(Routes.login)} className="p-[0px] ">
                    <div
                      className={`${
                        currentPath === Routes.login ? 'dashboard-dropdown-active' : 'dashboard-dropdown-inactive'
                      } inline-flex items-center`}
                    >
                      {loginIcon}
                      <span className="headerText">ورود</span>
                    </div>
                  </ButtonUiKit>
                ) : (
                  <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                    <span
                      className={
                        currentPath === Routes.ownerProfile || currentPath === Routes.trackRecord
                          ? 'dashboard-dropdown-active'
                          : 'dashboard-dropdown-inactive'
                      }
                    >
                      <div className="inline-flex items-center cursor-pointer">
                        {/* {dashboardIcon} */}
                        <span className="material-icons" style={{ color: '#51a6f0' }}>
                          menu
                        </span>
                        {/* <span className="headerText">منو</span> */}
                      </div>
                    </span>
                  </Dropdown>
                )}
              </Col>
              <Col span={12}>
                <Link href="/cart">
                  <span className={`${currentPath === Routes.cart ? 'dashboard-dropdown-active' : 'dashboard-dropdown-inactive'}`}>
                    <div className="inline-flex items-center cursor-pointer">
                      <Badge className="badge" size="small" count={cartCount} offset={[-3, 5]} color="#FFB800" style={{ color: '#000' }}>
                        {basketIcon}
                      </Badge>
                      <CartText hasCount={cartCount > 0} className="headerText cartText">
                        سبد سفارش
                      </CartText>
                    </div>
                  </span>
                </Link>
              </Col>
            </Row>
          </Col>

          <Col xs={{ span: 3, order: 4 }} lg={{ span: 17, order: 3 }} dir="rtl" className="">
            <HeaderMenu />
          </Col>

          <Col xs={{ span: 16, order: 3 }} lg={{ span: 3, order: 4 }} className="logo ">
            <Link href="/">
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/assets/svg/common/asetcoLogo.svg" width="200px" height="16" alt="آستکو یدک" />
              }
            </Link>
          </Col>
        </Row>
      </Header>
    </HeaderWarper>
  )
}
