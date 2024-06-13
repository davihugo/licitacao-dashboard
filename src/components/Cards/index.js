import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: linear-gradient(135deg, #204263, #1e3050);
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  padding: 20px;
  margin: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 15px 0;
  text-align: center;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
`;

const CardText = styled.p`
  margin: 5px 0;
  text-align: center;
  color: white;
  font-size: 1em;
`;

const Card = ({ title, value }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      {typeof value === 'string' || typeof value === 'number' ? (
        <CardText>{value}</CardText>
      ) : (
        value
      )}
    </CardContainer>
  );
};

export default Card;