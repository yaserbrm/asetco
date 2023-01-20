import styled from 'styled-components'

export const CartHeaderContainer = styled.div`
  margin-top: 75px;
  @media only screen and (max-width: 992px) {
    margin-top: 16px;
    margin-bottom: 32px;
  }

  @media only screen and (max-width: 595px) {
    display: flex;
    justify-content: space-between;

    .backButton {
      display: flex;
    }
  }
`
