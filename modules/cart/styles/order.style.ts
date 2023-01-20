import { Col } from 'antd'
import styled from 'styled-components'

export const OrderContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #b9bbc2;

  @media (max-width: 595px) {
    border: none;
  }
`
export const OrderImageCol = styled(Col)`
  & {
    background: #ffffff;
    /* shadow */

    /* box-shadow: 0px 15px 60px rgba(11, 49, 82, 0.1); */
    border-radius: 16px;
  }

  .orderImage {
    /* border-radius: 16px; */
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
`
export const OrderDetailCol = styled(Col)`
  padding: 16px;
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 35px;
    text-align: right;

    color: #909195;
    @media only screen and (max-width: 1500px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 350px) {
      font-size: 13px;
    }
  }
  .model {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    /* identical to box height */

    text-align: right;

    /* direction */

    color: #b9bbc2;
    @media only screen and (max-width: 1500px) {
      font-size: 12px;
    }
  }
  .price {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    /* identical to box height */

    /* menu off */

    color: #909195;
    @media only screen and (max-width: 1500px) {
      font-size: 12px;
    }
  }
  .cartDetailHolder {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 16px;
  }
  .cartDetail {
    /* P */
    padding: 8px 0;
    background: #e9f5ff;
    border: 1px solid #188aec;
    border-radius: 4px;
    width: 113px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 8px;
    .deleteIcon {
      color: #ef0000;
      margin-left: 8px;
      font-size: 24px;
      cursor: pointer;
    }
    .counter {
      margin-left: 4px;
    }
    .changeCounter {
      display: flex;
      flex-direction: column;
      position: relative;
      .up {
        font-size: 20px;
        position: absolute;
        bottom: -1px;
        left: 5px;
        color: #188aec;
        cursor: pointer;
      }
      .down {
        font-size: 20px;
        position: absolute;
        left: 5px;
        top: -1px;
        color: #188aec;
        cursor: pointer;
      }
    }

    @media (max-width: 330px) {
      width: 90px;
      padding: 5px 0;

      .up,
      .down {
        font-size: 15px !important;
      }
    }
  }

  @media (max-width: 330px) {
    padding: 0;
    padding-right: 10px;
  }
`
