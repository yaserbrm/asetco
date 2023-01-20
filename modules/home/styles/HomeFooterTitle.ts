import styled from 'styled-components'

export const HomeFooterTitleContainer = styled.section`
  width: 100%;
  opacity: 0.7;
  margin-top: 1.2rem;
  text-align: center;
  .home_title {
    font-family: LEMONMILK;
    font-style: normal;
    font-weight: bold;
    font-size: 50px;
    line-height: 68px;
    color: #e7e7e7;
    margin-bottom: 0;
  }

  .home_subtitle {
    font-family: Lexend;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0.38em;
    color: #b9bbc2;
  }

  @media (max-width: 350px) {
    .home_title {
      font-size: 40px;
    }
    .home_subtitle {
      font-size: 18px;
      letter-spacing: 0.29em;
    }
  }
`
