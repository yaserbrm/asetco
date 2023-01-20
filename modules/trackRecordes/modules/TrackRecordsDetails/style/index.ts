import styled from 'styled-components'

export const TrackRecordsDetailsContainer = styled.section`
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
  border-radius: 8px;
  margin: 1rem;
`

export const DetailTitleHeaderContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  border-radius: 16px 16px 0px 0px;

  .text-current-page {
    font-size: 12px;
    text-align: right;
    color: #909195;
  }

  .backBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 44px;
    height: 44px;
    background: #fefefe;
    box-shadow: 0px 2px 2px rgba(185, 187, 194, 0.43);
    border-radius: 8px;
  }
`

export const TrackDetailContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 21px;
  width: 100%;
  min-height: 760px;
  background: #ffffff;
  border-radius: 8px;

  .anticon .anticon-delete {
    display: none;
  }

  .row-detail {
    width: 100%;
    border-bottom: 1px solid rgba(244, 243, 247, 0.75);
    height: 53px;

    &:last-child {
      border-bottom: none;
    }
  }

  .title-detail-header {
    margin-left: auto;
    margin-bottom: 2rem;
    .title-detail {
      font-weight: 600;
      color: #3b3742;
      font-size: 14px;
    }
  }

  .text-align-right {
    text-align: right;
  }

  .ant-typography {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    color: #1e1926;
  }

  .image-wrapper {
    overflow-x: scroll;
    width: 400px;
    display: flex;
    flex-direction: row-reverse;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 486px) {
      width: 340px;
    }

    @media (max-width: 428px) {
      width: 290px;
    }

    @media (max-width: 358px) {
      width: 230px;
    }
    @media (max-width: 300px) {
      width: 170px;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .images-detail {
    display: flex;
    border-bottom: 1px solid rgba(244, 243, 247, 0.75);
    padding-bottom: 1.2rem;
    width: 500px;
    direction: rtl;

    .img-box {
      cursor: pointer;
      width: 88px;
      height: 88px;
      border: 1px solid #d9d9d9;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
    }
  }

  .ant-upload-list {
    flex-direction: row !important;
  }

  .ant-upload.ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 88px;
    height: 88px;
  }
`

export const TabWornCarImagesContainer = styled.section`
  width: 100%;
  height: 68px;
  background: #fff;
  border-radius: 8px;
  padding-top: 9px;

  .ant-tabs-top > .ant-tabs-nav::before {
    display: none;
  }

  .ant-tabs-tab-btn {
    color: #909195;
  }

  .ant-tabs-tab-active > .ant-tabs-tab-btn {
    font-weight: 400;
    font-size: 14px;
    color: #3b3742;
  }
`
