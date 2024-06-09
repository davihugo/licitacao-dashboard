import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: #204263;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
`;

export const FormLabel = styled.label`
  margin-top: 10px;
  font-size: 18px;
  color: #EFE0C5;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const FormInput = styled.input`
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
  width: 100%;
  border: none;
  border-radius: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const FormButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 5px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
