import { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Col, Form, Input, Row, Select } from 'antd'

import { ButtonUiKit } from 'components/uiKit/buttons'
import { UploadFile } from 'components/uiKit/uploadFile'
import { usersSelector } from 'store/selectors'
import { OwnerProfileWrapper } from './styles/ownerProfileStyle'
import { IProvince } from 'core/wcs/province'
import { ICity } from 'core/wcs/city'
import { useOwnerProfileService } from 'pages/owner-profile/context'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { Regex } from 'modules/sellingWornCar/constant/regex'
import store from 'store'
import { saveUser } from 'store/actions/global.action'
import { IOwnerInfo, IUserInfo } from 'core/wcs/common'
import { useRouter } from 'next/router'
import { IObject } from 'interfaces/IObject'
import { Routes } from 'interfaces/Routes'

const { Option } = Select

const OwnerProfile: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | File | null>(null)
  const [imageError, setImageError] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [provinces, setProvinces] = useState<IProvince[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [selectCityDisable, setSelectCityDisable] = useState<boolean>(true)
  const [provinceName, setProvinceName] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')
  const [userInformationData, setUserInformationData] = useState<IObject>({
    usr_FName: '',
    usr_LName: '',
    usr_IdentNum: '',
    usr_Mobile: '',
    usr_Phone: '',
    usr_ProvName: '',
    usr_CtyName: '',
    usr_Sheba: '',
    usr_Prov_ID: 0,
    usr_Cty_ID: 0,
  })
  const [loadings, setLoadings] = useState<{
    editLoading: boolean
    provincesLoading: boolean
    citiesLoading: boolean
    uploadImage: boolean
  }>({
    editLoading: false,
    provincesLoading: false,
    citiesLoading: false,
    uploadImage: false,
  })

  const [ownerProfileForm] = Form.useForm()
  const ownerService = useOwnerProfileService()
  const userInformation = useSelector(usersSelector)
  const router = useRouter()
  useEffect(() => {
    if (userInformation.userInfo) {
      if (userInformation.userInfo.usr_Img !== '' && userInformation.userInfo.usr_Img)
        setImageUrl(process.env.NEXT_PUBLIC_GOD_FTP_SERVER + Routes.Home + userInformation.userInfo.usr_Img)
      setProvinceName(userInformation.userInfo.usr_ProvName || '')
      setCityName(userInformation.userInfo.usr_CtyName || '')

      setUserInformationData({
        usr_FName: userInformation.userInfo.usr_FName,
        usr_LName: userInformation.userInfo.usr_LName,
        usr_IdentNum: userInformation.userInfo.usr_IdentNum,
        usr_Mobile: userInformation.userInfo.usr_Mobile,
        usr_Phone: userInformation?.ownerInfo?.own_Tell ? userInformation.ownerInfo.own_Tell : '',
        usr_ProvName: userInformation.userInfo.usr_ProvName,
        usr_CtyName: userInformation.userInfo.usr_CtyName,
        usr_Sheba: userInformation?.ownerInfo?.own_ShbaNum,
        usr_Prov_ID: userInformation.userInfo.usr_ProvID,
        usr_Cty_ID: userInformation.userInfo.usr_CtyID,
        usr_Img: userInformation.userInfo.usr_Img,
      })
    } else {
      // router.push(Routes.Home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformation.userInfo])

  const handleCallDispatch = (editFormValues: IObject, imagePath: string) => {
    let updatedUserInfo: Partial<IUserInfo> = {}
    let updatedOwnerInfo: Partial<IOwnerInfo> = {}

    if (Object.keys(editFormValues).length > 0) {
      updatedUserInfo = {
        ...userInformation.userInfo,
        usr_CtyID: editFormValues.Usr_Cty_ID,
        usr_CtyName: cityName,
        usr_FName: editFormValues.Usr_FName,
        usr_IdentNum: editFormValues.Usr_IdentNum,
        usr_LName: editFormValues.Usr_LName,
        usr_ProvID: editFormValues.Usr_Prov_ID,
        usr_ProvName: provinceName,
      }

      updatedOwnerInfo = {
        own_ShbaNum: editFormValues.Usr_Sheba,
        own_Tell: editFormValues.Usr_Phone,
      }
    } else {
      updatedUserInfo = {
        ...userInformation.userInfo,
        usr_Img: imagePath,
      }
      updatedOwnerInfo = userInformation.ownerInfo!
    }

    store.dispatch(
      saveUser({
        ...userInformation,
        userInfo: updatedUserInfo,
        ownerInfo: updatedOwnerInfo,
      }),
    )
  }

  const handleUpdateProfile = (formData: FormData, values: IObject) => {
    ownerService.common
      .updateUserProfile(formData)
      .then(res => {
        if (res.success && res.data && res.data.message === 'Sucess') {
          handleCallDispatch(values, '')
          ToastAlert.success('اطلاعات کاربر با موفقیت ویرایش شد.')
          setEditMode(false)
        } else {
          ToastAlert.error('خطا در ویرایش اطلاعات کاربر')
        }
      })
      .catch(() => {
        ToastAlert.error('خطا در ویرایش اطلاعات کاربر')
      })
  }

  const onFinish = (values: IObject) => {
    const formData = new FormData()
    formData.append('FName', values.Usr_FName)
    formData.append('LName', values.Usr_LName)
    formData.append('ShebaNum', values.Usr_Sheba)
    formData.append('IdentNum', values.Usr_IdentNum)
    formData.append('Tell', values.Usr_Phone)
    formData.append('ProvID', values.Usr_Prov_ID)
    formData.append('CityId', values.Usr_Cty_ID)
    handleUpdateProfile(formData, values)
  }

  const handleFormFieldsValue = () => {
    ownerProfileForm.setFieldsValue({
      Usr_FName: userInformationData?.usr_FName,
      Usr_LName: userInformationData.usr_LName,
      Usr_IdentNum: userInformationData.usr_IdentNum,
      Usr_Mobile: userInformationData.usr_Mobile,
      Usr_Phone: userInformationData?.usr_Phone ? userInformationData?.usr_Phone : '',
      Usr_ProvName: userInformationData.usr_ProvName,
      Usr_CtyName: userInformationData.usr_CtyName,
      Usr_Sheba: userInformationData.usr_Sheba,
      Usr_Prov_ID: userInformationData.usr_Prov_ID > 0 ? userInformationData.usr_Prov_ID : null,
      Usr_Cty_ID: userInformationData.usr_Cty_ID > 0 ? userInformationData.usr_Cty_ID : null,
    })
  }

  const handelEditMode = () => {
    setEditMode(!editMode)
  }
  const handleChangeProvince = (id: string) => {
    const selectedProvinceName = provinces.find(province => province.provi_ID === Number(id))?.provi_Name
    setProvinceName(selectedProvinceName || '')

    ownerProfileForm.setFieldsValue({
      Usr_Cty_ID: null,
    })
    setSelectCityDisable(true)
    setLoadings({ ...loadings, citiesLoading: true })
    fetchCities(id)
  }
  const handleChangeCity = (id: string) => {
    const selectedCityName = cities.find(city => city.cty_ID === Number(id))?.cty_Name
    setCityName(selectedCityName || '')
  }

  const fetchProvinces = () => {
    if (ownerService && ownerService.provinces) {
      ownerService.provinces
        .getAllProvince()
        .then(res => {
          if (res.success && res.data) {
            setProvinces(res.data)
            setLoadings({ ...loadings, citiesLoading: true })
          }
        })
        .catch(() => ToastAlert.error('خطا در دریافت لیست استان ها'))
        .finally(() => {
          setLoadings({ ...loadings, provincesLoading: false })
        })
    }
  }

  const fetchCities = (id: string) => {
    const formData = new FormData()
    formData.append('PrviceID', id)
    ownerService.cities
      .getByProvinceID(formData)
      .then(res => {
        if (res.success && res.data) {
          setCities(res.data)
          setSelectCityDisable(false)
        }
      })
      .catch(() => ToastAlert.error('خطا در دریافت لیست شهرها'))
      .finally(() => {
        setLoadings({ ...loadings, citiesLoading: false })
      })
  }

  async function handleUploadUserImage(image: File) {
    setLoadings({ ...loadings, uploadImage: true })
    const formData = new FormData()
    formData.append('IFileUser', image)

    setImageError(false)

    try {
      const userUploadImageResult = (await ownerService.common.uploadOwnerImage(formData)).data

      if (userUploadImageResult?.message === 'Sucess') {
        ToastAlert.success('آپلود تصویر با موفقیت انجام گردید.')
        setImageUrl(process.env.NEXT_PUBLIC_GOD_FTP_SERVER + Routes.Home + userUploadImageResult.path)
        handleCallDispatch({}, userUploadImageResult.path)
        setLoadings({ ...loadings, uploadImage: false })
        return true
      } else {
        ToastAlert.error('خطا در آپلود تصویر.')
        userInformationData?.usr_Img && userInformationData?.usr_Img !== ''
          ? setImageUrl(process.env.REACT_APP_GOD_FTP_SERVER + Routes.Home + userInformationData?.usr_Img)
          : setImageUrl('')
        setUserInformationData({
          ...userInformationData,
          usr_Img: '',
        })
        setLoadings({ ...loadings, uploadImage: false })
        return false
      }
    } catch {
      setLoadings({ ...loadings, uploadImage: false })
      ToastAlert.error('خطا در آپلود تصویر.')
      return false
    }
  }

  async function handleDeleteUserImage() {
    try {
      const userDeleteImageResult = (await ownerService.common.deleteOwnerImage()).data
      if (userDeleteImageResult?.message === 'Sucess') {
        ToastAlert.success('حذف تصویر با موفقیت انجام گردید.')
        handleCallDispatch({}, '')
        return true
      } else {
        ToastAlert.error('خطا در حذف تصویر.')
        userInformationData?.usr_Img && userInformationData?.usr_Img !== ''
          ? setImageUrl(process.env.REACT_APP_GOD_FTP_SERVER + 'Root/Images/Users/' + userInformationData?.usr_Img)
          : setImageUrl('')
        return false
      }
    } catch {
      ToastAlert.error('خطا در حذف تصویر.')
      return false
    }
  }

  useEffect(() => {
    if (ownerService) fetchProvinces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerService])

  useEffect(() => {
    if (userInformationData && userInformationData.usr_Prov_ID > 0 && ownerService) fetchCities(userInformationData.usr_Prov_ID.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformationData, ownerService])

  useEffect(() => {
    if (userInformationData) handleFormFieldsValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInformationData])

  return (
    <>
      <Row align="middle" justify="center" className="mt-[48px]">
        <Col xs={23} md={20}>
          <OwnerProfileWrapper>
            <div>{editMode ? <p className="title">ویرایش اطلاعات</p> : <h1 className="title">اطلاعات کاربری</h1>}</div>
            <div className="edit-btn-box">
              {!editMode ? (
                <ButtonUiKit
                  onClick={handelEditMode}
                  icon={<span className="material-icons icon">edit</span>}
                  type="default"
                  className="edit-btn"
                >
                  ویرایش اطلاعات
                </ButtonUiKit>
              ) : (
                <span>لطفا پس از ثبت یا تغییر اطلاعات کاربری از گزینه {'"ذخیره"'} استفاده کنید</span>
              )}
            </div>

            <Form
              name="owner-profile-form"
              onFinish={onFinish}
              initialValues={userInformation}
              form={ownerProfileForm}
              labelCol={{ span: 24 }}
              layout="vertical"
              autoComplete="off"
              dir="rtl"
            >
              <Row gutter={16}>
                {!editMode && (
                  <Col className="gutter-row upload" span={24} dir="rtl">
                    <Form.Item name="upload">
                      <UploadFile
                        loading={loadings.uploadImage}
                        setImageUrl={setImageUrl}
                        imageError={false}
                        imageUrl={imageUrl}
                        hasSendButton={true}
                        onDelete={handleDeleteUserImage}
                        onSelect={handleUploadUserImage}
                      />
                    </Form.Item>
                  </Col>
                )}
                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="نام "
                      name="Usr_FName"
                      rules={[
                        {
                          required: true,
                          message: 'نام  الزامی است',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  ) : (
                    <Form.Item label="نام" className="form-item">
                      <span>{userInformationData?.usr_FName!}</span>
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="نام خانوادگی "
                      name="Usr_LName"
                      rules={[
                        {
                          required: true,
                          message: ' نام خانوادگی الزامی است',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  ) : (
                    <Form.Item label="نام خانوادگی">
                      <span>{userInformationData?.usr_LName}</span>
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="شماره شبا"
                      name="Usr_Sheba"
                      rules={[
                        {
                          required: true,
                          message: 'شماره شبا الزامی است',
                        },
                        () => ({
                          validator(_, value) {
                            if (!value || Regex.sheba.test(value)) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('فرمت شماره شبا اشتباه است'))
                          },
                        }),
                      ]}
                    >
                      <Input minLength={26} maxLength={26} placeholder="IR040120000000005098100222" />
                    </Form.Item>
                  ) : (
                    <Form.Item label="شماره شبا">
                      <span>{userInformationData?.usr_Sheba}</span>
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="کد ملی"
                      name="Usr_IdentNum"
                      rules={[
                        {
                          required: true,
                          message: ' کد ملی الزامی است',
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="مثلا 2093067451"
                        onKeyPress={event => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault()
                          }
                        }}
                      />
                    </Form.Item>
                  ) : (
                    <Form.Item label="کد ملی">
                      {userInformationData !== undefined && <span>{userInformationData.usr_IdentNum}</span>}
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item label="شماره همراه">
                      {userInformationData !== undefined && <span className="input-readonly-span">{userInformationData.usr_Mobile}</span>}
                    </Form.Item>
                  ) : (
                    <Form.Item label="شماره همراه">
                      {userInformationData !== undefined && <span>{userInformationData.usr_Mobile}</span>}
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="تلفن ثابت"
                      name="Usr_Phone"
                      rules={[
                        {
                          required: true,
                          message: 'نام کاربری الزامی است',
                        },
                      ]}
                    >
                      <Input placeholder="مثلا 01133344567" />
                    </Form.Item>
                  ) : (
                    <Form.Item label="تلفن ثابت">
                      <span>{userInformationData?.usr_Phone}</span>
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="استان"
                      name="Usr_Prov_ID"
                      rules={[
                        {
                          required: true,
                          message: 'استان الزامی است',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="انتخاب"
                        loading={loadings.provincesLoading}
                        onChange={handleChangeProvince}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                      >
                        {provinces.map(prov => (
                          <Option key={prov.provi_ID} value={prov.provi_ID} className="text-right">
                            {prov.provi_Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item label="استان">
                      {userInformationData !== undefined && <span>{userInformationData.usr_ProvName}</span>}
                    </Form.Item>
                  )}
                </Col>

                <Col className={`${!editMode && 'borderCol'} gutter-row `} xs={24} sm={24} md={24} lg={8} xl={8}>
                  {editMode ? (
                    <Form.Item
                      label="شهر "
                      name="Usr_Cty_ID"
                      rules={[
                        {
                          required: true,
                          message: 'شهر الزامی است',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="انتخاب"
                        disabled={selectCityDisable}
                        loading={loadings.citiesLoading}
                        optionFilterProp="children"
                        onChange={handleChangeCity}
                        filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                      >
                        {cities.map(city => (
                          <Option key={city.cty_ID} value={city.cty_ID} className="text-right">
                            {city.cty_Name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Form.Item label="شهر ">
                      {userInformationData !== undefined && <span>{userInformationData.usr_CtyName}</span>}
                    </Form.Item>
                  )}
                </Col>

                {editMode && (
                  <Col className="gutter-row stepsButton" span={24}>
                    <Form.Item>
                      <div className="steps-action">
                        <ButtonUiKit
                          type="default"
                          htmlType="submit"
                          className="save"
                          loading={loadings.editLoading}
                          icon={<span className="material-icons icon">done</span>}
                        >
                          ذخیره
                        </ButtonUiKit>
                        <ButtonUiKit
                          type="default"
                          onClick={() => {
                            handelEditMode()
                            handleFormFieldsValue()
                          }}
                          className="cancel"
                          icon={<span className="material-icons icon">close</span>}
                        >
                          انصراف
                        </ButtonUiKit>
                      </div>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </OwnerProfileWrapper>
        </Col>
      </Row>
    </>
  )
}

export default OwnerProfile
