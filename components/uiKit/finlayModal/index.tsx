import { Col, Modal, ModalProps, Row, Typography } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import useMediaQuery from 'hooks/mediaQuery'
import { Routes } from 'interfaces/Routes'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { FinallyModalContainer } from './style'
const { Title, Paragraph, Text } = Typography

interface IFinallyModalProps extends ModalProps {
  onCancel: () => void
  title: string
  description: string
}

const FinlayModal: FC<IFinallyModalProps> = ({ visible, onCancel, description, title }) => {
  const matches = useMediaQuery('(max-width: 650px)')

  const modalWidth = matches ? '100%' : '50vw'
  const router = useRouter()
  return (
    <Modal visible={visible} footer={null} title={null} closable={false} maskClosable={false} width={modalWidth}>
      <FinallyModalContainer>
        <Row justify="center">
          <Col span={1}>
            <span className="material-icons" onClick={onCancel}>
              close
            </span>
          </Col>
          <Col span={23} className="text-center">
            <Image src={'/assets/svg/common/asetcoLogo.svg'} alt="logo" width={200} height={50} className="logo" />
          </Col>
        </Row>
        <Row>
          <Col dir="rtl" className="typography" span={24}>
            <Typography>
              <Title className="title">{title}</Title>
              <Paragraph className="paragraph">{description}</Paragraph>
            </Typography>
          </Col>
          <Col span={16} className="mx-auto">
            <ButtonUiKit
              type="default"
              className="closeButton"
              onClick={() => {
                onCancel()
                router.push(Routes.Home)
              }}
            >
              بستن
            </ButtonUiKit>
          </Col>
        </Row>
      </FinallyModalContainer>
    </Modal>
  )
}

export default FinlayModal
