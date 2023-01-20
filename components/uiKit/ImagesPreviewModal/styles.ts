import styled from 'styled-components'

export const TractImagesModalHeader = styled.section`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  .modal_info_Header {
    display: flex;
    flex-direction: column;
    text-align: right;

    .productName {
      font-weight: 700;
      font-size: 21px;
      text-align: right;
      color: #1e1926;
    }

    .productModel {
      font-weight: 500;
      font-size: 12px;
      line-height: 21px;
      text-align: right;
      color: #909195;
      margin-top: 5px;
    }
  }
`
