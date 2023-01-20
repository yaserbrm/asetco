import { Menu, MenuProps } from 'antd'
import React, { FC } from 'react'
import { HeaderMenuContainer } from '../style'
import { CurrentTable } from '../constant/page'
import { useTractRecordsStateCtx } from '../context'
import { ProductsType } from 'interfaces/globalEnums'

const HeaderMenu: FC = () => {
  const { setProductType, switchPageHandler } = useTractRecordsStateCtx()
  const menuItems: MenuProps['items'] = [
    {
      key: 'one',
      onClick: () => {
        switchPageHandler(CurrentTable.WORN_CARS)
      },
      label: ' فروش خودروی فرسوده ',
    },
    {
      key: 'two',
      onClick: () => {
        switchPageHandler(CurrentTable.IMPORTED_CARS)
        setProductType(String(ProductsType.IMPORTED_CAR))
      },
      label: 'وسیله نقلیه وارداتی',
    },
    {
      key: 'three',
      onClick: () => {
        switchPageHandler(CurrentTable.AUTO_PARTS)
        setProductType(String(ProductsType.AUTO_PARTS_CARS))
      },
      label: 'قطعات ',
    },
    {
      key: 'four',
      onClick: () => {
        switchPageHandler(CurrentTable.BUY_WORN_CARS)
        setProductType(String(ProductsType.WORN_CARS))
      },
      label: 'خرید خودرو فرسوده ',
    },
    {
      key: 'five',
      onClick: () => {
        switchPageHandler(CurrentTable.TRANSACTIONS)
      },
      label: 'پرداختی ها',
    },
  ]
  return (
    <HeaderMenuContainer dir="rtl">
      <Menu mode="horizontal" defaultSelectedKeys={['one']} items={menuItems} />
    </HeaderMenuContainer>
  )
}

export default HeaderMenu
