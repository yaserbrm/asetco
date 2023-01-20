import styled from 'styled-components'

export const TrackRecordsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 16px 16px;
  gap: 32px;
  width: 88%;
  margin: 0 auto;
  min-height: inherit;
  background: #ffffff;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  margin-top: 48px;
`

export const HeaderMenuContainer = styled.section`
  height: 60px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    width: 100%;
    justify-content: center;
    border: 0;
    li {
      font-weight: 400;
      font-size: 15px;
    }
    .ant-menu-item-selected {
      color: #1e1926;
    }
    .ant-menu-item:hover {
      color: #1e1926;
    }
  }
`

export const TableTrackRecordsContainer = styled.section`
  width: 100%;
  border: 1px solid #f5f5f5;
  background: #f5f5f5;
  min-height: 339px;

  .table-track-records {
    box-shadow: none !important;
  }

  .photos-icon-column {
    color: #188aec !important;
    font-size: 16px !important;
    cursor: pointer;
  }

  .users-list-sort-icon {
    font-size: 1rem;
  }
  .rc-table-cell,
  .rc-table-cell > span {
    font-weight: 600 !important;
    font-size: 12px;
    line-height: 21px;
    font-style: normal;
    color: rgba(0, 0, 0, 0.87);
  }

  @media (max-width: 592px) {
    .rc-table-row {
      cursor: pointer;
    }
  }
`

export const HeaderTitleContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 20px 16px 8px 0px;
  width: 100%;
  height: 84px;
  background: #ffffff;
  h1 {
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 24px;
    line-height: 1.35;
  }
  .user-name {
    font-weight: 700;
    font-size: 14px;
    color: #909195;
  }

  .user-phoneNumber {
    font-weight: 500;
    font-size: 12px;
    color: #b9bbc2;
  }
`
