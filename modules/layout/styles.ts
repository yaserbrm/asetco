import styled from 'styled-components'

export const MainLayoutContainer = styled.div`
  .ant-layout {
    background: #fafafa;
  }
  .ant-menu-horizontal {
    border: unset;
  }
  .ant-layout-footer {
    background: #fafafa;
  }
  .layout-content {
    min-height: calc(100vh - 184px);
  }
`
export const HeaderWarper = styled.div`
  .header {
    background: transparent !important;
    padding: unset !important;
    margin: 16px !important;
    height: 40px;
  }
  .items-baseline-menu-item {
    align-items: baseline;
  }
  .logo {
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
  .loginButton {
    display: flex;
    align-items: center;
    justify-content: start;
    padding-top: 14px;
  }
  .basket-active {
    border-bottom: solid 1px red;
    border-bottom: solid 2px #188aec;
    color: black;
  }
  .ant-row {
    line-height: 40px;
  }
  .ghost {
    height: 32px !important;
  }
  .header-dashboard-link-item {
    text-align: right !important;
    color: red !important;
    display: block !important;
  }
  .loginDashboardLink {
    display: flex;
    align-items: center;
  }
  .loginDashboardLinkTitle {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #909195;
    margin: 0 0 0 7px;
  }
  .svg-arrow {
    z-index: 100;
  }
  .svg {
    position: relative;
    left: 5px;
  }

  .dashboard-dropdown-active {
    border-bottom: solid 2px #188aec;
    color: black;
    font-weight: 700;
  }
  .dashboard-dropdown-inactive {
    border: none;
    color: rgba(0, 0, 0, 0.85);
  }
  .badge {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cartText {
    white-space: nowrap;
  }
  .arrowDown {
    font-size: 16px;
    transform: translate(5px, 5px);
  }
  @media (min-width: 992px) {
    .logo {
      margin-top: 8px;
      justify-content: end;
    }
  }

  @media (max-width: 992px) {
    .headerText {
      display: none;
    }
    .logo {
      justify-content: center;
    }
    .header {
      margin: 24px 8px !important;
    }
  }

  @media (max-width: 350px) {
    .logo > img {
      width: 150px;
    }
  }
`
export const MenuContainer = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #1e1926;

  .ant-btn {
    background: none;
  }

  .ant-menu-root {
    display: flex;
    align-items: center;
    background: transparent;
    width: 100%;
    text-align: right !important;
    justify-content: center;
  }

  .ant-menu-horizontal > .ant-menu-item-selected a {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: #1e1926 !important;
  }

  @media (min-width: 992px) {
    .barsMenu {
      display: none;
    }
  }

  @media (max-width: 992px) {
    .mainMenu {
      display: none;
    }
    .barsMenu {
      display: inline-block;
    }
    .material-icons {
      margin-top: 14px;
    }
  }
`
export const FooterWarper = styled.div`
  .policies {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #188aec;
  }
  .enamadLogos {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 16px;
  }
  .companyName {
    margin-left: 4px;
    margin-right: 4px;
    color: #dea512;
    font-size: 18px;
    font-weight: bold;
  }
  .ant-layout-footer {
    padding: 8px 24px;
  }
  @media only screen and (max-width: 992px) {
    .footer {
      margin-top: 50px;
    }
    .policies {
      font-weight: 600;
      font-size: 15px;
      margin-top: 10px;
    }
    .companyName {
      margin-left: 0 0 0 1px;
    }
  }
  @media only screen and (max-width: 431px) {
    .policies {
      display: block;
      font-weight: 400;
      font-size: 11px;
      text-align: center;
    }
    .companyName {
      margin-left: 0 0 0 1px;
    }
  }
`

export const DashboardDropdownOverlay = styled.div`
  .dashboard-dropdown {
    padding: 0;
  }
  .dashboard-dropdown > .ant-dropdown-menu-item {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  .dashboard-dropdown > .ant-dropdown-menu-item > .ant-dropdown-menu-item-icon {
    margin-left: 8px;
    margin-right: 0;
  }
`

export const CartText = styled.span<{ hasCount: boolean }>`
  ${({ hasCount }) => (hasCount ? 'color:#FFB800;' : 'color:#909195;')}
`
