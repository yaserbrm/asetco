import styled from 'styled-components'

export const CarsImagesContainer = styled.div<{ imagePosition: number }>`
  margin-top: 186px;
  @media only screen and (max-width: 1280px) {
    margin-top: 135px;
  }
  .carsSection {
    background: rgb(157, 157, 157);
    background: linear-gradient(180deg, #e5e7ea 0%, #fafafa 100%);
  }
  .newCarCol {
    height: 17vh;
    transform: translateX(${({ imagePosition }) => imagePosition}vw);
    transition: 0.3s;
  }
  .oldCarCol {
    height: 17vh;
    transform: translateX(${({ imagePosition }) => imagePosition}vw);
    transition: 0.3s;
  }

  .newCar {
    width: 688px;
    transform: translate(-15%, -67%);
  }
  .oldCar {
    width: 688px;
    transform: translate(10%, -67%);
    @media only screen and (min-width: 1600px) {
      transform: translate(15%, -67%);
    }
    @media only screen and (min-width: 1750px) {
      transform: translate(20%, -67%);
    }
    @media only screen and (min-width: 1850px) {
      transform: translate(25%, -67%);
    }
    @media only screen and (min-width: 1950px) {
      transform: translate(30%, -67%);
    }
  }
`
