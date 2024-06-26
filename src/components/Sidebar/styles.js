import styled from 'styled-components';



export const Container = styled.div`
  background-color: #204263;
  position: fixed;
  height: 100%;
  font-size: 30px;
  top: 0;
  left: 0;
  width: 300px;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 100; 
  &.open {
    transform: translateX(0);
    z-index: 101; 
  }

  @media (min-width: 769px) {
    transform: translateX(0);
  }

  
`;

export const MenuIcon = styled.div`
  position: fixed;
  
  top: 20px;
  left: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1000;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

export const Content = styled.div`
  margin-top: 23px;
  
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfilePic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const NameInput = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const EmailInput = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
`;
