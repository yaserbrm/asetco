import styled from 'styled-components'

export const CardContainer = styled.div<{ lessHeaderBorder: boolean }>`
  .ant-card-cover {
    min-height: 213.48px !important;
  }
  .ant-card {
    background: #ffffff;
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
  }
  .ant-card-head {
    ${({ lessHeaderBorder }) => (lessHeaderBorder ? ' border-bottom:unset;' : '')}
  }
`
