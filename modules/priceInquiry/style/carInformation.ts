import styled from 'styled-components'

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  padding-bottom: 0;
  gap: 32px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const TitleContainerStyles = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 100%;
  h1 {
    font-weight: 700;
    font-size: 21px;
    line-height: 36px;
  }
  text-align: right;
`

export const ButtonContainerStyles = styled.section`
  margin-top: 32px;
  margin-bottom: 32px;
  .ButtonForm .ant-form-item-control-input-content {
    display: flex;
    justify-content: end;
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  .ButtonForm {
    .ant-btn-loading-icon {
      margin-left: 10px;
    }
    .save,
    .cancel {
      width: 92px;
      padding: 4px 10px 4px 8px;
      height: 32px;
      border-radius: 4px;
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
      background: #f4f3f7;
      border: none;
    }
    .save {
      background: #188aec;
      border: none;
      color: #fff;
      span {
        color: #fff;
      }
    }
  }
`

export const SelectContainerStyled = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 0;
  padding: 32px;
  gap: 24px;
  width: 100%;
  height: 100%;
  border: 2px solid #f0f0f0;
  border-radius: 8px;

  @media (max-width: 420px) {
    padding: 16px;
  }

  .option-text-right {
    text-align: right;
  }
  .attachFormTitle {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 36px;
    text-align: right;
    color: #1e1926;
    margin-top: 32px;
  }
  .attachFormDescription {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-align: right;
    color: #909195;
    margin-top: 10px;
  }
  .attach-box {
    padding-bottom: 10px;
  }
  .attach-item {
    margin-top: 20px;
    border-bottom: 1px solid #f0f0f0;
  }
  .textArea {
    border: 1px solid #f0f0f0 !important;
  }
  .ant-select-arrow {
    right: 87%;
    color: #9e9e9e;
    @media (max-width: 768px) {
      right: 95%;
    }
  }

  .ant-select-selector {
    border: none !important;
    /* border-bottom: 1px solid #d9d9d9 !important; */
  }

  .ant-col .ant-form-item-label {
    text-align: right !important;
  }

  .ant-select-selection-item {
    padding-right: 0 !important;
    color: #9e9e9e;
  }

  .ant-form-item-label label {
    color: #c0c0c0;
    flex-direction: row-reverse;
  }

  .ant-input {
    border: 1px solid #d9d9d9;
  }

  .ant-input:focus {
    border: inherit;
    box-shadow: none;
    outline: 0;
  }
  .borderBottom {
    margin-bottom: 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .ant-input:hover {
    border: 1px solid #d9d9d9;
  }
  .ant-form-vertical .ant-form-item-label {
    text-align: right !important;
  }
  .ant-form-item-label > label {
    font-weight: 500 !important;
    font-size: 14px !important;
    line-height: 24px !important;
    color: #909195 !important;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector,
  .ant-input {
    height: 40px;
    width: 100%;
    border: none;
  }

  .ant-input:hover {
    background: #fbfafc;
    border: none;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 40px;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding-right: 0px;
    position: relative;
    right: -11px;
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
  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background: none;
  }
  .ant-picker-clear {
    right: unset;
    left: 4px !important;
  }
  .ant-picker-focused {
    box-shadow: none;
  }
  .ant-upload-list.ant-upload-list-picture-card {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    width: 100%;
  }

  .image-formats-txt {
    font-weight: bold;
  }

  @media (max-width: 1200px) {
    .responsiveMargin {
      margin-top: 12px;
    }
  }
`
