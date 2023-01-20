import styled from 'styled-components'

export const FinallyModalContainer = styled.div`
  .typography {
    margin-top: 32px;
    display: flex;
    padding: 16px;
    gap: 32px;
    border: 1px solid #e7e7e7;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 20px;
      margin-top: 56px;
      margin-bottom: 40px;
      text-align: center;
    }
    .paragraph {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 29px;
      /* or 207% */

      text-align: right;
      margin-bottom: 56px;

      /* menu off */

      color: #909195;
    }
  }
  .closeButton {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 10px;
    width: 100%;
    margin-top: 32px;
    background: #f4f3f7;
    border-radius: 8px;
    border: none;
  }

  .logo {
    transform: scale(1);
    height: 200px;
  }
`
