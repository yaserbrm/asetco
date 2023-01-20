import { Col, Form, Row, Select } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { FinalFormWrapper } from '../styles/finalForm'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { ISellingWornCarProps } from '../interfaces/sellingWornCar'
import { InputCode } from 'components/uiKit/codeInput'
import TrackingCodeModal from './trackingCodeModal'
import { useSellingWornCarPageState } from '../context/context'
import { useSellingWornCarService } from 'pages/selling-worn-car/context'
import { IWcsSecurityCode } from 'core/wcs/Authentication'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import Image from 'next/image'
import { usersSelector } from 'store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { saveUser } from 'store/actions/global.action'
import { useLoading } from 'hooks/useLoading'
import { initialLoadingText } from 'constants/initialLoadingText'
import { IObject } from 'interfaces/IObject'
import { Routes } from 'interfaces/Routes'

const { Option } = Select

const FinalRegister: FC<ISellingWornCarProps> = () => {
  const [clear, setClear] = useState<boolean>(false)
  const [showCodeDialog, setShowCodeDialog] = useState<boolean>(false)
  const [trackingCode, setTrackingCode] = useState<string>('')
  const [securityCodeImage, setSecurityCodeImage] = useState<IWcsSecurityCode>()
  const [refreshCode, setRefreshCode] = useState<boolean>(false)
  const [securityCode, setSecurityCode] = useState<string>('')
  const router = useRouter()
  const states = useSellingWornCarPageState()
  const [securityCodeError, setSecurityCodeError] = useState<boolean>(false)
  const services = useSellingWornCarService()
  const userInfo = useSelector(usersSelector)
  const [loading, setLoading] = useState<boolean>(false)
  const [finalForm] = Form.useForm()
  const dispatch = useDispatch()
  const { setLoading: setPreLoading, setLoadingTitle } = useLoading()
  const handleFinal = (values: IObject) => {
    if (securityCode.length < 5) {
      setSecurityCodeError(true)
      return
    }
    setLoading(true)
    setLoadingTitle('لطفا صبر کنید سیستم در حال بارگذاری مدارک است.')
    setPreLoading(true)
    setSecurityCodeError(false)

    const formData = new FormData()
    if (values.representative) {
      formData.append('AgentID', values.representative)
    } else [formData.append('AgentID', String(-1))]
    formData.append('Own_FName', states.value.owner.own_FName!)
    formData.append('Own_LName', states.value.owner.own_LName!)
    formData.append('Own_IdenNumber', states.value.owner.own_IdenNumber!)
    formData.append('Own_Mobile', userInfo.userInfo?.usr_Mobile!)
    formData.append('Own_Tell', states.value.owner.own_Tell || '')
    formData.append('Own_ProvncId', String(states.value.owner.own_ProvncId!))
    formData.append('Own_cityId', String(states.value.owner.own_cityId!))
    if (states.value.owner.own_Desc) formData.append('Own_Desc', String(states.value.owner.own_Desc!))
    formData.append('Own_ShbaNum', String(states.value.owner.own_ShbaNum!))
    if (states.value.car.oldCar) {
      formData.append('WCars_ID', String(states.wornCarId))
    } else {
      formData.append('WCars_ID', String(-1))
      formData.append('WCars_ModID', String(states.value.car.wCars_ModID!))
      formData.append('WCars_UsrType', String(states.value.car.wCars_UsrType!))
      formData.append('WCars_PlkType', String(states.value.car.wCars_PlkType!))
      formData.append('WCars_BldYear', String(states.value.car.wCars_BldYear.$jy!))
      formData.append('WCars_State', String(states.value.car.wCars_State!))
      formData.append('WCars_Desc', String(states.value.car.wCars_Desc))
    }
    formData.append('WCars_SellType', String(states.value.car.wCars_SellType))
    if (states.value.car.wCars_DocType) formData.append('WCars_DocType', String(states.value.car.wCars_DocType))

    if (states.value.car.wCars_Weight) {
      formData.append('WCars_Weight', String(states.value.car.wCars_Weight!))
    } else {
      formData.append('WCars_Weight', String(0))
    }
    if (states.value.car.wCars_Desc) formData.append('WCars_Desc', String(states.value.car.wCars_Desc!))
    for (let i = 0; i < states.value.attachments.doc.length; i++) {
      formData.append('FileDocsCar', states.value.attachments.doc[i].originFileObj as any)
    }
    for (let i = 0; i < states.value.attachments.card.length; i++) {
      formData.append('FileCardsCar', states.value.attachments.card[i].originFileObj as any)
    }
    for (let i = 0; i < states.value.attachments.image.length; i++) {
      formData.append('FileImagesCar', states.value.attachments.image[i].originFileObj as any)
    }
    for (let i = 0; i < states.value.attachments.others.length; i++) {
      formData.append('FileOtherDocs', states.value.attachments.others[i].originFileObj as any)
    }

    formData.append('WCars_DescDocsCar', String(states.value.attachmentsDescription.document_description))
    formData.append('WCars_DescCardsCar', String(states.value.attachmentsDescription.card_description))
    formData.append('WCars_DescImagesCar', String(states.value.attachmentsDescription.image_description))
    formData.append('WCars_DescOtherDocs', String(states.value.attachmentsDescription.others_description))
    formData.append('SecurityCode', String(securityCode))
    formData.append('TokenSecurityCode', String(securityCodeImage?.tokenSecurityCode))
    services.wornCars
      ?.insertWornMaster(formData)
      .then(res => {
        if (res.data && res.data.trackingCode) {
          const newUserInfo = {
            usr_CtyID: states.value.owner.own_cityId,
            usr_FName: states.value.owner.own_FName,
            usr_IdentNum: states.value.owner.own_IdenNumber,
            usr_LName: states.value.owner.own_LName,
            usr_ProvID: states.value.owner.own_ProvncId,
          }
          const newOwner: IObject = {
            own_ShbaNum: states.value.owner.own_ShbaNum,
            own_Tell: states.value.owner.own_Tell,
          }
          if (states.value.owner.own_Desc) {
            newOwner.own_Desc = states.value.owner.own_Desc
          }
          dispatch(
            saveUser({
              ...userInfo,
              userInfo: { ...userInfo.userInfo, ...newUserInfo },
              ownerInfo: { ...userInfo.ownerInfo, ...newOwner },
            }),
          )
          setTrackingCode(res.data.trackingCode)
          setShowCodeDialog(true)
        }
      })
      .catch(() => ToastAlert.error('خطای ارتباط با سرور'))
      .finally(() => {
        setLoading(false)
        setLoadingTitle(initialLoadingText)
        setPreLoading(false)
      })
  }
  const fetchSecurityCode = useCallback(() => {
    services?.authentication?.genrateSecurityCode().then(res => {
      if (res.data && res.success) {
        setSecurityCodeImage(res.data)
      } else {
        ToastAlert.error('خطا در دریافت کد امنیتی')
      }
    })
  }, [services])
  const fetchAgainSecurityCode = () => {
    setRefreshCode(prev => !prev)
  }
  useEffect(() => {
    fetchSecurityCode()
  }, [refreshCode, fetchSecurityCode])
  useEffect(() => {
    finalForm.setFieldsValue({ representative: states.value.finall.representative })
  }, [finalForm, states.value.finall.representative])
  return (
    <>
      <TrackingCodeModal showCodeDialog={showCodeDialog} setShowCodeDialog={setShowCodeDialog} trackingCode={trackingCode} />
      <Row justify="center" align="middle">
        <Col xs={23} sm={20} md={16} lg={15} xl={13}>
          <FinalFormWrapper>
            <div className="finalForm">
              <Form name="basic" form={finalForm} autoComplete="off" onFinish={handleFinal}>
                <div className="title-responsive">
                  <span className="material-icons icon back-responsive" onClick={() => states.setStep(states.step - 1)}>
                    west
                  </span>
                  <h1 className="finalFormTitle">انتخاب نماینده و ثبت نهایی</h1>
                </div>

                <p className="finalFormDes" dir="rtl">
                  در صورت تمایل، نماینده شرکت آستکو یدک در شهر خود را انتخاب و بعد از وارد کردن کد امنیتی، بر روی گزینه ثبت نهایی بزنید و تا
                  دریافت کد رهگیری منتظر بمانید.
                </p>

                <Row gutter={[1, 24]} dir="rtl" className="finalFormRow">
                  <Col span={24}>
                    <Form.Item
                      label="نماینده شرکت آستکو یدک"
                      name="representative"
                      labelCol={{ span: 24 }}
                      initialValue={states.value.finall.representative}
                    >
                      <Select
                        showSearch
                        size="large"
                        placeholder="نماینده آستکو یدک"
                        direction="rtl"
                        className="owner-form-input"
                        onChange={id => {
                          states.handleFinall({ representative: id })
                        }}
                      >
                        {states.wornMasterAgents?.map((agent, index) => (
                          <Option value={agent.user_ID} key={index} className="text-right">
                            {agent.user_FullName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Row className="securityCodeImageRow" align="middle" justify="center">
                      <Col className="securityCodeImage" span={22}>
                        {securityCodeImage?.bitmapSecurityCode ? (
                          <Image
                            src={`data:image/jpeg;base64,${securityCodeImage?.bitmapSecurityCode}`}
                            alt="securityCode"
                            className=""
                            width={160}
                            height={40}
                          />
                        ) : (
                          <></>
                        )}
                      </Col>
                      <Col span={2} onClick={fetchAgainSecurityCode}>
                        <span className="material-icons refresh">refresh</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <InputCode
                      fields={5}
                      onChange={setSecurityCode}
                      autoFocus={false}
                      clear={clear}
                      setClear={setClear}
                      isValid={securityCodeError}
                    />
                  </Col>
                </Row>

                <Form.Item>
                  <div className="steps-action">
                    <ButtonUiKit
                      type="default"
                      className="cancel"
                      icon={<span className="material-icons icon">close</span>}
                      onClick={() => router.push(Routes.Home)}
                    >
                      انصراف
                    </ButtonUiKit>
                    <ButtonUiKit
                      type="default"
                      className="back"
                      icon={<span className="material-icons icon">west</span>}
                      onClick={() => states.setStep(states.step - 1)}
                    >
                      بازگشت
                    </ButtonUiKit>
                    <ButtonUiKit
                      type="primary"
                      htmlType="submit"
                      className="nextPage"
                      icon={<span className="material-icons icon">east</span>}
                      disabled={loading}
                      loading={loading}
                    >
                      ثبت نهایی
                    </ButtonUiKit>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </FinalFormWrapper>
        </Col>
      </Row>
    </>
  )
}

export default FinalRegister
