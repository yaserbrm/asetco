import { Col, Row } from 'antd'
import styled from 'styled-components'

export const OrdersListContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: #ffffff;

  box-shadow: 0px 15px 60px rgba(11, 49, 82, 0.1);

  @media only screen and (max-width: 592px) {
    padding: 0px;
    background: none;
    box-shadow: none;
  }
`
export const OrderCard = styled(Col)`
  padding: 8px;
  @media only screen and (max-width: 592px) {
    padding: 0;
    background: #fff;
    box-shadow: 0px 15px 60px rgba(11, 49, 82, 0.1);
    border-radius: 8px;
    margin: 10px 0;
  }
`
