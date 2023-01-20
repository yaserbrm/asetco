import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: IRANYekanFNBold ;
    src: url(/assets/fonts/IRANYekanBoldFaNum.ttf);
  }
  @font-face {
    font-family: IRANYekanFNMedium ;
    src: url(/assets/fonts/IRANYekanMediumFaNum.ttf);
  }
  @font-face {
    font-family: IRANYekanFN ;
    src: url(/assets/fonts/IRANYekanRegularFaNum.ttf);
  }
  @font-face {
    font-family: Lexend ;
    src: url(/assets/fonts/LexendDeca-ExtraLight.ttf);
  }
  @font-face {
    font-family: LEMONMILK ;
    src: url(/assets/fonts/LEMONMILK-Light.otf);
  }
  
body{
    background-color: #FAFAFA;
    font-family:IRANYekanFN !important;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.ant-input-affix-wrapper{
    border-radius: 8px;

}
input{
height: 40px;
background: #FFFFFF;
border: 1px solid rgba(0, 0, 0, 0.38);
border-radius: 8px;

}

textArea{
  resize: none;
}

.ant-btn-primary{
  border-color:#0059FF ;
  background: #0059FF;
}

/* start confirm close modal */
.confirm-close-modal .ant-modal-wrap{
  width: 292.95px;
  height: 158px;
}
.confirm-close-modal .ant-modal-content{
  border-radius: 8px;
}
.confirm-close-modal .ant-modal-header {
  border-radius: 8px;
}
.confirm-close-modal .ant-modal-title{
  text-align: right;
}
.confirm-close-modal .ant-modal-footer{
    text-align: center;
}

.confirm-close-modal .ant-modal-close {
  left: 0!important;
}


.confirm-close-modal .ant-modal-footer .ant-btn.ant-btn-default{
width: 71px;
height: 31px;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 21px;
text-align: center;
color: #1E1926;

}
/* end confirm close modal */

.ant-select:not(.ant-select-customize-input) .ant-select-selector,.ant-input{
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.38);
  background:#fff;
        }
.ant-input:hover{
  background: #FBFAFC;
  border: 1px solid rgba(0, 0, 0, 0.38);
}
.ant-input:focus{
  background: #FFFFFF;
  border: 1px solid #669BFF;
  box-shadow:none;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector:hover {
  background: #FBFAFC;
  border:none;
}
.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
  background: #FFFFFF;
  border:none;
  box-shadow:none;
}
.ant-select-item-option-content{
  text-align: right;
}


.ant-modal-content{
  border-radius: 8px;
}

.ant-drawer-body > .ant-menu-root > .ant-menu-submenu > .ant-menu-submenu-title > .ant-menu-title-content {
  position: absolute;
  right: 13px;
}
.ant-drawer-body > .ant-menu-root > .ant-menu-submenu > .ant-menu-submenu-title > .ant-menu-submenu-arrow {
 position: absolute;
 left: 5px;
}
.ant-drawer-body > .ant-menu-root > .ant-menu-item > .ant-menu-title-content {
 text-align: right;
}


//toast alert
.toastBody {
  font-family:IRANYekanFN !important;
}
.ant-btn-loading{
  background-color: #188aec90 !important
}

`
