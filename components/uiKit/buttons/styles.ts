import { Button } from 'antd'
import styled from 'styled-components'

export const ButtonContainer = styled(Button)`
  border-radius: 16px;
  height: 56px;
  &.ant-btn-primary {
    background: #188aec;
    border-color: #188aec;
  }
  &.ant-btn-primary:hover {
    transform: scale(0.97);
  }
  &.success {
    padding: 4px 8px;
    gap: 8px;

    /* success */
    color: #fff;
    background: #00b499;
    border-radius: 4px;
    /* Inside auto layout */
  }
  &.ghost {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    color: #b9bbc2;
    /* direction */

    border: 1px solid #b9bbc2;
    border-radius: 8px;
    transition: 0.3s;
  }
  &.ghost:hover {
    color: #7fb8e9;
    border: 1px solid #7fb8e9;
  }
`
