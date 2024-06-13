import styled from 'styled-components';

export const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #204263, #5a85aa);
  box-shadow: 0 0 20px 3px;

  @media (max-width: 768px) {
    justify-content: center;
  }

  > svg {
    color: white;
    width: 30px;
    height: 30px;
    cursor: pointer;

    @media (max-width: 768px) {
      margin: 0 10px;
    }
  }
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  margin-left: 360px;

  &::before, &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    margin: 4px 0;
  }
`;
