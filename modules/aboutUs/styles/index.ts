import styled from 'styled-components'

export const AboutUsContainer = styled.section`
  min-height: inherit;
  padding: 1rem 6rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    padding: 2rem 0;
  }

  @media (max-width: 991px) {
    background: #ffffff;
    border: 1px solid #e7e7e7;
    border-radius: 16px;
    margin: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    .banner {
      position: absolute;
      top: 0;
      opacity: 0.5;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
    }
  }

  @media (max-width: 1074px) {
    .banner img {
      width: 70%;
    }
  }
`

export const AboutUsTitle = styled.section<{ bgSrc: string }>`
  width: 100%;
  height: 200px;
  background: url(${props => props.bgSrc}) no-repeat center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .subTitle {
    font-family: 'Lexend';
    font-style: 100;
    font-weight: 700;
    font-size: 45px;
    color: #1e1926;
    margin-bottom: 2rem;
    word-spacing: 50px;
    @media (max-width: 482px) {
      font-size: 25px;
      word-spacing: 35px;
    }

    @media (max-width: 320px) {
      font-size: 20px;
      word-spacing: 20px;
    }
  }

  .title {
    font-family: 'LEMONMILK';
    font-weight: bold;
    color: #188aec;
    margin-top: -2rem !important;
    letter-spacing: 4px;
    font-style: normal;
    font-size: 57.078px;
    @media (max-width: 482px) {
      font-size: 34.7642px;
    }
    @media (max-width: 320px) {
      font-size: 25px;
      word-spacing: 2px;
    }
  }

  .title-sub {
    font-family: 'LEMONMILK';
    color: #ffb800;
    font-weight: 400;
    letter-spacing: 0.1em;
    font-style: normal;
    font-size: 45px;
    @media (max-width: 482px) {
      font-size: 25px;
    }
    @media (max-width: 320px) {
      font-size: 15px;
      word-spacing: 2px;
    }
  }

  @media (max-width: 991px) {
    background-size: 30%;
  }
  @media (max-width: 350px) {
    height: 150px;
  }
`

export const AboutUsDescriptionContainer = styled.section`
  text-align: justify;
  direction: ${props => props.dir};
  .hTag {
    font-size: 14px !important;
    display: inline-flex;
  }
  div.ant-typography,
  .ant-typography p {
    margin-bottom: 0.2em;
  }
`
