import { IWcsSecurityCode, IAuthenticationS, AuthService, IAuthentication } from 'core/wcs/Authentication'
import { ContactService, IContactS } from 'core/wcs/contact'
import { createContext, FC, useContext } from 'react'

interface contextValue {
  securityCodeService: IAuthenticationS<IAuthentication>
  contactService: IContactS
}

export const SecurityCodeServiceContext = createContext<contextValue | undefined>(undefined)

interface SecurityCodeContextProps {
  children: React.ReactNode
}
const SecurityCodeContext: FC<SecurityCodeContextProps> = ({ children }) => {
  const services: contextValue = {
    securityCodeService: new AuthService(),
    contactService: new ContactService(),
  }

  return <SecurityCodeServiceContext.Provider value={services}>{children}</SecurityCodeServiceContext.Provider>
}

export const useSecurityCodeContext = () => useContext(SecurityCodeServiceContext)
export default SecurityCodeContext
