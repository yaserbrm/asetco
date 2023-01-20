import styled from 'styled-components'

export const ImportedCarDetailMobileScreen = styled.section`
  position: relative;
  min-height: 526px;
  overflow-y: scroll;
  background: #f5f5f5;
  margin: 16px 10px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;

  .detailTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__info {
      font-style: normal;
      font-weight: 700;

      .name {
        color: #1e1926;
        font-size: 22px;
      }
      .brand {
        color: #b9bbc2;
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }

  .slick-slider {
    width: 100%;
  }

  .carouselHolder {
    background: none !important;
  }

  @media (max-width: 350px) {
    margin-left: 10px;
    margin-right: 10px;
  }

  @media (max-width: 592px) {
    .backButton {
      display: block;
    }
  }
`

export const DetailButtonMobile = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  padding: 24px 0px 16px;
  gap: 16px;
  height: 124px;
  background: #ffffff;
  box-shadow: 0px -15px 40px rgba(11, 49, 82, 0.1);

  .button {
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 0;
  }

  .button > span {
    margin-left: 10px;
  }

  .ordered-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }
  .delete-increase-decrease {
    width: 184px;
    height: 65px;
    background-color: #e9f5ff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .delete-icon {
    cursor: pointer;
  }
  .input-box {
    display: inline-flex;
  }
  .ant-input-number-input {
    text-align: center;
    color: #000;
    width: 80%;
  }
  .increase-decrease {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    line-height: 65px;
  }
  .increase-decrease-btn {
    display: inline-flex;
  }
  .increase-decrease-btn > span {
    color: #188aec;
    font-size: 20px;
    font-weight: bold;
  }
`
