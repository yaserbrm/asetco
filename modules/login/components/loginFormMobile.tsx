import { FC, useState } from 'react'
import { Form, Button, Input, Row, Col } from 'antd'
import validator from 'validator'
import { useLoginService } from 'pages/login/context'
import { LoginFormWraper } from '../styles/loginForm'
import { ILoginFormProps } from '../interfaces/ILoginForm'
import { IForm } from '../interfaces/IForm'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { Regex } from 'modules/sellingWornCar/constant/regex'
import Image from 'next/image'
import { fixNumbers } from 'helper/fixNumber'

const LoginFormMobile: FC<ILoginFormProps> = ({ setLoginFormActive, setMobile }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [loginForm] = Form.useForm()
  const service = useLoginService()

  const handleMobile = (values: IForm) => {
    if (!values.mobile) return ToastAlert.error('خطا در دریافت شماره تلفن')
    setLoading(true)
    if (setMobile) setMobile(values.mobile)
    const formData = new FormData()
    formData.append('ReceptorMobile', fixNumbers(values.mobile))
    service.login
      .sendActiveCode(formData)
      .then(res => {
        if (res.success) {
          if (res.data?.message === 'ErrorSendSms') {
            ToastAlert.error('خطا در ارسال کد تایید')
          } else if (res.data?.message === 'Sucess') {
            ToastAlert.success('کد تایید ارسال گردید')
            setLoginFormActive('login-code')
          }
        } else {
          ToastAlert.error('خطا در ارسال کد تایید')
        }
      })
      .catch(error => ToastAlert.error('خطا در ارتباط با سرور'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Row justify="center" align="middle" className="mt-3">
        <Col xs={{ span: 23 }} sm={{ span: 20 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <LoginFormWraper>
            <div className="LoginForm">
              <Form name="basic" initialValues={{ remember: true }} form={loginForm} autoComplete="off" onFinish={handleMobile}>
                <div className="LoginFormLogo">
                  <Image src="/assets/svg/common/asetcoLogo.svg" width="200px" height="50px" alt="آستکو یدک" />
                </div>

                <p className="LoginFormTitle">ورود</p>
                <p className="LoginFormTitleDes">.لطفا شماره همراه خود را وارد کنید</p>
                <section className="form-item">
                  <Form.Item
                    label=""
                    name="mobile"
                    rules={[
                      { required: true, message: 'لطفا شماره موبایل را وارد نمایید' },
                      () => ({
                        validator(_, value) {
                          if (!value || validator.isMobilePhone(fixNumbers(value), 'fa-IR')) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('فرمت موبایل اشتباه است'))
                        },
                      }),
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      className="login-form-mobile-input"
                      maxLength={11}
                      placeholder="شماره همراه"
                      onPressEnter={() => {
                        handleMobile(loginForm.getFieldsValue())
                      }}
                      prefix={<span className="material-icons input-prefix">phone_iphone</span>}
                      onKeyPress={event => {
                        if (!Regex.number.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </Form.Item>
                </section>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="FormSubmit MobileFormSubmit" loading={loading}>
                    ورود
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

export default LoginFormMobile
