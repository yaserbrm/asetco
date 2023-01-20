import { Col, Row } from 'antd'
import { useLoading } from 'hooks/useLoading'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { carImagePositionAction } from 'store/actions/global.action'
import { CarsImage } from './components/carsImage'
import { HomeContainer } from './styles'
import CardImages from './components/cardImages'
import HomeFooterTitle from './components/HomeFooterTitle'
import { Routes } from 'interfaces/Routes'
import { useUserInfo } from 'hooks/userInfo'

const cardImagesPath = {
  wornCarsInquiry: ['/assets/png/home/truckWorn.png', '/assets/png/home/wornCarHome.png'],
  importedCars: ['/assets/png/home/truckImportedHome.png', '/assets/png/home/motorCycle.png', '/assets/png/home/importedCarHome.png'],
  autoParts: ['/assets/png/home/engine.png'],
  sellWornCar: ['/assets/png/home/wornCarHomeBanner.png'],
}

export const HomePage: FC = () => {
  const mapUrl = '/assets/svg/home/homeBanner.svg'
  const { userIsLogin } = useUserInfo()
  const dispatch = useDispatch()
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HomeContainer onClick={() => dispatch(carImagePositionAction(0))}>
      <Row className="card-container">
        <Col xs={{ span: 24, order: 3 }} md={{ span: 8, order: 1 }} className="card-column">
          <CardImages navigateLink={Routes.pImportedCars} images={cardImagesPath.importedCars}>
            ثبت سفارش وسایل نقلیه {<h2 className="text-[#188aec]">وارداتی</h2>}
          </CardImages>
          <CardImages navigateLink={Routes.pAutoParts} images={cardImagesPath.autoParts}>
            {<span className="text-[#188aec]">قطعات</span>} وسایل نقلیه {<h2 className="text-[#188aec]">وارداتی</h2>}
          </CardImages>
        </Col>

        <Col xs={{ span: 0, order: 2 }} md={{ span: 8, order: 2 }} className="homeBanner">
          <Image src={mapUrl} alt="iranMap" layout="fill" />
        </Col>

        <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 3 }} className="card-column">
          <CardImages navigateLink={userIsLogin ? Routes.sellingWornCar : '/login'} images={cardImagesPath.sellWornCar}>
            {<span className="text-[#188aec]">فروش</span>} وسایل نقلیه {<h2 className="text-[#188aec]">فرسوده</h2>}
          </CardImages>
          <CardImages navigateLink={userIsLogin ? Routes.priceInquiry : '/login'} images={cardImagesPath.wornCarsInquiry}>
            استعلام قیمت {<h1 className="!text-[#188aec] !text-sm">خودروی فرسوده</h1>}
          </CardImages>
        </Col>
      </Row>

      <Row>
        <Col xs={{ span: 0 }} md={{ span: 24 }}>
          <CarsImage />
        </Col>

        <Col span={24} md={{ span: 0 }}>
          <HomeFooterTitle />
        </Col>
      </Row>
    </HomeContainer>
  )
}
