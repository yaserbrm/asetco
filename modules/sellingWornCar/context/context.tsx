import { UploadFile } from 'antd/lib/upload/interface'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { IBrandCar } from 'core/wcs/brandCar'
import { IOwners } from 'core/wcs/owners'
import { IProvince } from 'core/wcs/province'
import { IWornCars } from 'core/wcs/wornCars'
import { IWornCarAgents } from 'core/wcs/wornMaster'
import { IObject } from 'interfaces/IObject'
import { useSellingWornCarService } from 'pages/selling-worn-car/context'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usersSelector } from 'store/selectors'
import { IStepsValue } from '../interfaces/stepsValues'

interface contextValue {
  value: IStepsValue
  handleOwner: (owner: IOwners) => void
  handleCar: (car: IObject) => void
  handleAttachment: (filesList: UploadFile<any>[], attachType: string) => void
  handleAttachmentDescription: (values: string, type: string) => void
  handleFinall: (finall: IObject) => void
  step: number
  setStep: (step: number) => void
  carFormEnable: boolean
  setCarFormEnable: (carFormEnable: boolean) => void
  carFormNew: boolean
  setCarFormNew: (carFormNew: boolean) => void
  provinces: IProvince[]
  brandsCar: IBrandCar[]
  setUserWornCar: (wornCar: Pick<IWornCars, 'wCars_Id' | 'wCars_Name'>[]) => void
  userWornCar: Pick<IWornCars, 'wCars_Id' | 'wCars_Name'>[]
  wornCarId: string
  setWornCarId: (id: string) => void
  selectedWornCar?: IWornCars
  wornMasterAgents: IWornCarAgents[]
  carTempValue: IObject | undefined
  setCarTempValue: Dispatch<SetStateAction<IObject | undefined>>
}

export const SellingWornCarStateContext = createContext<contextValue | undefined>(undefined)

export const SellingWornCarPageContext: FC<{
  children: ReactNode
  province: IProvince[]
  brands: IBrandCar[]
  wornMasterAgents: IWornCarAgents[]
}> = ({ children, brands, province, wornMasterAgents }) => {
  const userInfo = useSelector(usersSelector).userInfo
  const [step, setStep] = useState<number>(1)
  const [carFormEnable, setCarFormEnable] = useState<boolean>(false)
  const [carFormNew, setCarFormNew] = useState<boolean>(false)
  const [wornCarId, setWornCarId] = useState<string>('')
  const [selectedWornCar, setSelectedWornCar] = useState<IWornCars>()
  const [value, setValue] = useState<IStepsValue>({
    owner: {},
    car: {},
    attachments: {
      doc: [],
      card: [],
      image: [],
      others: [],
    },
    attachmentsDescription: {
      document_description: '',
      card_description: '',
      image_description: '',
      others_description: '',
    },
    finall: {},
  })
  const [carTempValue, setCarTempValue] = useState<IObject | undefined>(undefined)
  const [userWornCar, setUserWornCar] = useState<Pick<IWornCars, 'wCars_Id' | 'wCars_Name'>[]>([])
  const handleOwner = (owner: IOwners) => {
    setValue(prev => ({ ...prev, owner }))
  }
  const handleCar = (car: IObject) => {
    setValue(prev => ({ ...prev, car }))
  }
  const handleAttachment = (filesList: UploadFile<any>[], attachType: string) => {
    setValue(prev => ({
      ...prev,
      attachments: {
        ...prev.attachments,
        [attachType]: [...filesList],
      },
    }))
  }
  const handleUserWornCar = (wornCar: Pick<IWornCars, 'wCars_Id' | 'wCars_Name'>[]) => {
    setUserWornCar(wornCar)
  }
  const handleAttachmentDescription = (value: string, name: string) => {
    setValue(prev => ({
      ...prev,
      attachmentsDescription: {
        ...prev.attachmentsDescription,
        [name]: value,
      },
    }))
  }
  const handleFinall = (finall: IObject) => {
    setValue(prev => ({ ...prev, finall }))
  }
  const handleStepState = (step: number) => {
    setStep(step)
  }

  const handleCarFormEnable = (carFormEnable: boolean) => {
    setCarFormEnable(carFormEnable)
  }
  const handleCarFormNew = (carFormNew: boolean) => {
    setCarFormNew(carFormNew)
  }
  const handleSelectedWornCar = (id: string) => {
    setWornCarId(id)
  }
  const service = useSellingWornCarService()

  const fetchWornCarById = () => {
    const formData = new FormData()
    formData.append('WCarID', wornCarId)
    service.wornCars
      ?.getWornCarById(formData)
      .then(res => {
        if (res.success && res.data && res.data.status == 200) {
          res.data.wornCar!.wCars_BrdID = res.data.brandID

          setSelectedWornCar(res.data.wornCar)
          setCarFormNew(false)
          setCarFormEnable(true)
        }
      })
      .catch(() => ToastAlert.error('خطا در دریافت مشخصات خودرو فرسوده'))
  }
  const states: contextValue = {
    value,
    step,
    setStep: handleStepState,
    handleOwner,
    handleCar,
    handleAttachment,
    handleAttachmentDescription,
    handleFinall,
    carFormEnable,
    setCarFormEnable: handleCarFormEnable,
    carFormNew,
    setCarFormNew: handleCarFormNew,
    provinces: province,
    brandsCar: brands,
    setUserWornCar: handleUserWornCar,
    userWornCar,
    wornCarId,
    setWornCarId: handleSelectedWornCar,
    selectedWornCar,
    wornMasterAgents,
    carTempValue,
    setCarTempValue,
  }
  useEffect(() => {
    if (wornCarId !== '') fetchWornCarById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wornCarId])

  useEffect(() => {
    const newOwner: Partial<IOwners> = {
      own_FName: userInfo?.usr_FName,
      own_UsrID: userInfo?.usr_ID,
      own_IdenNumber: userInfo?.usr_IdentNum,
      own_LName: userInfo?.usr_LName,
      own_Mobile: userInfo?.usr_Mobile,
    }
    if (userInfo && userInfo.usr_CtyID && userInfo?.usr_CtyID > 0) {
      newOwner.own_cityId = userInfo.usr_CtyID
    }
    if (userInfo && userInfo.usr_ProvID && userInfo.usr_ProvID > 0) {
      newOwner.own_ProvncId = userInfo.usr_ProvID
    }
    setValue(prev => ({
      ...prev,
      owner: {
        ...prev.owner,
        ...newOwner,
      },
    }))
  }, [userInfo])
  return <SellingWornCarStateContext.Provider value={states}>{children}</SellingWornCarStateContext.Provider>
}

export const useSellingWornCarPageState = () => useContext(SellingWornCarStateContext)!
