import { FC } from 'react'
import AttachDocument from './attachDocument'
import CarInfo from './carInfo'
import FinalRegister from './finalRegister'
import OwnerInfo from './ownerInfo'
import { Col, Row, Steps } from 'antd'
import { StepsStyle } from '../styles/step'
import { useSellingWornCarPageState } from '../context/context'

const { Step } = Steps

const SellingWornCarPage: FC = () => {
  const states = useSellingWornCarPageState()

  const StepItems = [
    {
      title: 'مشخصات مالک',
      content: <OwnerInfo />,
    },
    {
      title: 'اطلاعات خودرو',
      content: <CarInfo />,
    },
    {
      title: 'پیوست مدارک',
      content: <AttachDocument />,
    },
    {
      title: 'ثبت نهایی',
      content: <FinalRegister />,
    },
  ]
  return (
    <>
      <Row justify="center" align="middle">
        <Col xs={23} sm={20} md={16} lg={15} xl={13}>
          <StepsStyle current={states.step} responsive={false}>
            {StepItems.map((item, index) => (
              <Step
                key={index}
                title={item.title}
                className={`step-${states.step} ${index + 1 === states.step ? 'step-show' : 'step-hide'}`}
                icon={
                  <>
                    <div className={`${index + 1 === states.step && 'active'} stepsIcon `}>
                      <span>{index + 1 >= states.step ? index + 1 : '✓'}</span>
                    </div>
                  </>
                }
              />
            ))}
          </StepsStyle>
        </Col>
      </Row>

      <section>{StepItems[states.step - 1].content}</section>
    </>
  )
}

export default SellingWornCarPage
