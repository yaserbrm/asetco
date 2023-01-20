import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { Routes } from 'interfaces/Routes'
import Link from 'next/link'

export const menuItems: MenuProps['items'] = [
  {
    label: (
      <Link href={Routes.Home} passHref>
        <a>خانه</a>
      </Link>
    ),
    key: 'home',
  },
  {
    label: 'خودروهای فرسوده',
    key: 'WornCars',
    children: [
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">directions_car</span>
              {'استعلام قیمت خودرو '}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">directions_car</span> {'ثبت خودروی فرسوده'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">directions_car</span> {'ثبت خودروی فرسوده'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">work_history</span> {'پیگیری سوابق'}
            </a>
          </Link>
        ),
      },
    ],
  },
  {
    label: 'خودرو های وارداتی',
    key: 'ImportedCars',
    children: [
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">directions_car</span>
              {'ثبت سفارش خودرو'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">directions_car</span> {'ثبت خودروی فرسوده'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'} passHref>
            <a>
              <span className="material-icons">work_history</span> {'پیگیری سوابق'}
            </a>
          </Link>
        ),
      },
    ],
  },
  {
    label: (
      <Link href={Routes.about} passHref>
        <a>درباره ما</a>
      </Link>
    ),
    key: 'about',
  },
  {
    label: (
      <Link href={Routes.contact} passHref>
        <a>تماس با ما</a>
      </Link>
    ),
    key: 'contact',
  },
]
