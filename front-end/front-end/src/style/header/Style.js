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
    box-shadow: ${({ theme }) => theme === 'light' ? 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' : 'none'};
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid hsla(210, 14%, 28%, 0.3);
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px; */
  
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
    background:${({ theme }) => (theme === 'light' ? '#fff' : 'none')};
    padding: 0.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid ${({ theme }) => (theme === 'light' ? '#80808021' : '#80808021')};
    position: relative;
     .alert{
      position: absolute;
      right:-13px;
      top: -5px;
     }
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
  top: 40px;
  right: -2px;
    width: 375px;
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#2c3e50')};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 0;
  /* min-height: 300px; */
  /* height: auto; */
  margin: 0px;
  /* background-color: #fff; */
  overflow: scroll;
  max-height: 300px;
`;



export const NBox = styled.div`
/* background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#2c3e50')}; */
padding-top: 0px;
`;

export const NInner = styled.div`
  margin-top: 10px;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#2c3e50')};
  box-shadow: unset;
  /* border-bottom: 1px solid #fff; */
`;

export const NTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25px 25px;
    /* background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#2c3e50')}; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    position: sticky;
    top: 0px;
    background: #fff;
    padding-top: 10px;
    
`;
export const NLeft = styled.div`
 font-size: 16px; 
 strong{
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
 }
 span{
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
 }
`;
export const NRight = styled.div`
 strong{
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
 }
`;
export const NMiddle = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 18px 25px;
    border-bottom: 1px solid #80808014;
    
    transition: 0.3s ease all;
    &:hover{
      background-color: ${({ theme }) => (theme === 'light' ? '#f1f1f1' : '#34495e')};
    }
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
 color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
 margin-bottom: 5px;
`;
export const MRPaper = styled.span`
 font-size: 14px; 
 color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
`;
export const NBottom = styled.div`
 
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 62px;  
  right: 10px;
  width: 150px;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#2c3e50')};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => (theme === 'light' ? '#f1f1f1' : '#34495e')};
  }
`;


export const MiddleWrapper = styled.div`
  overflow: auto;
`;
