import styled from 'styled-components'

interface IHomeCardContainer {
  titleBorder: boolean
}
export const HomeCardContainer = styled.div<IHomeCardContainer>`
  .homeCard {
    .ant-card-head {
      ${({ titleBorder }) => (titleBorder ? 'border-bottom: 1px solid #f0f0f0 ;' : 'border-bottom: unset;')}
      .ant-card-head-title {
        font-weight: 800;
        font-size: 24px;
      }
    }
    .ant-card-body {
      ${({ titleBorder }) => (titleBorder ? 'border-bottom: 1px solid #f0f0f0 ;' : 'border-bottom: unset;')}
      padding: 0 24px;
    }
    .ant-card-actions {
      ${({ titleBorder }) => (titleBorder ? 'border-top: 1px solid #f0f0f0 ;' : 'border-top: unset;')}
      background: transparent;
      text-align: left;
      & > li > span {
        display: flex;
        justify-content: end;
      }
    }
    & {
      background: transparent;
    }
    .cardButton {
      z-index: 10;
      position: relative;
      margin: 24px;

      @media only screen and (max-width: 992px) {
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        width: 95%;
      }
    }
    .carImage {
      position: absolute !important;
      top: 0;
      @media only screen and (min-width: 992px) {
        display: none !important;
      }
    }
    .homeCard_description {
      text-align: justify;
    }
  }
`
