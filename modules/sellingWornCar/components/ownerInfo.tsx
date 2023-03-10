import { Col, Form, Input, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { useRouter } from 'next/router'
import { useSellingWornCarService } from 'pages/selling-worn-car/context'
import { FC, useCallback, useEffect, useState } from 'react'
import { ISellingWornCarProps } from '../interfaces/sellingWornCar'
import { OwnerFormWrapper } from '../styles/ownerForm'
import { Regex } from '../constant/regex'
import { useSellingWornCarPageState } from '../context/context'
import { IOwners } from 'core/wcs/owners'
import { usersSelector } from 'store/selectors'
import { useSelector } from 'react-redux'
import { ICity } from 'core/wcs/city'
import { Routes } from 'interfaces/Routes'

const { Option } = Select

const OwnerInfo: FC<ISellingWornCarProps> = () => {
  const [loading, setLoading] = useState<{ city: boolean }>({ city: false })
  const [cities, setCities] = useState<ICity[]>([])
  const [selectCityDisable, setSelectCityDisable] = useState<boolean>(true)

  const [ownerForm] = Form.useForm()
  const router = useRouter()
  const userInfo = useSelector(usersSelector)
  const service = useSellingWornCarService()
  const states = useSellingWornCarPageState()

  const handleOwnerInfo = (values: IOwners) => {
    states.handleOwner(values)
    states.setStep(2)
  }

  const fetchCities = useCallback(
    async (id: string) => {
      const formData = new FormData()
      formData.append('PrviceID', id)
      service?.cities
        .getByProvinceID(formData)
        .then(res => {
          if (res.data) {
            setCities(res.data)
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setSelectCityDisable(false)
          setLoading({ ...loading, city: false })
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [service?.cities],
  )

  const handleOwnerChangeProv = (id: string) => {
    setLoading({ ...loading, city: true })
    fetchCities(id.toString())
    ownerForm.setFieldsValue({ city: undefined })
  }

  useEffect(() => {
    if (states.value.owner.own_ProvncId && service?.cities) {
      fetchCities(states.value.owner.own_ProvncId.toString())
      ownerForm.setFieldsValue(states.value.owner)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.step, states.value.owner.own_ProvncId, service?.cities])

  useEffect(() => {
    if (!states.value.owner.own_FName && userInfo.userInfo) {
      if (userInfo.userInfo.usr_ProvID && userInfo.userInfo.usr_ProvID > 0) fetchCities(userInfo.userInfo.usr_ProvID.toString())
      ownerForm.setFieldsValue({
        own_FName: userInfo.userInfo?.usr_FName,
        own_LName: userInfo.userInfo?.usr_LName,
        own_IdenNumber: userInfo.userInfo?.usr_IdentNum,
        own_ShbaNum: userInfo.ownerInfo?.own_ShbaNum,
        own_Tell: userInfo.ownerInfo?.own_Tell,
        own_ProvncId: userInfo.userInfo.usr_ProvID && userInfo.userInfo.usr_ProvID > 0 ? userInfo.userInfo.usr_ProvID : null,
        own_cityId: userInfo.userInfo.usr_CtyID && userInfo.userInfo.usr_CtyID > 0 ? userInfo.userInfo.usr_CtyID : null,
        own_Desc: userInfo.ownerInfo?.own_Desc,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <Row justify="center" align="middle">
      <Col xs={23} sm={20} md={16} lg={15} xl={13}>
        <OwnerFormWrapper>
          <div className="ownerForm">
            <Form name="sellingWornCar" form={ownerForm} initialValues={userInfo.userInfo} autoComplete="off" onFinish={handleOwnerInfo}>
              <h1 className="ownerFormTitle">?????? ???????????? ???????? ???????????? ????????????</h1>

              <Row gutter={24} dir="rtl" className="ownerFormRow">
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="??????"
                    name="own_FName"
                    labelCol={{ span: 24 }}
                    className="owner-form-item"
                    initialValue={userInfo.userInfo?.usr_FName}
                    rules={[{ required: true, message: '????????  ?????? ???? ???????? ????????????' }]}
                  >
                    <Input type="text" size="large" className="owner-form-input" placeholder="???????? ??????" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="?????? ????????????????"
                    name="own_LName"
                    initialValue={userInfo.userInfo?.usr_LName}
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: '???????? ?????? ???????????????? ???? ???????? ????????????' }]}
                  >
                    <Input type="text" size="large" className="owner-form-input" placeholder="???????? ????????" />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="??????????"
                    name="own_IdenNumber"
                    labelCol={{ span: 24 }}
                    initialValue={userInfo.userInfo?.usr_IdentNum}
                    rules={[
                      { required: true, message: '????????  ???? ?????? ???? ???????? ????????????' },
                      { min: 10, message: '???? ?????? ?????????? ???????? ???? 10 ?????? ????????' },
                      { max: 10, message: '???? ?????? ?????????? ?????????? ???? 10 ?????? ????????' },
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      maxLength={10}
                      minLength={10}
                      className="owner-form-input"
                      placeholder="???????? 2093067451"
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
                    label="?????????? ??????"
                    name="own_ShbaNum"
                    labelCol={{ span: 24 }}
                    initialValue={userInfo.ownerInfo?.own_ShbaNum}
                    rules={[
                      { required: true, message: '???????? ?????????? ?????? ???? ???????? ????????????' },
                      { min: 26, message: '?????????? ?????? ?????????? ???????? ???? 26 ?????????????? ????????' },
                      { max: 26, message: '?????????? ?????? ?????????? ?????????? ???? 26 ?????????????? ????????' },
                      () => ({
                        validator(_, value) {
                          if (!value || Regex.sheba.test(value)) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('???????? ?????????? ?????? ???????????? ??????'))
                        },
                      }),
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      minLength={26}
                      maxLength={26}
                      className="owner-form-input"
                      placeholder="IR040120000000005098100222"
                    />
                  </Form.Item>
                </Col>

                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Form.Item
                    label="???????? ????????"
                    name="own_Tell"
                    initialValue={userInfo.ownerInfo?.own_Tell}
                    labelCol={{ span: 24 }}
                    rules={[
                      { min: 11, message: ' ???????? ???????? ?????????? ???????? ???? 11 ?????? ????????' },
                      { max: 11, message: ' ???????? ???????? ?????????? ?????????? ???? 11 ?????? ????????' },
                    ]}
                  >
                    <Input
                      type="text"
                      size="large"
                      maxLength={11}
                      minLength={11}
                      className="owner-form-input"
                      placeholder="???????? 01133344567"
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
                    label="???????? ??????????"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: '???????? ?????????? ?????????? ???? ???????? ????????????' }]}
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
                    label="??????????"
                    name="own_ProvncId"
                    initialValue={
                      userInfo.userInfo?.usr_ProvID && userInfo.userInfo?.usr_ProvID !== -1 ? userInfo.userInfo?.usr_ProvID : undefined
                    }
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: '???????? ??????????  ???? ???????????? ????????' }]}
                  >
                    <Select
                      showSearch
                      className="owner-form-input"
                      size="large"
                      placeholder="??????????"
                      filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                      onChange={handleOwnerChangeProv}
                    >
                      {states.provinces?.map(prov => (
                        <Option key={prov.provi_ID} value={prov.provi_ID}>
                          {prov.provi_Name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 12 }}>
                  <Form.Item
                    label="??????"
                    name="own_cityId"
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: '???????? ?????? ???? ???????????? ????????' }]}
                  >
                    <Select
                      showSearch
                      className="owner-form-input"
                      disabled={selectCityDisable}
                      loading={loading.city}
                      size="large"
                      filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                      placeholder="??????"
                    >
                      {cities.map(city => (
                        <Option key={city.cty_ID} value={city.cty_ID}>
                          {city.cty_Name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="own_Desc" label="??????????????" labelCol={{ span: 24 }} initialValue={userInfo.ownerInfo?.own_Desc}>
                    <TextArea rows={5} className="own-textArea" showCount maxLength={500} />
                  </Form.Item>
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
                    ????????????
                  </ButtonUiKit>
                  <ButtonUiKit
                    type="primary"
                    htmlType="submit"
                    className="nextPage"
                    icon={<span className="material-icons icon">east</span>}
                  >
                    ?????????? ????????
                  </ButtonUiKit>
                </div>
              </Form.Item>
            </Form>
          </div>
        </OwnerFormWrapper>
      </Col>
    </Row>
  )
}

export default OwnerInfo
