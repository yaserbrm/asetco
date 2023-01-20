import styled from 'styled-components'

export const HomeContainer = styled.div`
  overflow: hidden;

  .card-container {
    transform: translateY(60px);

    @media (max-width: 767px) {
      transform: translateY(5px);
    }
  }
  .card-column {
    display: flex;
    justify-content: flex-start;

    &:last-child {
      justify-content: flex-end;
    }

    @media (max-width: 767px) {
      justify-content: center;
      margin: 0.5rem 0;

      &:last-child {
        justify-content: center;
      }
    }

    @media (max-width: 362px) {
      flex-direction: column;
      align-items: center;
      .ant-card {
        margin: 0.3rem 0;
      }
    }
  }
  .newCarCard {
    @media only screen and (max-width: 992px) {
      img {
        transform: rotateY(180deg);
      }
    }
  }
  .autoPartsCard img {
    transform: translate(0px, -31px);
  }
  .homeBanner {
    height: 440px;

    @media (max-width: 950px) {
      visibility: hidden;
      height: 380px;
    }
  }
`
