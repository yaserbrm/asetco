import { FC } from 'react'
import { Col, Row } from 'antd'
import { CarsImagesContainer } from 'modules/home/styles/carsImage'
import { useSelector } from 'react-redux'
import { carImagePosition } from 'store/selectors'

export const CarsImage: FC = () => {
  const imagePosition = useSelector(carImagePosition)
  return (
    <CarsImagesContainer imagePosition={imagePosition}>
      <Row className="carsSection">
        <Col span={10} className="newCarCol">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={'/assets/png/newCar.png'} alt="newCar" height={'100%'} className="newCar" />
          }
        </Col>
        <Col span={4}></Col>
        <Col span={10} className="oldCarCol">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img src={'/assets/png/oldCar.png'} alt="oldCar" height={'100%'} className="oldCar" />
          }
        </Col>
      </Row>
    </CarsImagesContainer>
  )
}
