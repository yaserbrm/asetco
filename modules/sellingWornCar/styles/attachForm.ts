import styled from 'styled-components'

export const AttachFormWrapper = styled.div`
  min-height: calc(100vh - 184px);
  line-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 67px;
  .attachForm {
    width: 100%;
    padding: 32px;
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  .attachFormRow {
    border-radius: 10px;
    margin-top: 32px;
  }
  .attachFormTitle {
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 36px;
    text-align: right;
    color: #1e1926;
  }
  .attachFormDescription {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
    color: #909195;
    margin: 32px 0;
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
  .attach-item-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    text-align: right;
    color: rgba(0, 0, 0, 0.6);
  }
  .attach-item {
    border: solid 1px rgba(0, 0, 0, 0.2);
  }
  .attach-item hr {
    margin-top: 15px;
  }
  .attach-item-title {
    margin-top: 16px;
    margin-right: 27px;
  }
  .attach-item .attach-item-upload {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .attach-item-description {
    padding: 0 16px;
  }
  .ant-form-item-explain-error {
    position: relative;
    top: -13px;
    right: 10px;
  }

  .ant-upload-list.ant-upload-list-picture-card {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
    width: 100%;
    @media (max-width: 701px) {
      justify-content: center;
    }
    .document_textArea {
      border: 1px solid red !important;
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
  }
`
