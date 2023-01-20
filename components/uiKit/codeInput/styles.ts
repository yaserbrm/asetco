import styled from 'styled-components'

export const InputCodeContainer = styled.div<{ error?: boolean | undefined }>`
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 4px 16px;
  & div {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: row-reverse;
    & input {
      width: 30px;
      padding: 4px;
      /* margin-left: 10px; */
    }
  }
  .react-code-input {
    display: flex !important;
    justify-content: center;
  }
  .codeInput {
    width: 28px;
    height: 28px;
  }
  input:focus {
    outline: 0 0 2px 0;
    border-bottom: 2px solid #bbb;
  }
  input {
    text-align: center;
    outline: none;
    border: unset;
    border-radius: unset;
    border-bottom: 2px solid ${({ error }) => (error ? 'red' : ' #d9d9d9')};
  }
`
