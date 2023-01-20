import styled from 'styled-components'

export const OwnerFormWrapper = styled.div`
  min-height: calc(100vh - 184px);
  line-height: 100vh;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  .ownerForm {
    width: 100%;
    border: solid 1px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    padding: 32px;
    @media only screen and (max-width: 407px) {
      padding: 20px;
    }
  }
  .ownerFormRow {
    margin-top: 25px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 20px 32px;
    border-radius: 10px;

    @media only screen and (max-width: 420px) {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .ownerFormTitle {
    height: 41px;
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 36px;
    text-align: right;
    color: #1e1926;
    margin-top: 10px;
  }

  .car-form-description {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    color: #909195;
    margin-top: 8px;
  }
  .new-car-box {
    margin-top: 56px;
  }
  .new-car-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    height: 44px;
    background: #e7e7e7;
    border-radius: 4px;
  }
  .select-car-box {
    margin-top: 35px;
    .ant-form-item-control-input {
      width: 100% !important
      ;
    }
  }
  .select-car-title {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    color: #1e1926;
    margin-left: 40px;
  }
  .form-align-select-input {
    margin-top: 9px;
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

      .ant-select-selection-placeholder {
        padding-right: 0;
      }
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
  .ant-form-item-control-input .ant-form-item-control-input-content:focus,
  .ant-form-item-control-input .ant-form-item-control-input-content:active {
    border: none;
    border-bottom: 1px solid #e7e7e7;
    box-shadow: none;
  }
  .ant-select-arrow {
    right: unset;
    left: 10px;
    top: 55%;
    color: rgba(0, 0, 0, 0.6);
  }
  .ant-form-item-label {
    text-align: right;
  }
  .ant-select-selector,
  .ant-select-open .ant-select-selector {
    border-top: none !important;
    border-right: none !important;
    border-left: none !important;
    box-shadow: none !important;
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
    border: none;
    font-weight: 500;
  }
  .nextPage {
    background-color: #188aec;
    &.ant-btn[disabled] {
      color: #fff;
    }
  }
  .back-responsive {
    display: none;
  }
  .date-input {
    width: 100%;
    input {
      height: 32px;
    }
  }
  .attach-item-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    text-align: right;
    color: rgba(0, 0, 0, 0.6);
  }
  .attach-item- {
    border: solid 1px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
  }
  .select-car-dropdown {
    border: 1px solid #e7e7e7;
    border-radius: 8px;
    width: 40%;
  }

  .inputCode {
    margin-top: 15px;
  }

  .resent-time-container {
    min-height: 30px;
    height: 30px;
    max-height: 30px;
  }

  .LoginActiveCodeFormResend {
    display: flex;
    justify-content: space-between;
  }

  .FormSubmit {
    min-height: 60px;
    border-radius: 8px;
    font-size: 20px;
    line-height: normal;
    min-height: 60px;
  }
  .MobileFormSubmit {
    margin-top: 40px;
  }
  .CodeFormSubmit {
    margin-top: 20px;
  }

  .active-code-input {
    text-align: center;
    border-radius: 8px;
  }

  .active-code-resend-link {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #000000;
  }

  .form-item {
    min-height: 70px;
    height: 70px;
    max-height: 70px;
    direction: rtl;
  }

  .disabled-link {
    pointer-events: none;
    color: rgba(0, 0, 0, 0.3);
  }

  .input-prefix {
    color: rgb(158, 158, 158);
    padding: 0 0 0 6px;
  }
  .error {
    position: relative;
    top: -15px;
    color: red;
  }
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: inline-block;
    margin-right: 4px;
    font-size: 14px;
    line-height: 1;
    content: ' ';
  }
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    line-height: 1;
    content: '*';
  }

  .docTypeFormItem {
    .ant-form-item-label {
      padding-bottom: 6px !important;
    }
  }
  .ant-form-item-label {
    label {
      color: rgba(192, 192, 192, 1);
    }
  }

  .own-textArea {
    border: 1px solid #e7e7e7;
  }

  .ant-select-selection-item {
    padding-right: 0 !important;
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
  }
  @media only screen and (max-width: 407px) {
    .ownerFormTitle {
      font-size: 16px;
    }
  }
`
