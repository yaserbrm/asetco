import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Col, Form, Row, Select, ConfigProvider, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import fa_IR from 'antd/lib/locale/fa_IR'
import TextArea from 'antd/lib/input/TextArea'

import { DatePicker as DatePickerJalali, JalaliLocaleListener, useJalaliLocaleListener } from 'antd-jalali'

import dayjs from 'dayjs'

import { IBrandCar } from 'core/wcs/brandCar'
import { IModelCar } from 'core/wcs/modelCar'
import { IProvince } from 'core/wcs/province'
import { ICity } from 'core/wcs/city'

import { ButtonUiKit } from 'components/uiKit/buttons'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import UploadImage from 'components/uiKit/uploadImage'

import { ButtonContainerStyles, SelectContainerStyled } from 'modules/priceInquiry/style/carInformation'
import { usePriceInquiryContext } from 'pages/price-inquiry/context'
import { EPathNames } from 'interfaces/globalEnums'
import { carUseData, licensePlateTypeData, vehicleConditionData } from '../constant/dummyData'

import 'moment/locale/fa'
import FinlayModal from 'components/uiKit/finlayModal'
import { IObject } from 'interfaces/IObject'

const { Option } = Select

const PriceInquiryCarInformation: FC = () => {
  //const { provinceServices, cityServices, brandCarServices, modelCarServices, inquiryPriceServices } = usePriceInquiryContext()
  const services = usePriceInquiryContext()
  const [priceInquiryWithCarCardForm] = Form.useForm()

  const [provincesData, setProvincesData] = useState<IProvince[]>()
  const [cities, setCities] = useState<ICity[]>()
  const [brandsCar, setBrandsCar] = useState<IBrandCar[]>()
  const [modelsCar, setModelsCar] = useState<IModelCar[]>()
  const [showFinallyModal, setShowFinallyModal] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const [carFileList, setCarFileList] = useState<UploadFile[]>([])
  const [imageError, setImageError] = useState<'sizeError' | 'typeError' | 'success'>('success')

  const router = useRouter()

  const onChange: UploadProps['onChange'] = info => {
    let { fileList: newFileList, file } = info

    setImageError('success')
    newFileList.forEach(file => {
      if (file.size && file.size > 2000000) {
        setImageError('sizeError')
        return
      } else if (file.type && !(file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))) {
        setImageError('typeError')
        return
      }
    })
    setCarFileList(newFileList)
  }

  //loading model-cities , For when the province or brand is selected
  const [selectLoading, setSelectLoading] = useState<{ city: boolean; model: boolean }>({
    city: false,
    model: false,
  })
  //disable model-cities , For when the province or brand is not selected
  const [disableSelect, setDisableSelect] = useState<{ city: boolean; model: boolean }>({
    city: true,
    model: true,
  })

  ;(dayjs as any).calendar('jalali')

  const initialDate = (dayjs as any)('1386-01-01', { jalali: true })
  useJalaliLocaleListener()

  useEffect(() => {
    priceInquiryWithCarCardForm.setFieldsValue({ yearsOfConstruction: initialDate })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //REQUESTS
  const getProvinces = async () => {
    try {
      const { data } = await services.provinceServices.getAllProvince()
      if (!data) {
        ToastAlert.error('خطا در دریافت لیست استان ها')
        return
      }
      setProvincesData(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست استان ها')
    }
  }

  const getCitiesByPrvID = async (prv_ID: string) => {
    const formData = new FormData()
    formData.append('PrviceID', prv_ID)

    try {
      const { data } = await services.cityServices.getByProvinceID(formData)

      if (!data) {
        ToastAlert.error('خطا در دریافت لیست شهر ها')
        return
      }

      setCities(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست شهر ها')
    }

    setSelectLoading({ ...selectLoading, city: false })
  }

  const getBrandsCar = async () => {
    try {
      const { data } = await services.brandCarServices.getAllBrand()
      if (!data) {
        ToastAlert.error('خطا در دریافت لیست  برند ها')
        return
      }

      setBrandsCar(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست  برند ها')
    }
  }

  const getModelCar = async (brandID: string) => {
    const formData = new FormData()
    formData.append('BrandID', brandID)

    try {
      const { data } = await services.modelCarServices.getModelByBrandID(formData)

      if (!data) {
        ToastAlert.error('خطا در دریافت لیست مدل های خودرو')
        return
      }

      setModelsCar(data)
    } catch {
      ToastAlert.error('خطا در دریافت لیست مدل های خودرو')
    }

    setSelectLoading({ ...selectLoading, model: false })
  }

  const inquiryPriceRequest = async (formData: FormData) => {
    setSubmitLoading(true)
    try {
      const { data: respond } = await services.inquiryPriceServices.priceInquiry(formData)
      if (respond?.status == 200) {
        setShowFinallyModal(true)
        ToastAlert.success('استعلام با موفقیت انجام شد')
      } else ToastAlert.error('خطا در ارسال اطلاعات')
    } catch {
      ToastAlert.error('خطا در ارسال اطلاعات')
    } finally {
      setSubmitLoading(false)
    }
  }

  //HANDLE CHANGE SELECTS
  const handelProvinceChange = (_: string, data: { key: string; value: string; children: string }) => {
    setDisableSelect({ ...disableSelect, city: false })
    priceInquiryWithCarCardForm.setFieldsValue({ city: undefined })
    setSelectLoading({ ...selectLoading, city: true })
    getCitiesByPrvID(data.key)
  }

  const handelBrandChange = (_: string, data: { key: string; value: string; children: string }) => {
    setDisableSelect({ ...disableSelect, model: false })
    priceInquiryWithCarCardForm.setFieldsValue({ model: undefined })
    setSelectLoading({ ...selectLoading, model: true })
    getModelCar(data?.key)
  }

  useEffect(() => {
    if (services) {
      getProvinces()
      getBrandsCar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services])

  const onInquiry = (data: IObject) => {
    const formData = new FormData()
    formData.append('WCars_ModID', data.model)
    formData.append('WCars_UsrType', data.carUsed)
    formData.append('WCars_PlkType', data.typesOfLicensePlates)
    formData.append('WCars_BldYear', data.yearsOfConstruction.$y)
    formData.append('WCars_State', data.vehicleConditions)
    formData.append('WCars_ProvID', data.province)
    formData.append('WCars_CtyID', data.city)
    formData.append('WCars_SellType', '2')
    if (data.description) formData.append('WCars_Desc', data.description)

    for (let i = 0; i < carFileList.length; i++) {
      formData.append('FileInquiry', carFileList[i].originFileObj as any)
    }
    inquiryPriceRequest(formData)
  }

  return (
    <>
      <FinlayModal
        visible={showFinallyModal}
        onCancel={() => setShowFinallyModal(prev => !prev)}
        title="قیمت پیشنهادی برای شما پیامک خواهد شد."
        description=" سامانه هـوشمند آستکو یدک پس از بـررسـی اطلاعات خـودروی ثـبـت شـده توسط شما، قـیمت پیشنهـادی را برایتـان پیامک میکند. درصورتی که
                با قیمت پیشنهادی موافق بودید و قصد فروش خودرو خود را داشتید، در منوی سامانه آستکو یدک از گزینه
                  “ ثبت خودروی فرسوده “
                استفاده کنید."
      />
      <Form layout="vertical" onFinish={onInquiry} className="w-full" dir="rtl" form={priceInquiryWithCarCardForm}>
        <SelectContainerStyled>
          <Row gutter={32}>
            <Col span={24}>
              <section className="attach-box">
                <p className="attach-item-title">بارگزاری تصویر خودرو</p>
                <p className="attachFormDescription" dir="rtl">
                  فرمت فایل های ارسالی میبایست <span className="image-formats-txt">jpeg</span> ،{' '}
                  <span className="image-formats-txt">jpg</span> یا <span className="image-formats-txt">png</span> بوده و حجم آن کمتر از 2
                  مگابایت باشد.
                </p>
                <div className="attach-item">
                  <Form.Item
                    name="image_Uploads"
                    rules={[
                      ({}) => ({
                        validator() {
                          if (!(carFileList.length > 0)) {
                            return Promise.reject(new Error('بارگزاری تصویر  خودرو الزامی است'))
                          } else {
                            switch (imageError) {
                              case 'sizeError':
                                return Promise.reject(new Error('حجم فایل انتخابی بیشتر از 2 مگابایت می باشد.'))
                              case 'typeError':
                                return Promise.reject(new Error('فرمت عکس اشتباه می باشد'))
                              case 'success':
                                return Promise.resolve()
                              default:
                                return Promise.resolve()
                            }
                          }
                        },
                      }),
                    ]}
                  >
                    <UploadImage
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      fileList={carFileList}
                      onChange={info => onChange(info)}
                      count={4}
                      aspect={1.8}
                    />
                  </Form.Item>
                </div>
              </section>
            </Col>
            <Col xl={12} md={24} sm={24} xs={24} className="mb-3">
              <Form.Item
                name="brand"
                className="borderBottom"
                label={'سیستم (برند)'}
                rules={[{ required: true, message: 'لطفا برند را انتخاب کنید' }]}
              >
                <Select
                  showSearch
                  filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                  placeholder="برند"
                  onSelect={handelBrandChange}
                >
                  {brandsCar?.map(brand => (
                    <Option key={brand.brdCar_ID} value={brand.brdCar_ID} className="text-right">
                      {brand.brdCar_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="mb-3 responsiveMargin">
              <Form.Item
                name="model"
                className="borderBottom"
                label={'تیپ (کلاس)'}
                rules={[{ required: true, message: 'لطفا مدل خودرو را انتخاب کنید' }]}
              >
                <Select
                  showSearch
                  loading={selectLoading.model}
                  disabled={disableSelect.model}
                  filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                  placeholder="مدل"
                >
                  {modelsCar?.map(model => (
                    <Option key={model.modCar_ID} value={model.modCar_ID} brandId={model.modCar_BrdCarID} className="text-right">
                      {model.modCar_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="my-3">
              <Form.Item
                name="carUsed"
                className="borderBottom"
                label="نوع (کاربری خودرو)"
                rules={[{ required: true, message: 'لطفا کاربری خودرو را انتخاب کنید' }]}
              >
                <Select placeholder="کاربری خودرو">
                  {carUseData?.map((value, index) => (
                    <Option value={index + 1} key={index} className="text-right">
                      {value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="my-3">
              <Form.Item
                name="typesOfLicensePlates"
                className="borderBottom"
                label={'نوع پلاک'}
                rules={[{ required: true, message: 'لطفا نوع پلاک را انتخاب کنید' }]}
              >
                <Select placeholder="نوع پلاک">
                  {licensePlateTypeData?.map((type, index) => (
                    <Option key={index} value={index + 1} className="text-right">
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="my-3">
              <ConfigProvider locale={fa_IR}>
                <JalaliLocaleListener />
                <Form.Item
                  name="yearsOfConstruction"
                  className="borderBottom"
                  label="مدل (سال ساخت)"
                  rules={[{ required: true, message: 'لطفا سال ساخت خودرو را انتخاب کنید' }]}
                  initialValue={initialDate}
                >
                  <DatePickerJalali
                    picker="year"
                    className="w-full border-none h-10"
                    placeholder="تاریخ"
                    disabledDate={(date: IObject) => {
                      return date.$jy > 1386
                    }}
                  />
                </Form.Item>
              </ConfigProvider>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="my-3">
              <Form.Item
                name="vehicleConditions"
                className="borderBottom"
                label={'وضعیت خودرو'}
                rules={[{ required: true, message: 'لطفا وضعیت خودرو را انتخاب کنید' }]}
              >
                <Select placeholder="وضعیت خودرو">
                  {vehicleConditionData.map((value, index) => (
                    <Option key={index} value={index + 1} className="text-right">
                      {value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="my-3">
              <Form.Item
                name="province"
                className="borderBottom"
                label={'استان'}
                rules={[{ required: true, message: 'لطفا استان را انتخاب کنید' }]}
              >
                <Select
                  placeholder="استان"
                  filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                  showSearch
                  onSelect={handelProvinceChange}
                >
                  {provincesData?.map(prv => (
                    <Option value={prv.provi_ID} key={prv.provi_ID} className="text-right">
                      {prv.provi_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={12} md={24} sm={24} xs={24} className="my-3">
              <Form.Item
                name="city"
                className="borderBottom"
                label={'شهر'}
                rules={[{ required: true, message: 'لطفا شهر را انتخاب کنید' }]}
              >
                <Select
                  showSearch
                  disabled={disableSelect.city}
                  loading={selectLoading.city}
                  filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                  placeholder="شهر"
                >
                  {cities?.map(city => (
                    <Option value={city.cty_ID} key={city.cty_ID} className="text-right">
                      {city.cty_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24} className="mt-3">
              <Form.Item name={'description'} label="توضیحات" className="mb-0">
                <TextArea className="rounded textArea" autoSize={{ minRows: 3, maxRows: 5 }} dir="rtl" />
              </Form.Item>
            </Col>
          </Row>
        </SelectContainerStyled>

        <ButtonContainerStyles>
          <Col className="buttonOfSelectPriceInquiry" span={24} dir="rtl">
            <Form.Item className="ButtonForm">
              <ButtonUiKit
                type="default"
                htmlType="submit"
                loading={submitLoading}
                className="save"
                icon={<span className="material-icons icon">east</span>}
              >
                ثبت
              </ButtonUiKit>
              <ButtonUiKit
                type="default"
                className="cancel cancelOfStep2"
                icon={<span className="material-icons icon">close</span>}
                onClick={() => router.push(EPathNames.HOME)}
              >
                انصراف
              </ButtonUiKit>
            </Form.Item>
          </Col>
        </ButtonContainerStyles>
      </Form>
    </>
  )
}

export default PriceInquiryCarInformation
