import styled from 'styled-components'

export const WornCarImagesModalStyle = styled.div`
  top: 10px !important;
`

export const WornCarImagesModalTitle = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  .title {
    width: 100%;
    font-style: normal;
    font-weight: 700;
    font-size: 21px;
    line-height: 36px;
    text-align: right;
    color: #1e1926;
  }
  .subTitle {
    display: inline-flex;
    align-items: center;

    .fullName {
      font-style: normal;
      font-weight: 700;
      font-size: 13px;
      line-height: 22px;
      text-align: right;
      color: #909195;
    }
    .details {
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 17px;
      text-align: right;
      color: #b9bbc2;
    }
  }
`

export const WornCarImagesModalFooter = styled.div`
  display: inline-flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  div {
    padding: 0 10px;
  }
  .btn {
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-items: center;
    padding: 4px 8px;
  }
  .cancel {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 21px;
    text-align: right;
    color: #1e1926;
  }

  .cancel-icon {
    display: none;
  }

  .delete {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 21px;
    text-align: right;
    color: #1e1926;
  }
  .delete-icon {
    display: none;
  }

  @media only screen and (max-width: 400px) {
    .cancel {
      display: none;
    }
    .cancel-icon {
      display: block;
    }
    .delete {
      display: none;
    }
    .delete-icon {
      display: block;
    }
    .add-text {
      display: none;
    }
  }
`

export const CarouselWarper = styled.div`
  position: relative;

  .dots {
    height: 30px;
    transform: translateY(70px);
  }
  .dots li {
    border: 2px solid #909195;
    width: 10px !important;
    height: 10px !important;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dots li button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #909195 !important;
  }
  .dots .slick-active {
    & button {
      background: #188aec !important;
    }
  }
  .carouselHolder {
    width: 100%;
    padding: 0 32px;
    margin: 32px 0;
    background: #f5f5f5;
  }

  .carousel {
    width: 67.5%;
    max-height: 600px;
    margin-left: auto;
    margin-right: auto;

    .slick-list {
      min-height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .dotsHolder {
    height: 12px;
  }
  .next {
    position: absolute;
    right: 130px;
    bottom: 5px;
    cursor: pointer;
  }
  .prev {
    position: absolute;
    left: 130px;
    bottom: 5px;
    cursor: pointer;
  }
  @media only screen and (max-width: 400px) {
    .next {
      right: 40px;
    }
    .prev {
      left: 40px;
    }
  }
`

export const WornCarImageModalBody = styled.div`
  min-height: 440px;
  .tab-pane {
    height: 100%;
  }
  .content {
    height: 100%;
  }
  .noImage {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
`
