import { Col, Form, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ButtonUiKit } from 'components/uiKit/buttons'
import React, { useCallback, useEffect, useState } from 'react'
import validator from 'validator'
import { useSecurityCodeContext } from 'pages/contact/context'

import { FormContactContainer, FromButtonContactContainer, QuestionContactContainer, SecurityCodeContainer } from '../styles'

import { IFormContact } from '../interfaces'
import { InputCode } from 'components/uiKit/codeInput'
import FormContactHeader from './FormContactHeader'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IWcsSecurityCode } from 'core/wcs/Authentication'
import { fixNumbers } from 'helper/fixNumber'

const ContactFrom = () => {
  const [securityCode, setSecurityCode] = useState<IWcsSecurityCode>({
    tokenSecurityCode: '',
    bitmapSecurityCode: '',
  })
  const [securityCodeValue, setSecurityCodeValue] = useState<string>('')
  const [securityCodeError, setSecurityCodeError] = useState<boolean>(false)
  const service = useSecurityCodeContext()
  const [clearCodeInput, setClearCodeInput] = useState<boolean>(false)
  const [contactForm] = Form.useForm()
  const onSubmitHandler = (data: IFormContact) => {
    if (!securityCodeIsValid(securityCodeValue)) {
      ToastAlert.error('کد امنیتی را به درستی وارد کنید')
      return
    }
    const formData = new FormData()
    formData.append('Msg_FullName', data.name)
    formData.append('Msg_Mobile', fixNumbers(data.phoneNumber))
    formData.append('Msg_Text', data.description)
    formData.append('SecurityCode', securityCodeValue)
    formData.append('TokenSecurityCode', securityCode.tokenSecurityCode)
    service?.contactService
      .send(formData)
      .then(res => {
        if (res.data && res.data.message === 'Sucess') {
          ToastAlert.success('پیام شما ارسال شد')
          contactForm.resetFields()
          setClearCodeInput(true)
          refreshSecurityCode()
          setSecurityCodeError(false)
        } else {
          ToastAlert.error('خطا در ارسال پیام')
        }
      })
      .catch(err => {
        ToastAlert.error('خطا در ارسال پیام')
      })
  }

  const changeHandlerSecurityCode = (value: string) => {
    setSecurityCodeValue(value)
  }

  const securityCodeIsValid = (value: string) => {
    if (value.length < 5) {
      setSecurityCodeError(true)
      return false
    } else {
      setSecurityCodeError(false)
      return true
    }
  }
  const refreshSecurityCode = useCallback(async () => {
    try {
      const result = await service?.securityCodeService.genrateSecurityCode()
      if (result?.success && result.data) {
        setSecurityCode(result.data as IWcsSecurityCode)
      }
    } catch {
      ToastAlert.error('خطای ارتباط با سرور')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.securityCodeService])

  useEffect(() => {
    refreshSecurityCode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormContactContainer>
      <FormContactHeader title="ارسال پیام" />

      <Form name="contact" form={contactForm} className="w-full" dir="rtl" layout="vertical" onFinish={onSubmitHandler}>
        <QuestionContactContainer>
          <Row gutter={[24, 5]}>
            <Col span={24} lg={12}>
              <Form.Item label="نام شما" name="name" rules={[{ required: true, message: 'لطفا نام خود را وارد کنید' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24} lg={12}>
              <Form.Item
                label="تلفن همراه"
                name="phoneNumber"
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
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="توضیحات" name="description" rules={[{ required: true, message: 'لطفا توضیحات خود را وارد کنید' }]}>
                <TextArea maxLength={500} showCount />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="کد امنیتی را وارد کنید" className="mb-0 securityCode-label-center">
                <Row gutter={[8, 8]} justify="space-between">
                  <Col xl={12} lg={12} md={24} sm={12} className="w-full">
                    <InputCode
                      autoFocus={false}
                      clear={clearCodeInput}
                      onChange={changeHandlerSecurityCode}
                      className="inputCodeContact"
                      containerClassName="!px-2"
                      fields={5}
                      setClear={setClearCodeInput}
                      isValid={securityCodeError}
                    />
                  </Col>

                  <Col xl={12} lg={12} md={24} sm={12} className="w-full">
                    <SecurityCodeContainer>
                      {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`data:image/png;base64,${securityCode.bitmapSecurityCode}`}
                          className="securityCodeImage"
                          alt="securityCode"
                        />
                      }
                      <span
                        className="material-icons refreshIcon"
                        onClick={() => {
                          refreshSecurityCode()
                        }}
                      >
                        refresh
                      </span>
                    </SecurityCodeContainer>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </QuestionContactContainer>

        <FromButtonContactContainer>
          <Form.Item noStyle>
            <ButtonUiKit type="primary" htmlType="submit" disabled={!(securityCodeValue.length === 5)}>
              ثبت
            </ButtonUiKit>
          </Form.Item>
        </FromButtonContactContainer>
      </Form>
    </FormContactContainer>
  )
}

export default ContactFrom
