import styled from 'styled-components'

export const ContactContainer = styled.section`
  height: 100%;
  padding: 32px 16px;
  background: url('/assets/svg/contact/earth.svg') no-repeat center;
  background-size: contain;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0%;
    left: 0;
    width: 100px;
    height: 100%;
    background: url('assets/svg/contact/leftCircleContact.svg') no-repeat;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0%;
    right: 0;
    width: 78px;
    height: 100%;
    background: url('assets/svg/contact/rightCircleContact.svg') no-repeat;
    z-index: 0;
  }

  @media (max-width: 767px) {
    background-size: 50%;
    background-position: -15% 20%;

    &::before,
    &::after {
      display: none;
    }
  }
`

export const FormContactContainer = styled.section`
  padding: 32px;
  gap: 20px;
  width: 80%;
  background: #ffffff;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  z-index: 1;

  @media (max-width: 991px) {
    padding: 25px 16px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`

export const FormContactTitleContainer = styled.section`
  width: 100%;
  text-align: center;

  .ant-typography {
    color: #909195;
  }
`

export const FromButtonContactContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 32px;
  .ant-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    font-size: 1rem;
    width: 150px;
    height: 43px;
    background: #188aec;
    border-radius: 4px;
    border: none;

    &[disabled] {
      color: #fff;
      background: #7fb8e9;
    }
    &[disabled]:hover {
      background: #7fb8e9;
    }
  }
`

export const QuestionContactContainer = styled.section`
  box-sizing: border-box;
  padding: 32px;

  width: 100%;
  border: 2px solid #f0f0f0;
  border-radius: 8px;

  .ant-input:not(textArea) {
    border: none;
    border-bottom: 1.04px solid #e7e7e7;
    border-radius: 0;
  }

  .ant-input-textarea {
    height: 90px;
    &:after {
      float: left !important;
    }
  }

  textArea {
    border: 1px solid #e7e7e7;
    height: 100px;
    border-radius: 8px;
    resize: none;

    &:focus {
      outline: none;
      border: 1px solid #e7e7e7;
    }
    &:hover {
      border: 1px solid #e7e7e7;
    }
  }

  .ant-col .ant-form-item-label {
    text-align: right;

    label {
      color: #c0c0c0;
    }
  }

  .ant-form-item-required::before {
    display: none !important;
  }

  //input code
  .inputCodeContact {
    width: 20%;
    padding: 0;
  }

  @media (max-width: 575px) {
    .securityCode-label-center {
      .ant-form-item-label {
        text-align: center !important;
      }
    }
  }

  @media (max-width: 991px) {
    padding: 25px 16px;
  }
`

export const ConcatList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  z-index: 2;
  margin-left: auto;

  @media (max-width: 304px) {
    width: 100%;
    margin-left: 0;
  }
`

export const ConcatListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  padding: 0.5rem 0 1rem 1.5rem;
  z-index: 2;

  &:last-child {
    border-bottom: none;
  }

  .contact-icon {
    color: #7fb8e9;
    margin-left: 1.2rem;
  }

  .email-text-gray {
    color: #909195;
  }

  @media (max-width: 304px) {
    padding: 5px 0;
  }
`

export const SecurityCodeContainer = styled.section`
  border: 1px solid #b9bbc2;
  border-radius: 7px;
  position: relative;
  height: 50px;
  background: #e6efff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .refreshIcon {
    position: absolute;
    left: 15px;
    top: 14px;
    cursor: pointer;
    color: #909195;
  }

  .securityCodeImage {
    border-radius: 7px;
    max-width: 200px;
    height: 44px !important;
  }
`
