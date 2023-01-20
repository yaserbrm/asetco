import styled from 'styled-components'

export const OwnerProfileWrapper = styled.section`
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0px 16px 16px;
  gap: 32px;
  border-radius: 8px;
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    text-align: right;
    color: #1e1926;
    margin-top: 16px;
  }
  .edit-btn-box {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
    margin-top: 26px;
  }
  .edit-btn {
    background-color: red;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 8px;
    gap: 8px;
    width: 132px;
    height: 37px;
    background: #f4f3f7;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  }

  Form {
    padding: 0px 16px 0 16px;
    margin: 0;
    .ant-select:not(.ant-select-customize-input) .ant-select-selector,
    .ant-input {
      height: 40px;
      width: 100%;
    }
    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      display: none;
    }
    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      line-height: 1;
      content: '*';
      text-align: initial;
    }
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
      line-height: 40px;
    }
    .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
      padding-right: 0px;
    }
    .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
      padding-right: 0px;
      top: 4px;
    }
    .ant-select-arrow {
      right: unset;
      left: 10px;
      top: 55%;
      color: rgba(0, 0, 0, 0.6);
    }
    .ant-select-multiple .ant-select-selection-item {
      background: #f7f6f9;
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.38);
    }
    .save,
    .cancel,
    .changePage {
      width: 92px;
      padding: 4px 10px 4px 8px;
      height: 32px;
      span {
        font-size: 12px;
        text-align: right;
        color: #1e1926;
        font-weight: 500;
        position: relative;
        top: -2px;
      }
      .icon {
        font-size: 17px;
        position: relative;
        top: 4px;
        left: 8.33%;
      }
    }
    .cancel {
      margin-right: 8px;
      width: 76px;
    }
    .save {
      background: #00b499;
      color: #fff;
      width: 75px;
      span {
        color: #fff;
      }
    }
    .ant-form-item-label {
      text-align: right;
    }
    .ant-form-item-label > label {
      color: rgba(0, 0, 0, 0.6);
    }
    span {
      color: rgba(0, 0, 0, 0.87);
      font-size: 14px;
    }
    .borderCol {
      height: 71px;
      .ant-form-item-control-input-content {
        margin-bottom: 8px;
      }
    }
    .address {
      height: 66px;
    }

    .borderCol > .ant-form-item {
      border-bottom: 1px solid #f4f3f7;
    }
    .upload > .ant-form-item {
      border-bottom: none;
    }
    .address > .ant-form-item {
      border-bottom: none;
    }
    .updateButton {
      display: none;
    }
  }
  .input-readonly-span {
    display: flex;
    height: 40px;
    width: 100%;
    background-color: #fff;
    border: solid 1px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    align-items: center;
    padding: 4px 11px;
  }
`
