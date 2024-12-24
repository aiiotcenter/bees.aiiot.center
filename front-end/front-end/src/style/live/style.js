// src/style/login/style.js
import styled from 'styled-components';

// Styled components for styling the login page

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  margin: 0px auto 0 auto;
  padding-left: ${({ isCollapsed }) => (isCollapsed ? '60px' : '60px')}; /* Adjust based on collapse state */
  transition: padding-left 0.3s ease; /* Smooth transition */
  
  @media screen and (max-width: 767px) {
    padding: 15px;
  }
`;

export const LiveWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
  width: 100%;
  height: auto;  /* Adjust the height as necessary */
  position: relative;
  border-radius: 8px;  /* Optional: Adds rounded corners */
  overflow: hidden;  /* Ensures content stays inside the container */
 /* Box shadow for visual effect */
  max-width: 1240px;
  margin-bottom: 72px;
  /* 1px solid #3d47514d; */
  border:1px solid ${({ theme }) => (theme === 'light' ? '#80808021' : '#3d47514d')};

  
`;

export const Text = styled.h2`
    /* background: #fff; */
    /* background: #0c1017; */
    background: ${({ theme }) => (theme === 'light' ? '#fff' : '#0c1017')};
    color: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};

    width: 100%;
    padding: 15px 15px;
    /* color: #6f2036; */
    color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
   /* Box shadow at the bottom */
`;



export const ScreenWrapper = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
    /* background: #000; */
    color: ${({ theme }) => (theme === 'light' ? '#000' : 'transparent')};
`;

export const Image = styled.img`
   width: 100%;
   height: 100%;
   object-fit: cover;
   position: absolute;
   top: 0;
   left: 0;
`;

export const Frame = styled.iframe`
 position: absolute;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
`;

export const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  /* Add additional styles for your slider here */
`;

export const Button = styled.button`

`;