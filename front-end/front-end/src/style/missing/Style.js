import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 1240px;
  width: 100%;
  margin: 0px auto 0 auto;
  padding-left: ${({ isCollapsed }) => (isCollapsed ? '60px' : '60px')}; /* Adjust based on collapse state */
  transition: padding-left 0.3s ease; /* Smooth transition */
  justify-content: center;
`;

export const Figure = styled.figure`
    margin: 0px;
`;


export const Image = styled.img`

`;

export const H2 = styled.h2`
    margin-top: 1.5rem !important;
    font-weight: 500;
    margin: 0px;
    line-height: 1.5;
    color: #303030;
    font-size: 2.3em;
`;

export const Text = styled.p`
    font-size: 16px; 
    margin-bottom: 32px;
`;


export const Button = styled.button`

`;

