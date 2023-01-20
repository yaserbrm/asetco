import { localStorageName } from 'constants/localItem'
import { Routes } from 'interfaces/Routes'
import { useRouter } from 'next/router'

export const useLogOut = () => {
  const router = useRouter()
  const logOut = () => {
    localStorage.removeItem(localStorageName)
    router.push(Routes.Home)
  }
  return { logOut }
}

export const useUnauthorizedLogOut = () => {
  const router = useRouter()
  const unauthorizedLogOut = (redirectTo: string) => {
    localStorage.removeItem(localStorageName)
    router.push(redirectTo)
  }
  return { unauthorizedLogOut }
}
