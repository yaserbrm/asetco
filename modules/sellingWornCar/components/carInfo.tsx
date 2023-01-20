import { FC, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Col, ConfigProvider, Form, Input, Radio, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'

import { DatePicker as DatePickerJalali, JalaliLocaleListener, useJalaliLocaleListener } from 'antd-jalali'
import fa_IR from 'antd/lib/locale/fa_IR'
import dayjs from 'dayjs'

import { ButtonUiKit } from 'components/uiKit/buttons'
import { IModelCar } from 'core/wcs/modelCar'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IWornCars } from 'core/wcs/wornCars'
import { useSellingWornCarService } from 'pages/selling-worn-car/context'
import { OwnerFormWrapper } from '../styles/ownerForm'
import { ISellingWornCarProps } from '../interfaces/sellingWornCar'
import { useSellingWornCarPageState } from '../context/context'
import { carTypes } from '../constant/userTypes'
import { plakTypes } from '../constant/plakTypes'
import { carsStatus } from '../constant/carStatus'
import { docTypes } from '../constant/docTypes'
import { Regex } from '../constant/regex'
import 'moment/locale/fa'
import { IObject } from 'interfaces/IObject'
import { Routes } from 'interfaces/Routes'

const { Option } = Select

interface ISelectedDetail {
  wCars_BrdID?: string
  wCars_ModID?: string
  wCars_UsrType?: string
  wCars_PlkType?: string
  wCars_BldYear?: string
  wCars_State?: string
  wCars_DocType?: string
  wCars_Weight?: number
  wCars_Desc?: string
}

const CarInfo: FC<ISellingWornCarProps> = () => {
  const [loadings, setLoadings] = useState<{ models: boolean; brands: boolean }>({ models: false, brands: false })
  const [modelsCar, setModelsCar] = useState<IModelCar[]>([])
  const [selectModelDisable, setSelectModelDisable] = useState<boolean>(true)
  const [carFormValues, setCarFormsValue] = useState<IObject>({})
  const [selectedWornCarDetail, setSelectedWornCarDetail] = useState<ISelectedDetail>({
    wCars_BrdID: '',
    wCars_ModID: '',
    wCars_UsrType: '',
    wCars_PlkType: '',
    wCars_State: '',
    wCars_DocType: '',
    wCars_Desc: '',
    wCars_Weight: undefined,
  })
  ;(dayjs as any).calendar('jalali')

  const initialDate = (dayjs as any)('1386-01-01', { jalali: true })
  useJalaliLocaleListener()

  const router = useRouter()
  const [carForm] = Form.useForm()

  const states = useSellingWornCarPageState()
  const service = useSellingWornCarService()

  useEffect(() => {
    if (service && service.wornCars)
      service.wornCars
        .getAllWornCarByUserId()
        .then(res => {
          if (res.data && res.data.wornCars) states.setUserWornCar(res.data.wornCars)
        })
        .catch(() => ToastAlert.error('خطا در دریافت خودروهای ثبت شده'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service])

  const handleCarInfo = (values: IObject) => {
    states.handleCar(values)
    states.setStep(3)
  }

  const handleSelectCar = (id: string) => {
    states.setWornCarId(id)
  }
  const setEmptyForm = () => {
    carForm.setFieldsValue({
      wCars_BrdID: null,
      wCars_ModID: null,
      wCars_UsrType: null,
      wCars_PlkType: null,
      wCars_State: null,
      oldCar: null,
      wCars_Desc: null,
      wCars_BldYear: initialDate,
      wCars_Weight: '',
      wCars_DocType: null,
    })
  }

  const handleNewCar = () => {
    setLoadings({ ...loadings, brands: true })
    states.setCarTempValue(undefined)
    states.setWornCarId('')

    setEmptyForm()
    states.setCarFormNew(true)
    states.setCarFormEnable(true)
  }
  const fetchModel = useCallback(
    async (id: string) => {
      try {
        const formData = new FormData()
        formData.append('BrandID', id)
        const { data } = await service.models.getModelByBrandID(formData)
        if (data) setModelsCar(data)
        return { data }
      } catch {
        setLoadings({ ...loadings, models: false })
        ToastAlert.error('خطا در دریافت مدل های برند')
        return { data: [] }
      } finally {
        setSelectModelDisable(false)
        setLoadings({ ...loadings, models: false })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [service.models],
  )

  const handleChangeBrand = async (id: string) => {
    try {
      setLoadings({ ...loadings, models: true })
      setSelectModelDisable(true)
      const { data } = await fetchModel(id.toString())
      carForm.setFieldsValue({ wCars_ModID: undefined })
      return { data }
    } catch (err) {
      return { data: [] }
    }
  }
  useEffect(() => {
    if (states.value.car.wCars_BrdID) {
      fetchModel(states.value.car.wCars_BrdID.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.step, states.value.car.wCars_BrdID])

  useEffect(() => {
    if (states.selectedWornCar?.wCars_ID) createSelectedWornCarList(states.selectedWornCar)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.selectedWornCar])

  const createSelectedWornCarList = (car: IWornCars) => {
    handleChangeBrand(String(car.wCars_BrdID)).then(({ data: carModels }) => {
      const newData = {
        wCars_BrdID: states.brandsCar?.find(brand => brand.brdCar_ID === car.wCars_BrdID)?.brdCar_Name,
        wCars_ModID: carModels?.find(model => model.modCar_ID === car.wCars_ModID)?.modCar_Name,
        wCars_UsrType: carTypes.find(carType => carType.id === String(car.wCars_UsrType))?.typeName,
        wCars_PlkType: plakTypes.find(plakType => plakType.id === String(car.wCars_PlkType))?.plakName,
        wCars_BldYear: car.wCars_BldYear.toString(),
        wCars_State: carsStatus.find(status => status.id === String(car.wCars_State))?.status,
        wCars_DocType: states.carTempValue?.wCars_DocType ? states.carTempValue.wCars_DocType : car.wCars_DocType.toString(),
        wCars_Weight: states.carTempValue?.wCars_Weight ? states.carTempValue.wCars_Weight : car.wCars_Weight,
        wCars_Desc: states.carTempValue?.wCars_Desc ? states.carTempValue.wCars_Desc : car.wCars_Desc,
      }
      carForm.setFieldsValue({
        wCars_DocType: states.carTempValue?.wCars_DocType
          ? states.carTempValue.wCars_DocType
          : car.wCars_DocType
          ? car.wCars_DocType.toString()
          : undefined,

        wCars_Weight: states.carTempValue?.wCars_Weight
          ? states.carTempValue.wCars_Weight
          : car.wCars_Weight
          ? car.wCars_Weight
          : undefined,

        wCars_Desc: states.carTempValue?.wCars_Desc ? states.carTempValue.wCars_Desc : car.wCars_Desc ? car.wCars_Desc : undefined,
      })
      setSelectedWornCarDetail(newData)
    })
  }
  // states.selectedWornCar
  useEffect(() => {
    if (states.value.car.wCars_BldYear) {
      const newValue = states.value.car
      delete newValue.wCars_BldYear
      carForm.setFieldsValue({ ...newValue, wCars_BldYear: (dayjs as any)(states.value.car.wCars_BldYear, { jalali: true }) })
    }
  }, [carForm, states.value.car])
  useEffect(() => {
    if (states.carTempValue) {
      if (states.carTempValue.wCars_BrdID) fetchModel(states.carTempValue.wCars_BrdID)
      carForm.setFieldsValue(states.carTempValue)
    }
  }, [carForm, fetchModel, states.carTempValue, states.step])
  return (
    <Row justify="center">
      <Col xs={23} sm={20} md={16} lg={15} xl={13}>
        <OwnerFormWrapper>
          <div className="ownerForm">
            <Form name="carInfo" form={carForm} autoComplete="off" onFinish={handleCarInfo}>
              <div className="title-responsive">
                <span className="material-icons icon back-responsive" onClick={() => states.setStep(1)}>
                  west
                </span>
                <h1 className="ownerFormTitle">ثبت اطلاعات خودروی فرسوده</h1>
              </div>
              <p className="car-form-description">
                .در صورتی قبلا برای این خودرو ، فرم استعلام قیمت پر کرده اید ، از لیست زیر ، خودرو را انتخاب کنید
              </p>
              <div dir="rtl" className="new-car-box">
                <ButtonUiKit
                  type="default"
                  className="new-car-btn"
                  icon={<span className="material-icons icon">add</span>}
                  onClick={() => handleNewCar()}
                >
                  خودروی جدید
                </ButtonUiKit>
              </div>
              <div dir="rtl" className="mt-4">
                <Form.Item
                  name="wCars_SellType"
                  label=""
                  initialValue={1}
                  rules={[{ required: true, message: 'لطفا نوع فروش را انتخاب کنید' }]}
                >
                  <Radio.Group>
                    <Radio value={0} className="block">
                      متقاضی طرح جایگزینی خودرو هستم
                    </Radio>
                    <Radio value={1} className="my-2">
                      متقاضی فروش نقدی خودرو هستم
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div dir="rtl" className="select-car-box">
                <Form.Item
                  label="لیست خودرو های شما"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  name="oldCar"
                  initialValue={states.wornCarId}
                  className="flex items-end"
                >
                  <Select
                    size="large"
                    placeholder="انتخاب کنید"
                    notFoundContent="خودرویی ثبت نشده است"
                    className=" owner-form-input"
                    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                    onChange={handleSelectCar}
                  >
                    {states.userWornCar.map((wornCar, index) => (
                      <Option value={wornCar.wCars_Id} key={index}>
                        {wornCar.wCars_Name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              {states.carFormEnable && (
                <Row gutter={8} dir="rtl" className="ownerFormRow">
                  <Col xs={24} md={12}>
                    {states.carFormNew ? (
                      <Form.Item
                        label="سیستم (برند)"
                        name="wCars_BrdID"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'لطفا  نام برند را انتخاب نمایید' }]}
                      >
                        <Select
                          showSearch
                          size="large"
                          placeholder="برند"
                          filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                          onChange={handleChangeBrand}
                          className="owner-form-input"
                        >
                          {states.brandsCar.map(brand => (
                            <Option key={brand.brdCar_ID} value={brand.brdCar_ID}>
                              {brand.brdCar_Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="سیستم (برند)" labelCol={{ span: 24 }}>
                        <p>{selectedWornCarDetail.wCars_BrdID}</p>
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={24} md={12}>
                    {states.carFormNew ? (
                      <Form.Item
                        label="تیپ (کلاس)"
                        name="wCars_ModID"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'لطفا  مدل خودرو را انتخاب نمایید' }]}
                      >
                        <Select
                          className="owner-form-input"
                          showSearch
                          disabled={selectModelDisable}
                          loading={loadings.models}
                          size="large"
                          placeholder="مدل"
                        >
                          {modelsCar.map(model => (
                            <Option key={model.modCar_ID} value={model.modCar_ID}>
                              {model.modCar_Name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="تیپ (کلاس)" labelCol={{ span: 24 }}>
                        <p>{selectedWornCarDetail.wCars_ModID}</p>
                      </Form.Item>
                    )}
                  </Col>

                  <Col xs={24} md={12}>
                    {states.carFormNew ? (
                      <Form.Item
                        label="نوع (کاربری خودرو)"
                        name="wCars_UsrType"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'لطفا نوع کاربری خودرو را انتخاب نمایید' }]}
                      >
                        <Select className="owner-form-input" showSearch size="large" placeholder="کاربری">
                          {carTypes.map((carType, index) => (
                            <Option value={carType.id} key={index}>
                              {carType.typeName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="نوع (کاربری خودرو)" labelCol={{ span: 24 }}>
                        <p>{selectedWornCarDetail.wCars_UsrType}</p>
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={24} md={12}>
                    {states.carFormNew ? (
                      <Form.Item
                        label="نوع پلاک"
                        name="wCars_PlkType"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'لطفا  نوع پلاک را انتخاب نمایید' }]}
                      >
                        <Select showSearch size="large" placeholder="نوع پلاک" className="owner-form-input">
                          {plakTypes.map((plakType, index) => (
                            <Option value={plakType.id} key={index}>
                              {plakType.plakName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="نوع پلاک" labelCol={{ span: 24 }}>
                        <p>{selectedWornCarDetail.wCars_PlkType}</p>
                      </Form.Item>
                    )}
                  </Col>

                  <Col xs={24} md={12}>
                    {states.carFormNew ? (
                      <ConfigProvider locale={fa_IR}>
                        <JalaliLocaleListener />
                        <Form.Item
                          label="مدل (سال ساخت)"
                          name="wCars_BldYear"
                          labelCol={{ span: 24 }}
                          rules={[{ required: true, message: 'سال ساخت الزامی است' }]}
                          initialValue={initialDate}
                        >
                          <DatePickerJalali
                            placeholder="سال ساخت"
                            className="owner-form-input date-input"
                            picker="year"
                            disabledDate={(date: IObject) => {
                              return date.$jy > 1386
                            }}
                          />
                        </Form.Item>
                      </ConfigProvider>
                    ) : (
                      <Form.Item label="مدل (سال ساخت)" labelCol={{ span: 24 }}>
                        <p>{selectedWornCarDetail.wCars_BldYear}</p>
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={24} md={12}>
                    {states.carFormNew ? (
                      <Form.Item
                        label="وضعیت خودرو"
                        name="wCars_State"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: 'لطفا وضعیت خودرو  را انتخاب نمایید' }]}
                      >
                        <Select showSearch size="large" placeholder="وضعیت" className="owner-form-input">
                          {carsStatus.map((status, index) => (
                            <Option value={status.id} key={index}>
                              {status.status}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="وضعیت خودرو" labelCol={{ span: 24 }}>
                        <p>{selectedWornCarDetail.wCars_State}</p>
                      </Form.Item>
                    )}
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      className="docTypeFormItem"
                      label="نوع سند"
                      name="wCars_DocType"
                      labelCol={{ span: 24 }}
                      rules={[{ required: true, message: 'لطفا نوع سند خودرو  را انتخاب کنید' }]}
                      initialValue={states.value.car.wCars_DocType}
                    >
                      <Select size="large" placeholder="نوع سند" className="owner-form-input ">
                        {docTypes.map((doc, index) => (
                          <Option value={doc.id} key={index}>
                            {doc.docName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="تناژ برحسب کیلوگرم" name="wCars_Weight" labelCol={{ span: 24 }}>
                      <Input
                        type="text"
                        className="owner-form-input"
                        placeholder="مثلا 4500"
                        onKeyPress={event => {
                          if (!Regex.number.test(event.key)) {
                            event.preventDefault()
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="wCars_Desc" label="توضیحات" labelCol={{ span: 24 }}>
                      <TextArea rows={5} showCount maxLength={500} />
                    </Form.Item>
                  </Col>
                </Row>
              )}

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
                    onClick={() => {
                      states.setCarTempValue(carForm.getFieldsValue())
                      states.setStep(1)
                    }}
                  >
                    بازگشت
                  </ButtonUiKit>
                  <ButtonUiKit
                    type="primary"
                    htmlType="submit"
                    className="nextPage"
                    icon={<span className="material-icons icon">east</span>}
                    disabled={!states.carFormEnable}
                    onClick={() => {
                      states.setCarTempValue(carForm.getFieldsValue())
                    }}
                  >
                    مرحله بعدی
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

export default CarInfo
