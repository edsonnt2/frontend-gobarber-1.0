import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: #ff9000;
    bottom: calc(100% + 4px);
    width: 160px;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #312e38;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    opacity: 0;
    transition: opacity 0.4s, visibility 0.4s;
    visibility: hidden;

    ::before {
      content: '';
      border-color: #ff9000 transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
