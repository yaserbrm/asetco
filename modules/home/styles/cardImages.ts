import { Card } from 'antd'
import styled from 'styled-components'

export const CardImagesBox = styled(Card)`
  gap: 18.5px;
  width: 170px;
  height: 270px;
  background: #ffffff;
  background-blend-mode: multiply;
  mix-blend-mode: normal;
  box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  margin: 0 0.5rem;
  z-index: 1;

  &:hover {
    box-shadow: none;
  }

  .ant-card-body {
    padding: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .ant-carousel {
    width: 100%;
  }
`

export const CardBannerBox = styled.section<{ EllipsBg: string }>`
  width: 170px;
  height: 150px;

  .circle-bg {
    height: 100%;
    background: #e7e7e7;
    border-radius: 50%;
    display: flex;
    margin: 0 auto;
    background: url(${props => props.EllipsBg}) no-repeat;
  }
`

export const CardImagesTitleBox = styled.section`
  font-weight: 800;
  line-height: 24px;
  text-align: center;
  color: #1e1926;

  .ant-typography {
    width: 120px;
    font-size: 14px;
  }
`

export const CardImagesButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  cursor: default;

  span {
    color: #188aec;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
`
