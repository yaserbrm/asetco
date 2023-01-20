import { Row } from 'antd'
import styled from 'styled-components'

export const CartContent = styled(Row)`
  padding: 24px;

  @media (max-width: 595px) {
    background: #f5f5f5;
    border-radius: 16px 16px 0px 0px;
    margin: 20px 16px;
    position: relative;
  }

  @media (max-width: 369px) {
    padding: 12px;
  }
`
