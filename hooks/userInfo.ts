import { localStorageName } from 'constants/localItem'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useUserInfo = () => {
  const [userIsLogin, setUserIsLogin] = useState<boolean | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem(localStorageName)
    if (user) {
      setToken(user)
      setUserIsLogin(true)
    } else {
      setUserIsLogin(false)
    }
  }, [router])

  return {
    userIsLogin,
    token,
  }
}
