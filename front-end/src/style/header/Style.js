// src/components/Header/Header.styles.js
import styled from 'styled-components';

export const Container = styled.div`
 background: ${({ theme }) => (theme === 'light' ? '#fff' : '#0c1017')};  /* Adjust background color */
  padding: 0 30px;
  min-height: 73px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: ${({ isCollapsed }) => (isCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 260px)')};
  display: inline-block;
  z-index: 99;
  margin: 0;
  transition: width 0.3s ease;
  margin-right: 0;
  margin-left: auto;
  color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')}; /* Change text color */
    /* Conditional shadow based on the theme */
    /* box-shadow: ${({ theme }) => theme === 'light' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : '0px 4px 6px rgba(255, 255, 255, 0.2)'}; */
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid hsla(210, 14%, 28%, 0.3);
  
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
`;

export const Left = styled.div`

`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const ModeWrapper = styled.div`
    cursor: pointer;
    width: 33px;
    height: 33px;
    color:${({ theme }) => (theme === 'light' ? '#6f2036' : 'none')};
    background:${({ theme }) => (theme === 'light' ? '#6f2036' : 'none')};
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid ${({ theme }) => (theme === 'light' ? '#80808021' : '#80808021')};
   
`;

export const NotificationWrapper = styled.div`
    cursor: pointer;
    width: 33px;
    height: 33px;
    /* color: #fff; */
    color:${({ theme }) => (theme === 'light' ? '#6f2036' : 'none')};
    background:${({ theme }) => (theme === 'light' ? '#6f2036' : 'none')};
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid ${({ theme }) => (theme === 'light' ? '#80808021' : '#80808021')};
     
`;

export const ExpandWrapper = styled.div`
   width: 33px;
   height: 33px;
   display: flex;
align-items: center;
justify-content: center;
cursor: pointer;

`;

export const Figure = styled.figure`
    margin: 0px;
`;

export const Image = styled.img`
    width: 50px;
    height: 50px;
`;

export const UserWrapper = styled.div`
svg{
            color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
            fill: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
        } 
`;

export const Icon = styled.div`

`;

export const Title = styled.h2`
    font-size: 35px;
    color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
    margin: 0;
`;

export const ToggleButtonWrapper = styled.div`

    svg{
            color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
            fill: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
        }
 
`;

export const Paper = styled.span`
      svg{
            color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
            fill: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
        }   
`;
