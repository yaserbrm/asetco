import styled from 'styled-components'

export const LoginFormWraper = styled.div`
  min-height: calc(100vh - 184px);
  line-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .LoginFormLogo {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .LoginFormCodeLogo {
    display: flex;
    margin-top: 20px;
  }
  .logo {
    width: 93%;
    display: flex;
    justify-content: center;
  }
  .back-arrow {
    width: 7%;
    cursor: pointer;
  }

  .LoginFormTitle {
    height: 41px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 41px;
    text-align: right;
    color: #1e1926;
    margin-top: 40px;
  }
  .LoginFormTitleDes {
    direction: rtl;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    height: 24px;
    color: #909195;
    margin-top: 40px;
  }
  .login-form-mobile-input {
    text-align: right;
    border-radius: 8px;
    margin-top: 10px;
  }
  .LoginForm {
    width: 100%;
    border: solid 1px rgba(0, 0, 0, 0.2);
    padding: 20px 20px;
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
  }
  .inputCode {
    margin-top: 15px;
  }

  .resent-time-container {
    min-height: 30px;
    height: 30px;
    max-height: 30px;
  }

  .LoginActiveCodeFormResend {
    display: flex;
    justify-content: space-between;
  }

  .FormSubmit {
    min-height: 60px;
    border-radius: 8px;
    font-size: 20px;
    line-height: normal;
    min-height: 60px;
  }
  .MobileFormSubmit {
    margin-top: 40px;
  }
  .CodeFormSubmit {
    margin-top: 20px;
  }

  .active-code-input {
    text-align: center;
    border-radius: 8px;
  }

  .active-code-resend-link {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #000000;
    cursor: pointer;
  }

  .form-item {
    min-height: 70px;
    height: 70px;
    max-height: 70px;
    direction: rtl;
  }

  .disabled-link {
    pointer-events: none;
    color: rgba(0, 0, 0, 0.3);
  }

  .input-prefix {
    color: rgb(158, 158, 158);
    padding: 0 0 0 6px;
  }
`
