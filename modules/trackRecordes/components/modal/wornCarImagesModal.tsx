import { Dispatch, FC, useEffect, useState } from 'react'
import { Modal, Spin, Tabs, Upload, UploadProps } from 'antd'
import { UploadRequestOption } from 'rc-upload/lib/interface'
import { WornCarImageModalBody, WornCarImagesModalFooter, WornCarImagesModalStyle, WornCarImagesModalTitle } from './style'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { addIcon, cancelIcon, deleteIcon } from '../../style/icons'
import { IWornMasterFiles } from 'core/wcs/wornMaster'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import ImgCrop from 'antd-img-crop'
import { ImageListPreview } from 'components/uiKit/imageListPreview'
import { useTrackRecordsService } from 'pages/track-records/context'
import { useTractRecordsStateCtx } from 'modules/trackRecordes/context'
import { WornImageFilesTab } from 'modules/trackRecordes/modules/TrackRecordsDetails/interfaces/wornImageFilesTab'
import { AspectWornCarUpload } from 'constants/aspectWornCarUpload'

const { TabPane } = Tabs

let isValidType: boolean
let isValidSize: boolean

interface IShowWornCarImagesProps {
  showImagesDialog: boolean
  setShowImagesDialog: Dispatch<boolean>
  files: IWornMasterFiles | undefined
  wornInfo: {
    name: string
    model: string
  }
  loading: boolean
}

const WornCarImagesModal: FC<IShowWornCarImagesProps> = ({ showImagesDialog, setShowImagesDialog, wornInfo, files, loading }) => {
  const [currentTab, setCurrentTab] = useState<string>(WornImageFilesTab.filesImages.toString())
  const [cropAspect, setCropAspect] = useState<number>(1.8)
  const services = useTrackRecordsService()
  const { productsInfo, getWornCarsImagesReq, toggleModalImagesLoading } = useTractRecordsStateCtx()

  const props: UploadProps = {
    beforeUpload: file => {
      isValidType = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      if (!isValidType) {
        ToastAlert.error('فایل با فرمت png , jpg و jpeg قابل بارگزاری است')
      }
      isValidSize = file.size < 2000000
      if (!isValidSize) {
        ToastAlert.error('حجم فایل باید کمتر از 2 مگا بایت باشد.')
      }
      return (isValidType && isValidSize) || Upload.LIST_IGNORE
    },
    onChange: info => {
      const isValidType = info.file.type === 'image/png' || info.file.type === 'image/jpeg' || info.file.type === 'image/jpg'
      if (!isValidType) {
        ToastAlert.error('فایل با فرمت png , jpg و jpeg قابل بارگزاری است')
      }
      const isValidSize = info && info.file && info.file.size ? (info.file.size < 2000000 ? true : false) : false
      if (!isValidSize) {
        ToastAlert.error('حجم فایل باید کمتر از 2 مگا بایت باشد.')
      }
      isValidType && isValidSize
    },
  }

  const handleOk = () => {
    setShowImagesDialog(false)
  }

  const handleCancel = () => {
    setCurrentTab('1')
    setShowImagesDialog(false)
  }

  const uploadFileReq = async (file: any) => {
    if (!services) return
    toggleModalImagesLoading()

    const formData = new FormData()
    formData.append('Type', currentTab)
    formData.append('WCID', String(productsInfo?.id))
    formData.append('IFileWorn', file)

    try {
      const { data } = await services.wornMaster.uploadWornCarImage(formData)
      if (data?.status === 'Status200') {
        ToastAlert.success('بارگزاری با موفقیت انجام شد')
        getWornCarsImagesReq()
        return
      }

      toggleModalImagesLoading()
      ToastAlert.error('بارگزاری با خطا مواجه شد')
    } catch {
      toggleModalImagesLoading()
      ToastAlert.error('بارگزاری با خطا مواجه شد')
    }
  }

  const dummyRequest: (options: UploadRequestOption) => void = ({ file, onSuccess }) => {
    uploadFileReq(file)
  }

  const tabs = [
    { title: 'سایر مدارک', key: WornImageFilesTab.filesOthers.toString(), images: files?.filesOthers },
    {
      title: 'سند خودرو',
      key: WornImageFilesTab.filesDocuments.toString(),
      images: files?.filesDocuments,
    },
    {
      title: 'کارت ماشین',
      key: WornImageFilesTab.filesCards.toString(),
      images: files?.filesCards,
    },
    {
      title: 'تصاویر خودرو',
      key: WornImageFilesTab.filesImages.toString(),
      images: files?.filesImages,
    },
  ]

  const handleChangeTabs = (activeKey: string) => {
    setCurrentTab(activeKey)

    const { filesOthers, filesDocuments, filesCards, filesImages } = WornImageFilesTab

    switch (activeKey) {
      case filesOthers.toString():
        setCropAspect(AspectWornCarUpload.other)
        break
      case filesDocuments.toString():
        setCropAspect(AspectWornCarUpload.document)
        break
      case filesCards.toString():
        setCropAspect(AspectWornCarUpload.cards)
        break
      case filesImages.toString():
        setCropAspect(AspectWornCarUpload.carImg)
        break
    }
  }

  return (
    <WornCarImagesModalStyle>
      <Modal
        centered
        title={
          <WornCarImagesModalTitle>
            <div className="title">تصاویر ارسالی کاربر</div>
            <div className="subTitle" dir="rtl">
              <div className="fullName">{wornInfo.name}</div>

              <div className="details">{' , ' + wornInfo.model}</div>
            </div>
          </WornCarImagesModalTitle>
        }
        closable={false}
        visible={showImagesDialog}
        onOk={handleOk}
        onCancel={handleCancel}
        className="wornCarImagesModal"
        footer={
          <WornCarImagesModalFooter>
            <div onClick={() => setShowImagesDialog(false)}>
              <ButtonUiKit type="default" icon={cancelIcon} className="btn cancel">
                انصراف
              </ButtonUiKit>
              <ButtonUiKit type="ghost" icon={cancelIcon} className="btn cancel-icon"></ButtonUiKit>
            </div>
            <div>
              <ImgCrop rotate modalTitle="ویرایش عکس" modalOk="تایید" modalCancel="انصراف" aspect={cropAspect}>
                <Upload {...props} showUploadList={false} customRequest={dummyRequest}>
                  <ButtonUiKit icon={addIcon} className="btn add">
                    <span className="add-text">افزودن تصویر جدید</span>
                  </ButtonUiKit>
                </Upload>
              </ImgCrop>
            </div>
          </WornCarImagesModalFooter>
        }
      >
        <WornCarImageModalBody>
          <Spin spinning={loading} size={'large'}>
            <Tabs defaultActiveKey={WornImageFilesTab.filesImages.toString()} centered onChange={handleChangeTabs}>
              {tabs.map(tab => (
                <TabPane tab={tab.title} key={tab.key}>
                  {currentTab == tab.key && tab?.images?.length ? (
                    <ImageListPreview images={tab?.images} />
                  ) : (
                    <h3 className="noImage">تصویری یافت نشد</h3>
                  )}
                </TabPane>
              ))}
            </Tabs>
          </Spin>
        </WornCarImageModalBody>
      </Modal>
    </WornCarImagesModalStyle>
  )
}

export default WornCarImagesModal
