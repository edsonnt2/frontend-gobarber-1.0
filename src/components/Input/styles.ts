import styled, { css } from 'styled-components';
import Tooltil from '../Tooltip';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<InputProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #666360;
  padding: 0 16px;
  width: 100%;
  display: flex;
  align-items: center;

  ${({ isFilled }) =>
    isFilled &&
    css`
      color: #ff9000;
    `}

  ${({ isError }) =>
    isError &&
    css`
      border-color: #c53030;
      color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 13px;
  }

  input {
    padding: 16px 0;
    background: transparent;
    color: #e4ddd8;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltil)`
  display: flex;
  align-items: center;
  height: 38px;
  margin-left: 13px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    ::before {
      border-color: #c53030 transparent;
    }
  }
`;
