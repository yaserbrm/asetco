import { Menu } from 'antd'
import { useLogOut } from 'hooks/logOut'
import Link from 'next/link'
import { exitIcon, trackRecordsIcon, userInfoIcon } from 'public/assets/svg/common/headerMenu'
import { DashboardDropdownOverlay } from '../styles'

export const useMenuItems = () => {
  const { logOut } = useLogOut()
  return (
    <DashboardDropdownOverlay>
      <Menu
        className="dashboard-dropdown"
        items={[
          {
            key: '1',

            label: (
              <Link href="/owner-profile" passHref>
                <a className="block text-right">اطلاعات کاربری</a>
              </Link>
            ),
            icon: userInfoIcon,
          },
          {
            key: '2',
            label: (
              <Link href="/track-records" passHref>
                <a className="block text-right">پیگیری سوابق</a>
              </Link>
            ),
            icon: trackRecordsIcon,
          },

          {
            key: '3',
            label: (
              <span
                onClick={e => {
                  e.preventDefault()
                  logOut()
                }}
                className="block text-right"
              >
                خروج
              </span>
            ),
            icon: exitIcon,
          },
        ]}
      />
    </DashboardDropdownOverlay>
  )
}
