import { AuthService, IAuthentication, IAuthenticationS } from 'core/wcs/Authentication'
import { createContext, FC, ReactNode, useContext } from 'react'

interface contextValue {
  login: IAuthenticationS<IAuthentication>
}

export const LoginServiceContext = createContext<contextValue | undefined>(undefined)

const LoginContext: FC<{ children: ReactNode }> = ({ children }) => {
  const services: contextValue = {
    login: new AuthService(),
  }
  return <LoginServiceContext.Provider value={services}>{children}</LoginServiceContext.Provider>
}

export const useLoginService = () => useContext(LoginServiceContext)!
export default LoginContext
