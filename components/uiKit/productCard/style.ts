import styled from 'styled-components'

export const ContentTitleCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .ant-typography {
    margin: 0;
  }

  .modelCar {
    font-weight: 700;
    font-size: 12px;
    color: #909195;
  }

  .priceCarTitle {
    font-weight: 500;
    font-size: 15px;
    color: #1e1926;
  }

  .priceCar {
    font-weight: 600;
    font-size: 13px;
    color: #1e1926;
  }
`
export const ButtonContainerCardProducts = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    height: 37px;
    background: #188aec;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .showDetailsBtn {
    color: #7fb8e9;
    background: transparent;
    border: none;
    box-shadow: none;

    .showDetailsBtnIcon {
      font-size: 14px;
      margin-right: 5px;
      display: inline-block;
    }
  }
`
export const CardProductsStyles = styled.div`
  .cardAutoPart {
    width: 100% !important;
    min-height: 395.94px;
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    padding: 13px;
  }
  .cardImage {
    width: 80%;
    border-radius: 8px;
  }
  .card-image-box {
    display: inline-flex;
    justify-content: center;
    width: 100%;
  }
  .image {
    width: 100%;
    height: 250px;
  }
  .ant-card-body {
    padding: 0;
  }
  .ant-card-cover {
    min-height: 213.48px !important;
  }
  @media only screen and (max-width: 480px) {
    .card-image-box {
      justify-content: center;
    }
  }
`
