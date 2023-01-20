import { FC, useState, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import { LoginFormWraper } from '../styles/loginForm'
import { ILoginFormProps } from '../interfaces/ILoginForm'
import { InputCode } from 'components/uiKit/codeInput'
import Timer from './ResendTimer'
import { IForm } from '../interfaces/IForm'
import { useLoginService } from 'pages/login/context'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { Global } from 'store/actions'
import { localStorageName } from 'constants/localItem'
import { CommonService } from 'core/wcs/common'
import Image from 'next/image'
import { fixNumbers } from 'helper/fixNumber'
import { Routes } from 'interfaces/Routes'
import { useUnauthorizedLogOut } from 'hooks/logOut'

const LoginFormCode: FC<ILoginFormProps> = ({ setLoginFormActive, mobile }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const [clear, setClear] = useState<boolean>(false)
  const [value, setValue] = useState<string | undefined>('')

  const router = useRouter()
  const dispatch = useDispatch()
  const service = useLoginService()
  const { unauthorizedLogOut } = useUnauthorizedLogOut()

  const handleLogin = (values: IForm) => {
    if (!value) return ToastAlert.error('خطا در دریافت  کد امنیتی')
    setLoading(true)

    const formData = new FormData()
    formData.append('ReceptorMobile', fixNumbers(mobile!))
    formData.append('ActiveCode', fixNumbers(value))
    service.login
      .isValidActiveCode(formData)
      .then(res => {
        if (res.success && res.data?.status != '200') {
          if (res.data?.message === 'NotFoundActiveCode') {
            ToastAlert.error('کد تایید اشتباه است')
          } else if (res.data?.message === 'NotAccess') {
            ToastAlert.error('با این شماره همراه امکان ورود وجود ندارد')
          }
        } else if (res.success && res.data?.status == '200' && res.data.token) {
          const token = res.data.token
          localStorage.setItem(localStorageName, token)
          const getCurrentUser = new CommonService(token)
          getCurrentUser
            .getInfoUser()
            .then(res => {
              if (res.success && res.data) {
                if (res.data.status == '200') {
                  dispatch(Global.saveUser({ accessToken: token, userInfo: res.data.user, ownerInfo: res.data.owner }))
                } else if (res.data.message === 'Unauthorized') {
                  unauthorizedLogOut(Routes.login)
                }
              }
            })
            .catch(err => console.log({ err }))
            .finally(() => {
              router.push(router.query.returnUrl ? ((Routes.Home + router.query.returnUrl) as string) : Routes.Home)
            })
        } else {
          ToastAlert.error('خطا در ارسال کد تایید')
        }
      })
      .catch(error => ToastAlert.error('خطا در ارتباط با سرور'))
      .finally(() => setLoading(false))
  }
  const handleResendLink = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('ReceptorMobile', mobile!)
    service.login
      .sendActiveCode(formData)
      .then(res => {
        if (res.success) {
          if (res.data?.message === 'ErrorSendSms') {
            ToastAlert.error('خطا در ارسال کد تایید')
          } else if (res.data?.message === 'Sucess') {
            ToastAlert.success('کد تایید ارسال شد')
            setValue('')
            setActive(false)
            setClear(true)
          }
        } else {
          ToastAlert.error('خطا در ارسال کد تایید')
        }
      })
      .catch(() => ToastAlert.error('خطا در ارتباط با سرور'))
      .finally(() => setLoading(false))
  }
  const handleBackToMobile = () => {
    setLoginFormActive('login-mobile')
  }

  return (
    <>
      <Row justify="center" align="middle" className="mt-3">
        <Col xs={{ span: 23 }} sm={{ span: 20 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <LoginFormWraper>
            <div className="LoginForm">
              <Form name="basic" initialValues={{ remember: true }} autoComplete="off" onFinish={handleLogin}>
                <div className="LoginFormCodeLogo">
                  <span className="material-icons back-arrow" onClick={handleBackToMobile}>
                    arrow_back
                  </span>
                  <div className="logo">
                    <Image src="/assets/svg/common/asetcoLogo.svg" width="200px" height="50px" alt="آستکو یدک" />
                  </div>
                </div>

                <p className="LoginFormTitle">کد تایید را وارد نمایید</p>
                <p className="LoginFormTitleDes">کد تایید برای شماره {mobile} ارسال شد.</p>
                <section className="form-item inputCode">
                  <InputCode
                    fields={5}
                    onChange={val => {
                      setValue(val)
                    }}
                    autoFocus={true}
                    clear={clear}
                    setClear={setClear}
                  />
                </section>
                <section className="resent-time-container">
                  <div className="LoginActiveCodeFormResend">
                    <span className={`${!active ? '' : 'disabled-link'}`}>
                      <Timer initialMinute={1} initialSeconds={0} active={active} setActive={setActive} />
                    </span>
                    <span className={`active-code-resend-link ${active ? '' : 'disabled-link'}`} onClick={handleResendLink}>
                      ارسال مجدد
                    </span>
                  </div>
                </section>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={active || value?.length !== 5 ? true : false}
                    block
                    className="FormSubmit CodeFormSubmit"
                    loading={loading}
                  >
                    تایید
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </LoginFormWraper>
        </Col>
      </Row>
    </>
  )
}

export default LoginFormCode
