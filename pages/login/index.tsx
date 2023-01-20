import { NextPage } from 'next'
import { LoginFormPage } from 'modules/login/components/loginFormPage'
import LoginContext from './context'
import { useUserInfo } from 'hooks/userInfo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLoading } from 'hooks/useLoading'
import Meta from 'components/uiKit/meta/meta'
import { Routes } from 'interfaces/Routes'

const Login: NextPage = () => {
  const { setLoading } = useLoading()
  const { userIsLogin } = useUserInfo()
  const router = useRouter()

  useEffect(() => {
    if (userIsLogin === true) {
      router.push(Routes.Home)
      return
    }
    if (userIsLogin === false) setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userIsLogin])

  return (
    <>
      <LoginContext>
        <Meta
          title="سایت آستکو یدک /  ورود به آستکو یدک "
          description="Asetco yadak application "
          keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
          ogImage="assets/png/home-page.jpg"
          ogUrl="https://www.asetcoyadak.com"
          ogTitle="سایت آستکو یدک /  ورود به آستکو یدک "
          ogType="company"
        />

        <LoginFormPage />
      </LoginContext>
    </>
  )
}

export default Login
