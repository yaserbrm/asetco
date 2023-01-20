import { FC, MouseEvent } from 'react'
import { Modal } from 'antd'
import { IModalConfirm } from '../interfaces/global'
import { useRouter } from 'next/router'
import { Typography } from 'antd'
import { FinalModalContainer } from '../styles/finalModal'
import { Routes } from 'interfaces/Routes'

const TrackingCodeModal: FC<IModalConfirm> = ({ showCodeDialog, setShowCodeDialog, trackingCode }) => {
  const router = useRouter()
  const handleCancel = (e: MouseEvent<HTMLElement>) => {
    setShowCodeDialog(false)
    router.push(Routes.Home)
  }
  const { Paragraph } = Typography
  return (
    <Modal
      centered
      title="کد رهگیری شما"
      visible={showCodeDialog}
      onCancel={handleCancel}
      cancelText="بستن"
      maskClosable={false}
      okButtonProps={{ style: { display: 'none' } }}
      className="confirm-close-modal"
    >
      <FinalModalContainer>
        <Paragraph
          copyable={{ text: trackingCode, tooltips: ['کپی', 'کپی شد'] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <p>{trackingCode}</p>
        </Paragraph>
      </FinalModalContainer>
    </Modal>
  )
}

export default TrackingCodeModal
