import { useEffect, useState } from 'react'
import { Drawer, MenuProps } from 'antd'
import { Menu, Button } from 'antd'
import { MenuContainer } from './styles'
import { useMenuItems } from './hooks'
import { useRouter } from 'next/router'
import { Routes } from 'interfaces/Routes'

// submenu keys of first level
const rootSubmenuKeys = ['/WornCars', '/ImportedCars']

export const HeaderMenu: React.FC = () => {
  const [current, setCurrent] = useState('home')
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [innerWidth, setInnerWidth] = useState<number>(0)
  const [openKeys, setOpenKeys] = useState([''])

  const { menuItems } = useMenuItems(setOpenKeys)

  const router = useRouter()

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
  }

  const onClickMenu: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    setDrawerVisible(false)
  }

  const onCloseDrawer = () => {
    setDrawerVisible(!drawerVisible)
  }

  useEffect(() => {
    setDrawerVisible(false)
    setOpenKeys([])
    const routesObj = {
      wornCars: [Routes.sellingWornCar, Routes.priceInquiry],
      product: [Routes.pAutoParts, Routes.pWornCars],
    }

    if (routesObj.wornCars.find(i => i === router.pathname)) {
      setCurrent('/WornCars')
    } else if (routesObj.product.find(i => i === router.pathname)) {
      setCurrent('/products')
    } else {
      setCurrent(router.pathname)
    }
  }, [router.pathname])

  const innerWidthHandler = () => {
    setInnerWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      innerWidthHandler()
    })
    return () => {
      window.removeEventListener('resize', () => {
        innerWidthHandler()
      })
    }
  }, [])

  useEffect(() => {
    if (innerWidth > 992) {
      setDrawerVisible(false)
      setOpenKeys([])
    }
  }, [innerWidth, setDrawerVisible])

  return (
    <>
      <MenuContainer>
        <Button
          type="text"
          className="barsMenu"
          onClick={() => {
            setDrawerVisible(!drawerVisible)
          }}
        >
          <span className="material-icons">menu</span>
        </Button>
        <Drawer placement="right" onClose={onCloseDrawer} visible={drawerVisible} width={236} className="drawer-responsive">
          <Menu
            onClick={onClickMenu}
            selectedKeys={[current]}
            items={menuItems}
            triggerSubMenuAction={'click'}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            direction="rtl"
            style={{ float: 'right' }}
          />
        </Drawer>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
          triggerSubMenuAction={'click'}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          className="mainMenu"
        />
      </MenuContainer>
    </>
  )
}
