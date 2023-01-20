import { Col, Form, Input, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { OwnerFormOrderWrapper } from '../styles/OwnerFormWrapper'
import { IOwners } from 'core/wcs/owners'
import { cartSelector, usersSelector } from 'store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { ICity } from 'core/wcs/city'
import { Regex } from 'modules/sellingWornCar/constant/regex'
import { IProvince } from 'core/wcs/province'
import { useOrderServiceContext } from 'pages/order/context'
import { IOrder, IOrderArg } from 'core/wcs/order'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { clearCart } from 'store/actions/cart.action'
import { cartItemsNameInLocalStorage } from 'constants/localItem'
import { saveUser } from 'store/actions/global.action'
import { IObject } from 'interfaces/IObject'
import { Routes } from 'interfaces/Routes'
import { useUnauthorizedLogOut } from 'hooks/logOut'

const { Option } = Select
type IOwnerPick = Pick<IOwners, 'own_Desc' | 'own_FName' | 'own_LName' | 'own_Tell' | 'own_ProvncId' | 'own_cityId'>

interface IFormValue extends IOwnerPick {
  zipCode: number
}

const OwnerOrderInfo: FC<{ province: IProvince[]; setSussesModal: Dispatch<SetStateAction<boolean>> }> = ({ province, setSussesModal }) => {
  const [loading, setLoading] = useState<{ city: boolean; submitForm: { payment: boolean; insertOrder: boolean } }>({
    city: false,
    submitForm: { payment: false, insertOrder: false },
  })
  const [cities, setCities] = useState<ICity[]>([])
  const [selectCityDisable, setSelectCityDisable] = useState<boolean>(true)
  const [paymentType, setPaymentType] = useState<'payment' | 'insertOrder'>()
  const [ownerForm] = Form.useForm()
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const router = useRouter()
  const userInfo = useSelector(usersSelector)
  const service = useOrderServiceContext()
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch()
  const { unauthorizedLogOut } = useUnauthorizedLogOut()

  const splitCharacter = '----'
  useEffect(() => {
    cart.forEach(ord => setTotalPrice(pervPrice => pervPrice + ord.product.p_Price))
  }, [cart])

  const handleOwnerInfo = useCallback(
    (values: IFormValue) => {
      if (!paymentType) return
      const orders: IOrder[] = cart.map(order => ({ pCount: order.count, pid: order.product.p_ID }))
      const arg: IOrderArg = {
        city: values.own_cityId,
        address: values.own_Desc.concat(splitCharacter.concat(values.zipCode.toString())),
        fName: values.own_FName,
        lName: values.own_LName,
        province: values.own_ProvncId,
        tell: values.own_Tell,
        ordersProducts: orders,
      }
      if (paymentType === 'payment') {
        setLoading(perv => ({ ...perv, submitForm: { insertOrder: false, payment: true } }))

        service.paymentService
          .payment(arg)
          .then(res => {
            if (res.success && res.data) {
              if (res.data.status === 200) {
                const newUserInfo = {
                  ...userInfo.userInfo,
                  usr_CtyID: values.own_cityId,
                  usr_FName: values.own_FName,
                  usr_LName: values.own_LName,
                  usr_ProvID: values.own_ProvncId,
                  usr_ProvName:
                    values.own_ProvncId !== userInfo.userInfo?.usr_ProvID
                      ? province.find(prov => prov.provi_ID === values.own_ProvncId)?.provi_Name
                      : userInfo.userInfo?.usr_ProvName,
                  usr_CtyName:
                    values.own_cityId !== userInfo.userInfo?.usr_CtyID
                      ? cities.find(city => city.cty_ID === values.own_cityId)?.cty_Name
                      : userInfo.userInfo?.usr_CtyName,
                }
                const newOwner: IObject = {
                  ...userInfo.ownerInfo,
                  own_Tell: values.own_Tell,
                }
                if (values.own_Desc) {
                  newOwner.own_Desc = values.own_Desc
                }

                dispatch(
                  saveUser({
                    ...userInfo,
                    userInfo: { ...userInfo.userInfo, ...newUserInfo },
                    ownerInfo: { ...userInfo.ownerInfo, ...newOwner },
                  }),
                )
                router.replace(res.data.url)
              } else if (res.data.message === 'Unauthorized') {
                unauthorizedLogOut('/login?returnUrl=' + Routes.cart.substring(1))
              } else {
                ToastAlert.error('خطا در ثبت سفارش')
              }
            } else {
              ToastAlert.error('خطا در ثبت سفارش')
            }
          })
          .catch(err => {
            ToastAlert.error('خطا در ثبت سفارش')
          })
          .finally(() => setLoading(perv => ({ ...perv, submitForm: { insertOrder: false, payment: false } })))
        return
      }
      if (paymentType === 'insertOrder') {
        setLoading(perv => ({ ...perv, submitForm: { insertOrder: true, payment: false } }))

        service.OrderService.orderInsert(arg)
          .then(res => {
            if (res.success && res.data) {
              if (res.data.status === 200) {
                setSussesModal(true)
                dispatch(clearCart(true))
                localStorage.removeItem(cartItemsNameInLocalStorage)
                const newUserInfo = {
                  ...userInfo.userInfo,
                  usr_CtyID: values.own_cityId,
                  usr_FName: values.own_FName,
                  usr_LName: values.own_LName,
                  usr_ProvID: values.own_ProvncId,
                  usr_ProvName:
                    values.own_ProvncId !== userInfo.userInfo?.usr_ProvID
                      ? province.find(prov => prov.provi_ID === values.own_ProvncId)?.provi_Name
                      : userInfo.userInfo?.usr_ProvName,
                  usr_CtyName:
                    values.own_cityId !== userInfo.userInfo?.usr_CtyID
                      ? cities.find(city => city.cty_ID === values.own_cityId)?.cty_Name
                      : userInfo.userInfo?.usr_CtyName,
                }
                const newOwner: IObject = {
                  ...userInfo.ownerInfo,
                  own_Tell: values.own_Tell,
                }
                if (values.own_Desc) {
                  newOwner.own_Desc = values.own_Desc
                }

                dispatch(
                  saveUser({
                    ...userInfo,
                    userInfo: { ...userInfo.userInfo, ...newUserInfo },
                    ownerInfo: { ...userInfo.ownerInfo, ...newOwner },
                  }),
                )
              } else if (res.data.message === 'Unauthorized') {
                unauthorizedLogOut('/login?returnUrl=' + Routes.cart.substring(1))
              } else {
                ToastAlert.error('خطا در ثبت سفارش')
              }
            } else {
              ToastAlert.error('خطا در ثبت سفارش')
            }
          })
          .catch(err => {
            ToastAlert.error('خطا در ثبت سفارش')
          })
          .finally(() => setLoading(perv => ({ ...perv, submitForm: { insertOrder: false, payment: false } })))
        return
      }
    },
    [service, paymentType],
  )

  const fetchCities = useCallback(
    async (id: string) => {
      const formData = new FormData()
      formData.append('PrviceID', id)
      service.cities
        .getByProvinceID(formData)
        .then(res => {
          if (res.data) {
            setCities(res.data)
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setSelectCityDisable(false)
          setLoading(perv => ({ ...perv, city: false }))
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [service?.cities],
  )

  const handleOwnerChangeProv = (id: string) => {
    ownerForm.setFieldsValue({ own_cityId: undefined })
    setLoading(perv => ({ ...perv, city: true }))
    fetchCities(id.toString())
  }

  useEffect(() => {
    if (userInfo.userInfo) {
      if (userInfo.userInfo.usr_ProvID && userInfo.userInfo.usr_ProvID > 0 && service) fetchCities(userInfo.userInfo.usr_ProvID.toString())
      const address = userInfo.userInfo?.usr_Address?.split(splitCharacter)[0] || ''
      const zipCode = userInfo.userInfo?.usr_Address?.split(splitCharacter)[1] || ''
      ownerForm.setFieldsValue({
        own_FName: userInfo.userInfo?.usr_FName,
        own_LName: userInfo.userInfo?.usr_LName,
        own_Tell: userInfo.ownerInfo?.own_Tell,
        own_ProvncId: userInfo.userInfo.usr_ProvID && userInfo.userInfo.usr_ProvID > 0 ? userInfo.userInfo.usr_ProvID : null,
        own_cityId: userInfo.userInfo.usr_CtyID && userInfo.userInfo.usr_CtyID > 0 ? userInfo.userInfo.usr_CtyID : null,
        own_Desc: address,
        zipCode,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, service])

  return (
    <Row justify="center" align="middle">
      <Col xs={23} sm={20} md={16} lg={15} xl={13}>
        <OwnerFormOrderWrapper>
          <div className="ownerForm">
            <Form name="sellingWornCar" form={ownerForm} initialValues={userInfo.userInfo} autoComplete="off" onFinish={handleOwnerInfo}>
              <p className="ownerFormTitle">ثبت مشخصات شما</p>

              <Row gutter={8} dir="rtl" className="ownerFormRow">
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="نام"
                    name="own_FName"
                    labelCol={{ span: 24 }}
                    className="owner-form-item"
                    initialValue={userInfo.userInfo?.usr_FName}
                    rules={[{ required: true, message: 'لطفا  نام را وارد نمایید' }]}
                  >
                    <Input type="text" size="large" className="owner-form-input" placeholder="مثلا علی" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="نام خانوادگی"
                    name="own_LName"
                    initialValue={userInfo.userInfo?.usr_LName}
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا نام خانوادگی را وارد نمایید' }]}
                  >
                    <Input type="text" size="large" className="owner-form-input" placeholder="مثلا علوی" />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Form.Item
                    label="تلفن ثابت"
                    name="own_Tell"
                    initialValue={userInfo.ownerInfo?.own_Tell}
                    labelCol={{ span: 24 }}
                    rules={[
                      { min: 11, message: ' تلفن ثابت نباید کمتر از 11 رقم باشد' },
                      { max: 11, message: ' تلفن ثابت نباید بیشتر از 11 رقم باشد' },
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      maxLength={11}
                      minLength={11}
                      className="owner-form-input"
                      placeholder="مثلا 01133344567"
                      onKeyPress={event => {
                        if (!Regex.number.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="تلفن همراه"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا شماره همراه را وارد نمایید' }]}
                  >
                    <Input
                      type="text"
                      size="large"
                      readOnly
                      disabled
                      className="owner-form-input"
                      value={userInfo.userInfo?.usr_Mobile}
                      placeholder={userInfo.userInfo?.usr_Mobile}
                    />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="استان"
                    name="own_ProvncId"
                    initialValue={
                      userInfo.userInfo?.usr_ProvID && userInfo.userInfo?.usr_ProvID !== -1 ? userInfo.userInfo?.usr_ProvID : undefined
                    }
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا استان  را انتخاب کنید' }]}
                  >
                    <Select
                      showSearch
                      className="owner-form-input"
                      size="large"
                      placeholder="استان"
                      filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                      onChange={handleOwnerChangeProv}
                    >
                      {province?.map(prov => (
                        <Option key={prov.provi_ID} value={prov.provi_ID}>
                          {prov.provi_Name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="شهر"
                    id="own_cityId"
                    name="own_cityId"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'لطفا شهر را انتخاب کنید' }]}
                  >
                    <Select
                      showSearch
                      className="owner-form-input"
                      disabled={selectCityDisable}
                      loading={loading.city}
                      size="large"
                      filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                      placeholder="شهر"
                    >
                      {cities.map(city => (
                        <Option key={city.cty_ID} value={city.cty_ID}>
                          {city.cty_Name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="کدپستی"
                    labelCol={{ span: 24 }}
                    name="zipCode"
                    rules={[{ required: true, message: 'لطفا کدپستی را وارد نمایید' }]}
                  >
                    <Input
                      type="text"
                      size="large"
                      className="owner-form-input"
                      maxLength={10}
                      minLength={10}
                      onKeyPress={event => {
                        if (!Regex.number.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="own_Desc"
                    label="آدرس"
                    labelCol={{ span: 24 }}
                    initialValue={userInfo.ownerInfo?.own_Desc}
                    rules={[{ required: true, message: 'لطفا آدرس را وارد نمایید' }]}
                  >
                    <TextArea rows={5} showCount maxLength={500} placeholder="خیابان - کوچه - پلاک" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <div className="steps-action">
                  <ButtonUiKit
                    type="default"
                    className="cancel"
                    icon={<span className="material-icons icon">close</span>}
                    onClick={() => router.push(Routes.cart)}
                  >
                    انصراف
                  </ButtonUiKit>
                  <ButtonUiKit
                    type="primary"
                    htmlType="submit"
                    className="nextPage"
                    // icon={<span className="material-icons icon">east</span>}
                    loading={loading.submitForm.insertOrder}
                    disabled={loading.submitForm.insertOrder}
                    onClick={() => {
                      setPaymentType('insertOrder')
                    }}
                  >
                    ثبت سفارش
                  </ButtonUiKit>
                  {totalPrice > 0 && (
                    <ButtonUiKit
                      type="primary"
                      htmlType="submit"
                      className="nextPage"
                      onClick={() => {
                        setPaymentType('payment')
                      }}
                      // icon={<span className="material-icons icon">east</span>}
                      loading={loading.submitForm.payment}
                      disabled={loading.submitForm.payment}
                    >
                      پرداخت
                    </ButtonUiKit>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
        </OwnerFormOrderWrapper>
      </Col>
    </Row>
  )
}

export default OwnerOrderInfo
