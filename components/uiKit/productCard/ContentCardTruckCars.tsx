import { FC } from 'react'
import { ButtonContainerCardProducts, ContentTitleCard } from './style'
import { Col, Row, Typography } from 'antd'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { CarTypeTable } from '../table/components'
import { formatNumberToCurrency } from 'helper/formatNumberToCurrency'
import { ICardProductProps } from './interfaces'
import { TypesCardProducts } from './contants'

const ContentCardTruckCars: FC<ICardProductProps> = ({ item, type }) => {
  return (
    <>
      <Row gutter={[0, 16]} className="mt-3">
        <Col span={24}>
          <ContentTitleCard>
            <h2 className="modelCar">
              {type === TypesCardProducts.AUTO_PARTS ? (
                <CarTypeTable typeCar={item?.p_Model} years={item?.p_Date} dir="row-reverse" />
              ) : (
                <CarTypeTable typeCar={item?.p_Model} years={item?.p_Date} dir="row-reverse" />
              )}
            </h2>
            <h1> {item?.p_Name}</h1>
          </ContentTitleCard>
        </Col>
        <Col span={24}>
          {item?.p_Price ? (
            <ContentTitleCard>
              <Typography.Title className="priceCar" level={5} style={{ direction: 'rtl' }}>
                <span>{formatNumberToCurrency(Number(item?.p_Price) / 10)}</span>
                <span className="mr-1">تومان</span>
              </Typography.Title>
              <Typography.Text className="priceCarTitle"> قیمت خرید</Typography.Text>
            </ContentTitleCard>
          ) : (
            <></>
          )}
        </Col>
        <Col span={24}>
          <ButtonContainerCardProducts>
            <ButtonUiKit className="showDetailsBtn">
              <span className="material-icons showDetailsBtnIcon">arrow_back</span>
              جزئیات
            </ButtonUiKit>
          </ButtonContainerCardProducts>
        </Col>
      </Row>
    </>
  )
}

export default ContentCardTruckCars
