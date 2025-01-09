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
  transition: padding-left 0.3s ease; /* Smooth transition */
  
  @media screen and (max-width: 767px) {
    padding: 15px;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
   
    gap: 20px;
    transition: transform 0.3s ease;  /* Smooth transition for transform */
    will-change: transform;  /* Tell the browser to optimize for transform */
    
    /* Sidebar expanded state */
    &.sidebar-expanded{
      transform: translateX(290px); /* Using translateX for smoother transition */
      padding:0px 285px 0px 0px;

    }

    /* Sidebar collapsed state */
    &.sidebar-collapsed{
      padding:0px 70px 0px 0px;
      transform: translateX(80px); /* Using translateX for smoother transition */
    }
`;

export const Alert = styled.div`
  border-radius: 50%;
  /* background: #6f2036; */
  border: 0px;
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#000')};
  font-size: 13px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
  display: flex;
    align-items: center;
    justify-content: center;
`;
