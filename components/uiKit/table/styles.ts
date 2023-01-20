import styled from 'styled-components'

export const TableContainer = styled.div<{ headerBorder: boolean; maxHeight?: number; minHeight?: number; tableShadow?: boolean }>`
  background: #ffffff;
  ${({ tableShadow }) => tableShadow && 'box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);'}
  border-radius: 16px 16px 0px 0px;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;

  .rc-table-container {
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'unset')};
    /* ${({ minHeight }) => (minHeight ? `min-height:  ${minHeight}px;` : '')}; */
  }
  .rc-table-content {
    ${({ minHeight }) => (minHeight ? `min-height:  ${minHeight}px;` : '')};
  }
  .rc-table-thead {
    border-bottom: 1px solid #fdfdfd;
    & tr > :first-child {
      text-align: center;
    }
    .rc-table-cell {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 21px;
      /* identical to box height */
      padding: 10.5px 8px;

      text-align: right;

      color: rgba(0, 0, 0, 0.6);

      /* Inside auto layout */

      flex: none;
      order: 1;
      flex-grow: 0;
      background-color: #ffffff;
    }
  }
  .rc-table-tbody {
    .rc-table-row {
      .rc-table-cell {
        background-color: #ffffff;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 21px;
        /* identical to box height */

        text-align: right;

        color: rgba(0, 0, 0, 0.87);
      }
      & :first-child {
        text-align: center;
      }
    }
  }
  .rc-table {
    position: relative;
    box-sizing: border-box;
    color: #666;
    font-size: 12px;
    line-height: 1.5;
  }
  .rc-table-rtl {
    direction: rtl;
  }
  .rc-table table {
    width: 100%;
    border-spacing: 0px;
  }
  .rc-table th,
  .rc-table td {
    position: relative;
    box-sizing: border-box;
    padding: 0;
    padding: 16px 8px;
    white-space: normal;
    word-break: break-word;
    border-top: 0;
    border-left: 0;
    transition: box-shadow 0.3s;
  }
  .rc-table-rtl.rc-table th,
  .rc-table-rtl.rc-table td {
    border-right: 0;
  }
  .rc-table-cell-fix-left,
  .rc-table-cell-fix-right {
    z-index: 1;
  }
  .rc-table-cell-fix-right:last-child:not(.rc-table-cell-fix-sticky) {
    border-right-color: transparent;
  }

  .rc-table-rtl .rc-table-cell-fix-left:last-child {
    border-left-color: transparent;
  }

  .rc-table-cell-fix-left-first::after,
  .rc-table-cell-fix-left-last::after {
    position: absolute;
    top: 0;
    right: -1px;
    bottom: -1px;
    width: 20px;
    transform: translateX(100%);
    transition: box-shadow 0.3s;
    content: '';
    pointer-events: none;
  }
  .rc-table-cell-fix-right-first,
  .rc-table-cell-fix-right-last {
  }
  .rc-table-rtl .rc-table-cell-fix-right-first,
  .rc-table-rtl .rc-table-cell-fix-right-last {
    box-shadow: none;
  }
  .rc-table-cell-fix-right-first::after,
  .rc-table-cell-fix-right-last::after {
    position: absolute;
    top: 0;
    bottom: -1px;
    left: -1px;
    width: 20px;
    transform: translateX(-100%);
    transition: box-shadow 0.3s;
    content: '';
    pointer-events: none;
  }
  .rc-table-cell.rc-table-cell-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-left-first,
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-left-last,
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-right-first .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-right-last {
    overflow: visible;
  }
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-left-first .rc-table-cell-content,
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-left-last .rc-table-cell-content,
  .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-right-first
    .rc-table-cell.rc-table-cell-ellipsis.rc-table-cell-fix-right-last
    .rc-table-cell-content {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rc-table-cell.rc-table-cell-row-hover {
    background: rgba(255, 0, 0, 0.05);
  }
  .rc-table-ping-left .rc-table-cell-fix-left-first::after,
  .rc-table-ping-left .rc-table-cell-fix-left-last::after {
    box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.1);
  }
  .rc-table-ping-right .rc-table-cell-fix-right-first::after,
  .rc-table-ping-right .rc-table-cell-fix-right-last::after {
    box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.1);
  }
  .rc-table-expand-icon-col {
    width: 60px;
  }
  .rc-table-row-expand-icon-cell {
    text-align: center;
  }
  .rc-table thead td,
  .rc-table thead th {
    text-align: center;
    background: #f7f7f7;
  }
  .rc-table thead .rc-table-cell-scrollbar::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
    width: 1px;
    background: #f7f7f7;
    content: '';
  }
  .rc-table-rtl.rc-table thead .rc-table-cell-scrollbar::after {
    right: -1px;
    left: auto;
  }
  .rc-table-header {
    border-right: 0;
    border-bottom: 0;
  }
  .rc-table-placeholder {
    text-align: center;
  }
  .rc-table tbody tr td,
  .rc-table tbody tr th {
    background: #fff;
  }
  .rc-table-content {
    border-right: 0;
    border-bottom: 0;
    border-radius: 5px 0 0 0;
  }
  .rc-table-body {
    border-right: 0;
    border-bottom: 0;
    border-top: 0;
  }
  .rc-table-fixed-column .rc-table-body::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-right: 1px solid red;
    content: '';
  }
  .rc-table-expanded-row .rc-table-cell {
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.1);
    background: #f3f3f3;
  }
  .rc-table-expanded-row-fixed {
    box-sizing: border-box;
    margin: -16px -8px;
    margin-right: -10px;
    padding: 16px 8px;
    width: 100% !important;
  }
  .rc-table-expanded-row-fixed::after {
    position: absolute;
    top: 0;
    right: 1px;
    bottom: 0;
    width: 0;
    content: '';
  }
  .rc-table-row-expand-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: #aaa;
    line-height: 16px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid currentColor;
    cursor: pointer;
  }
  .rc-table-row-expand-icon.rc-table-row-expanded::after {
    content: '-';
  }
  .rc-table-row-expand-icon.rc-table-row-collapsed::after {
    content: '+';
  }
  .rc-table-row-expand-icon.rc-table-row-spaced {
    visibility: hidden;
  }

  .rc-table tfoot td {
    background: #fff;
  }

  .rc-table-sticky-holder {
    position: sticky;
    z-index: 2;
  }
  .rc-table-sticky-scroll {
    position: sticky;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    border-top: 1px solid #f3f3f3;
    opacity: 0.6;
    transition: transform 0.1s ease-in 0s;
  }
  .rc-table-sticky-scroll:hover {
    transform: scaleY(1.2);
    transform-origin: center bottom;
  }
  .rc-table-sticky-scroll-bar {
    height: 8px;
    background-color: #bbb;
    border-radius: 4px;
  }
  .rc-table-sticky-scroll-bar:hover {
    background-color: #999;
  }
  .rc-table-sticky-scroll-bar-active {
    background-color: #999;
  }

  .rc-table-cell {
    .rc-table-row-expand-icon.rc-table-row-collapsed,
    .rc-table-row-expand-icon.rc-table-row-expanded {
      border: none;
      font-size: 14px;
      vertical-align: baseline;
      font-weight: bold;
      color: #188aec;
    }
  }
`
export const EmailTableContainer = styled.div`
  .email {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    width: 80%;
    background: #f4f3f7;
    border-radius: 4px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .material-icons {
    font-size: 16px;
  }
  .showEmail {
    cursor: pointer;
  }
  .noEmail {
    cursor: default;
  }
`
export const ActionsButtonTableContainer = styled.div`
  .action {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    width: 100%;
    background: #f4f3f7;
    border-radius: 4px;
    flex: none;
    order: 0;
    flex-grow: 0;
    cursor: pointer;
  }
  .material-icons {
    font-size: 16px;
  }
`
export const UserStatusContainer = styled.div`
  display: flex;
  width: 95%;

  .left {
    width: 33%;
    height: 100%;
    border: 1px solid #f4f3f7;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
  }

  .center {
    width: 33%;
    height: 100%;
    border: 1px solid #f4f3f7;
    cursor: pointer;
  }
  .right {
    width: 33%;
    height: 100%;
    border: 1px solid #f4f3f7;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
  }
  .active {
    background: #00b499;
    color: #ffffff;
  }
  .disabled {
    background: #f4f3f7;
    cursor: no-drop;
  }
`
export const UserRoleTableContainer = styled.div`
  .userRoleButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    gap: 8px;
    border: 1px solid #f4f3f7;
    width: 90%;
    height: 29px;
    background: #f4f3f7;
    border-radius: 4px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`
export const UserRoleSearchTable = styled.div`
  width: 150px;
  .ant-input-affix-wrapper {
    height: 37px;
    margin: 3px 0px 4px 0px;
  }
  input {
    height: 24px;
  }
`
export const SelectionFormTable = styled.div`
  .listHolder {
    min-height: 100px;
  }
  .ant-list-split .ant-list-item {
    border-bottom: unset;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 21px;
    text-align: right;
    color: rgba(0, 0, 0, 0.87);
  }
  .submitButton {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;

    width: 118px;
    height: 29px;
    min-height: 29px !important;
    margin-right: auto;
    margin-left: auto;
    background: #f4f3f7;
    border-radius: 4px;
    font-style: normal;
    font-weight: 500;
    font-size: 12px !important;
    line-height: 21px;
    text-align: right;
    color: #1e1926;
    flex: none;
    order: 0;
    flex-grow: 0;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .rc-table-row-expand-icon rc-table-row-collapsed {
    display: none;
  }
`

export const SuggestedPricesTableContainer = styled.div<{ flexDir: string }>`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: ${props => props.flexDir};
  gap: 8px;
  .minPrice {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2px;
    color: rgba(239, 0, 0, 1);
  }
  .maxPrice {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2px;
    color: rgba(0, 180, 153, 1);
  }
`
export const TextStatusTableContainer = styled.div<{ status: number; hover: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
  ${({ hover }) =>
    hover
      ? `
  cursor:pointer;
  transition:0.3s all;
  &:hover{
    background: #FBFAFC;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  `
      : ''}
  .icon {
    font-size: 14px;
    font-weight: 900;
    color: ${({ status }) => (status === 0 ? '#EF0000' : status === 1 ? '#188AEC' : status === 2 ? '#FFB800' : '')};
  }
`
export const CarTypeTableContainer = styled.div`
  padding: 0px;
  gap: 4px;

  .typeCar {
    font-size: 11px;
    color: #1e1926;
    font-weight: 600;
  }

  .years {
    font-weight: 400;
    font-size: 10px;
    color: #909195;
  }

  .borderCarType {
    width: 12px;
    height: 0px;
    border: 1px solid #b9bbc2;
    transform: rotate(90deg);
  }
`
