import { FC, useEffect, useState } from 'react'
import { Col, Typography } from 'antd'
import ProductCard from 'components/uiKit/productCard'
import { IProductGetAll } from 'core/wcs/product'
import { ProductBox, ProductsEmptyStyle } from '../style'
import { useLoading } from 'hooks/useLoading'

const ProductCards: FC<{ products: IProductGetAll[]; filterLoading: boolean; noData: boolean }> = ({ products, filterLoading, noData }) => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(filterLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLoading])

  if (noData) {
    return (
      <Col span={24}>
        <ProductsEmptyStyle>
          <Typography.Title>محصولی یافت نشد</Typography.Title>
        </ProductsEmptyStyle>
      </Col>
    )
  }
  if (!products.length) {
    return <></>
  }
  return (
    <>
      <ProductBox gutter={[8, 16]} className="boxCars">
        {products.map((item, index) => {
          return (
            <Col key={index} xs={23} sm={11} md={11} xl={8}>
              <ProductCard key={index} item={item} />
            </Col>
          )
        })}
      </ProductBox>
    </>
  )
}

export default ProductCards
