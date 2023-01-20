import styled from 'styled-components'

export const ProductDetailStyle = styled.div`
  background-color: #fff;
  margin-top: 15px;
  padding: 15px 0;
  .autoPart-image {
    text-align: center;
  }
  .image-gallery-icon.image-gallery-left-nav {
    top: 108%;
    left: 20%;
  }

  .image-gallery-icon.image-gallery-right-nav {
    top: 108%;
    right: 20%;
  }
  .image-gallery-svg {
    height: 46px;
    width: 36px;
    color: #9e9e9e;
  }
  .details-box > table {
    width: 100% !important;
    text-align: right;
  }
  .details-box > table > tbody {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  }
  .details-box > table > tbody > tr {
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width: 100%;
  }
  .details-box > table > tbody > tr > td:last-child {
    width: 30% !important;
  }
  .details-box > table > tbody > tr > td:first-child {
    width: 70% !important;
    text-align: center;
  }
  .details-box > table > tbody > tr > td > input {
    direction: ltr !important;
  }
  @media only screen and (max-width: 470px) {
    .image-gallery-icon.image-gallery-left-nav {
      top: 108%;
      left: 5%;
    }

    .image-gallery-icon.image-gallery-right-nav {
      top: 108%;
      right: 5%;
    }
  }
`

export const DetailTitle = styled.div`
  display: inline-flex;
  justify-content: start;
  margin-top: 85px;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  width: 100%;

  .name {
    color: #1e1926;
  }
  .brand {
    color: #b9bbc2;
  }
`

export const DetailButton = styled.div`
  width: 100%;
  margin-top: 24px;

  .button {
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .button > span {
    margin-left: 10px;
  }

  .ordered-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .delete-increase-decrease {
    width: 184px;
    height: 65px;
    background-color: #e9f5ff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  .delete-icon {
    cursor: pointer;
  }
  .input-box {
    display: inline-flex;
  }
  .ant-input-number-input {
    text-align: center;
    color: #000;
    width: 80%;
  }
  .increase-decrease {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    line-height: 65px;
  }
  .increase-decrease-btn {
    display: inline-flex;
  }
  .increase-decrease-btn > span {
    color: #188aec;
    font-size: 20px;
    font-weight: bold;
  }
`
