// src/style/login/style.js
import styled from 'styled-components';

// Styled components for styling the login page

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin: 110px auto 0 auto;
  padding-left: ${({ isCollapsed }) => (isCollapsed ? '60px' : '290px')}; /* Adjust based on collapse state */
  transition: padding-left 0.3s ease; /* Smooth transition */
  
  @media screen and (max-width: 767px) {
    padding: 15px;
  }
`;




