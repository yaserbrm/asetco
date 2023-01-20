import { FC, useState } from 'react'
import LoginFormCode from './loginFormCode'
import LoginFormMobile from './loginFormMobile'

export const LoginFormPage: FC = () => {
  const [loginFormActive, setLoginFormActive] = useState<string>('login-mobile')
  const [mobile, setMobile] = useState<string>('')

  return loginFormActive === 'login-mobile' ? (
    <LoginFormMobile setLoginFormActive={setLoginFormActive} setMobile={setMobile} />
  ) : (
    <LoginFormCode setLoginFormActive={setLoginFormActive} mobile={mobile} />
  )
}
