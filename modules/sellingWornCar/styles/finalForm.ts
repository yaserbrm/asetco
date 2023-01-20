import styled from 'styled-components'

export const FinalFormWrapper = styled.div`
  min-height: calc(100vh - 184px);
  line-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 67px;

  .finalForm {
    width: 100%;
    padding: 32px;
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  .finalFormRow {
    margin-top: 25px;
    padding: 20px 32px;
    border-radius: 10px;
    border: solid 1px rgba(0, 0, 0, 0.1);
  }
  .finalFormTitle {
    height: 41px;
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 36px;
    text-align: right;
    color: #1e1926;
  }
  .finalFormDes {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 31px;
    text-align: right;
    color: #1e1926;
    height: 62px;
  }

  .steps-action {
    display: flex;
    margin-top: 30px;

    .icon {
      font-size: 15px;
      margin-left: 5px;
    }
  }
  .cancel,
  .back,
  .nextPage {
    direction: rtl;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 33px;
    border-radius: 8px;
    margin-right: 8px;
  }
  .back {
    flex-direction: row-reverse;
    .icon {
      position: relative;
      right: 9px;
      top: 1px;
    }
  }
  .cancel,
  .back {
    background-color: #f4f3f7;
  }
  .nextPage {
    background-color: #188aec;
  }
  .back-responsive {
    display: none;
  }
  .date-input {
    width: 100%;
  }
  .ant-form-item-label {
    text-align: right;
  }
  .ant-select-arrow {
    right: unset;
    left: 10px;
    top: 55%;
    color: rgba(0, 0, 0, 0.6);
  }
  .ant-select-selector,
  .ant-select-open .ant-select-selector {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    box-shadow: none !important;
  }
  .securityCodeImage {
    display: flex;
    justify-content: center;
  }
  .securityCodeImageRow {
    background: #e6efff;
    border-radius: 8px;
    height: 56px;
  }
  .refresh {
    cursor: pointer;
  }
  .owner-form-input {
    border: unset;
    border-radius: 0;
    border-bottom: 2px solid #e7e7e7;
    transition: 0.3s all;
    .ant-select-selector {
      border: unset !important;
      border-radius: 0 !important;
      transition: 0.3s all !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
  .owner-form-input:focus {
    border: unset;
    border-bottom: 2px solid #e7e7e7;
    border-color: #7fb8e9;
    .ant-select-selector:focus {
      border: unset !important;
      border-color: #7fb8e9 !important;
    }
  }
  .owner-form-input:hover {
    border: unset;
    border-bottom: 2px solid #e7e7e7;
    background: #fff;
    border-color: #7fb8e9;
    .ant-select-selector:hover {
      border: unset !important;
      background: #fff !important;
      border-color: #7fb8e9 !important;
    }
  }
  @media only screen and (max-width: 420px) {
    .finalFormDes {
      display: block;
      padding: 15px 0;
      margin-top: 15px;
    }
    .finalFormRow {
      margin-top: 100px;
      padding-top: 15px;
    }
  }

  @media only screen and (max-width: 768px) {
    .back {
      display: none;
    }
    .title-responsive {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .back-responsive {
      display: block;
      color: #000;
    }
    .finalFormTitle {
      font-size: 17px;
    }
  }
`
