import { Row } from 'antd'
import styled from 'styled-components'

export const TotalOrderRow = styled(Row)`
  padding: 0 16px;

  .price {
    display: block;
    text-align: left;
  }
  .count {
    display: block;
    text-align: left;
  }
  .description {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 17px;
    text-align: right;

    /* menu off */

    color: #909195;
  }
  .buttonHolder {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .submitButton {
    display: block;
    width: 100%;
  }
  .totalOrderMobileScreen {
    display: none;
  }

  @media only screen and (max-width: 992px) {
    padding: 16px 0;
  }

  @media only screen and (max-width: 592px) {
    .totalOrderMobileScreen {
      display: block;
    }

    .totalOrderFixed {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0;
      z-index: 10;

      .submitButton {
        font-size: 1.1rem;
      }

      &__title {
        display: flex;
        justify-content: space-between;

        .count,
        .price {
          font-weight: 500;
          font-size: 16px;
        }

        .count {
          color: #909195;
        }

        .price {
          color: #3b3742;
        }

        .description {
          text-align: center;
        }
      }
    }

    .totalOrderDesktop {
      display: none;
    }
  }
`
