import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import FilterProducts from 'components/uiKit/filterProducts'
import { useProductsContext } from 'pages/products/context'
import ProductCards from './components/ProductCards'
import { ProductsContainer } from './style'
import { IFilterArg } from 'interfaces/IFilterArg'
import { IProductGetAll } from 'core/wcs/product'
import { scrollToTop } from 'helper/scrollToTop'
import Pagination from 'components/uiKit/pagination'

const Products = () => {
  const { products, productsGroup, noData } = useProductsContext()
  const [filterLoading, setFilterLoading] = useState<boolean>(false)

  const [filterArg, setFilterArg] = useState<IFilterArg>({
    PageIndex: 1,
    PageSize: 9,
    SortType: 1,
  })

  //helper for slice products
  const [productFilter, setProductFilter] = useState<IProductGetAll[]>([])

  useEffect(() => {
    if (products?.length) {
      const startIndex = filterArg.PageIndex * filterArg.PageSize - filterArg.PageSize
      const endIndex = startIndex + filterArg.PageSize
      setProductFilter(products.slice(startIndex, endIndex))
      scrollToTop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, filterArg.PageIndex])

  const setPageIndex = (index: number) => setFilterArg({ ...filterArg, PageIndex: index })

  return (
    <>
      <ProductsContainer>
        <Row gutter={[0, 8]} justify="start">
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 17, order: 1 }} className="gutter-row">
            <ProductCards products={productFilter} filterLoading={filterLoading} noData={noData} />
          </Col>

          <Col xs={{ span: 24, order: 1 }} lg={{ span: 6, order: 2 }} className="gutter-row">
            <FilterProducts setFilterLoading={setFilterLoading} setPageIndex={setPageIndex} filterOptions={productsGroup || []} />
          </Col>
        </Row>
      </ProductsContainer>
      {products && products.length > filterArg.PageSize && (
        <Pagination
          total={products?.length}
          onChange={(page, pageSize) => {
            setFilterArg({
              ...filterArg,
              PageIndex: page,
              PageSize: pageSize,
            })
          }}
          defaultCurrent={1}
          responsive
          pageSize={filterArg.PageSize}
          current={filterArg.PageIndex}
          className="text-center"
          size="default"
        />
      )}
    </>
  )
}

export default Products
