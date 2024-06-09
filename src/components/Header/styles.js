import styled from 'styled-components';

export const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #204263;
  padding: 0 20px;
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
