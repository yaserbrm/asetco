import { Row } from 'antd'
import styled from 'styled-components'

export const ProductsContainer = styled.div`
  width: 100%;
  margin: 3rem auto;
  overflow-x: hidden;
`

export const ProductsEmptyStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 320px);
`

export const ProductBox = styled(Row)`
  justify-content: end;
  padding: 0 16px;
  @media only screen and (max-width: 992px) {
    justify-content: center;
  }
`
