import { Routes } from 'interfaces/Routes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useUserInfo } from './userInfo'

export const useAccessLoadPage = () => {
  const { userIsLogin } = useUserInfo()
  const [accessLoad, setAccessLoad] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (userIsLogin === null) {
      setAccessLoad(false)
      return
    } else if (userIsLogin === false) {
      setAccessLoad(false)
      router.push(Routes.login)
    } else {
      setAccessLoad(true)
    }
  }, [router, userIsLogin])
  return { accessLoad }
}
