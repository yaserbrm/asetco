import { MenuProps } from 'antd'
import { useUserInfo } from 'hooks/userInfo'
import { Routes } from 'interfaces/Routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { carImagePositionAction } from 'store/actions/global.action'

export const useMenuItems = (setOpenKeys: any) => {
  const dispatch = useDispatch()
  const { userIsLogin } = useUserInfo()
  const router = useRouter()

  const handleClickSumMenu = (e: MouseEvent<HTMLElement>, goTo: string) => {
    e.preventDefault()
    setOpenKeys([])
    router.push(goTo)
  }

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <Link href={Routes.Home}>
          <a>خانه</a>
        </Link>
      ),

      key: Routes.Home,
      onClick: () => {
        dispatch(carImagePositionAction(0))
      },
    },

    {
      label: 'خودروهای فرسوده',
      key: '/WornCars',
      onTitleClick: () => {
        dispatch(carImagePositionAction(-35))
      },
      popupOffset: [-28, 1],
      children: [
        {
          type: 'group',
          label: (
            <Link href={userIsLogin ? Routes.priceInquiry : `/login?returnUrl=${Routes.priceInquiry}`}>
              <a onClick={e => handleClickSumMenu(e, userIsLogin ? Routes.priceInquiry : `/login?returnUrl=${Routes.priceInquiry}`)}>
                {'استعلام قیمت خودرو '}
              </a>
            </Link>
          ),
          className: 'text-right',
        },
        {
          type: 'group',
          label: (
            <Link href={userIsLogin ? Routes.sellingWornCar : `/login?returnUrl=${Routes.sellingWornCar}`}>
              <a onClick={e => handleClickSumMenu(e, userIsLogin ? Routes.sellingWornCar : `/login?returnUrl=${Routes.sellingWornCar}`)}>
                {'ثبت خودروی فرسوده'}
              </a>
            </Link>
          ),
          className: 'text-right',
        },
      ],
    },
    {
      label: 'خودرو های وارداتی',
      key: '/products/imported-cars',
      onTitleClick: () => {
        dispatch(carImagePositionAction(35))
      },
      popupOffset: [-28, 1],

      children: [
        {
          type: 'group',
          label: (
            <Link href={'/products/imported-cars'}>
              <a>{'ثبت سفارش خودرو'}</a>
            </Link>
          ),
          className: 'text-right',
        },
      ],
    },
    {
      label: 'محصولات',
      key: '/products',

      popupOffset: [-48, 1],

      children: [
        {
          type: 'group',
          label: (
            <Link href={Routes.pAutoParts}>
              <a> قطعات خودرو</a>
            </Link>
          ),
          key: '/products/auto-parts',
          className: 'text-right',
        },
        {
          type: 'group',
          label: (
            <Link href={Routes.pWornCars}>
              <a onClick={e => handleClickSumMenu(e, Routes.pWornCars)}>{' خودرو فرسوده'}</a>
            </Link>
          ),
          className: 'text-right',
        },
      ],
    },

    {
      label: (
        <Link href={Routes.about}>
          <a>درباره ما</a>
        </Link>
      ),
      key: '/about',
    },
    {
      label: (
        <Link href={Routes.contact}>
          <a>تماس با ما</a>
        </Link>
      ),
      key: '/contact',
    },
  ]

  return { menuItems }
}
