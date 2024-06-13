import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1A202C;
  min-height: 100vh;
  margin-left: 200px;
  border-radius: 18px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const DashboardContent = styled.div`
  
  flex: 1;
  width: 100%;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 18px;
  font-size: 18px;
  z-index: 99; 

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 0px;
  }
`;


export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
`;

export const TableHeader = styled.th`
  background-color: #204263;
  color: white;
  padding: 10px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 14px;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 14px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
  `;

  export const PaginationButton = styled.button`
    background-color: #204263;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #4682B4;
    }
  
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  
    @media (max-width: 768px) {
      padding: 8px 16px;
      margin: 0 2px;
    }
  `;
  
  export const PageInfo = styled.span`
    margin: 0 10px;
  
    @media (max-width: 768px) {
      margin: 0 5px;
      font-size: 14px;
    }
  `;
  