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


export const NotificationWrapperBox = styled.div`
  position: absolute;
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};  /* Ensure interaction only when open */
  box-sizing: border-box;
  z-index: ${({ isOpen }) => (isOpen ? 9 : -1)};  /* Apply z-index: 9 when open, -1 when closed */
  display: flex;
  max-width: 100%;
  max-height: 100%;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out, z-index 0s linear; /* Ensure transition for opacity and visibility */
  opacity: ${({ isOpen }) => (isOpen ? 1 : 1)}; /* Set opacity: 1 when open, 0 when closed */

  background: #fff;
  top: 4px;
  width: 100px;
  min-width: 400px !important;
  top: 55px;
  right: 50px;
  height: 300px;
  padding: 25px;
  box-shadow: none;
`;



export const NBox = styled.div`
  width: 375px;
  padding: 25px 0;
  max-width: 375px;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 15px;
  box-shadow: none !important;
  height: 300px;

  background-color: #fff !important;
  box-shadow: 0 4px 34px #6560f01a !important;

`;

export const NInner = styled.div`
  margin-top: 10px;
  width: 100%;
    min-width: unset !important;
    max-width: unset !important;
  overflow: hidden !important;
  border-radius: 10px !important;
  background-color: none;
  box-shadow: unset;
  border-bottom: 1px solid #fff;
`;

export const NTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25px 25px;
    
`;
export const NLeft = styled.div`
 font-size: 16px; 
 strong{
    color: #212121;
 }
 span{
 color: #919aa3;
 }
`;
export const NRight = styled.div`
 strong{
    color: #0f79f3;
 }
`;
export const NMiddle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 18px 25px;
    border-bottom: 1px solid #e3e3e378;
`;
export const MLeft = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
`;

export const MLWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
 .right{

 }
 .left{

 }
`;


export const MLFigure = styled.div`
  margin: 0px;
`;

export const MLImage = styled.div`
 
`;
export const MRight = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: blue;
`;
export const MRText = styled.p`
 font-size: 16px;
 color: #477569;
 margin-bottom: 5px;
`;
export const MRPaper = styled.span`
 font-size: 14px; 
 color: #919AA3;
`;
export const NBottom = styled.div`
 
`;
