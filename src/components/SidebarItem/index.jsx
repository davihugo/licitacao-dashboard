import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const IconContainer = styled.div`
  margin-right: 10px;
`;

const TextContainer = styled.span`
  font-size: 16px;
`;

const SidebarItem = ({ Icon, Text, onClick }) => {
  return (
    <ItemContainer onClick={onClick}>
      <IconContainer>
        <Icon size={20} />
      </IconContainer>
      <TextContainer>{Text}</TextContainer>
    </ItemContainer>
  );
};

export default SidebarItem;
