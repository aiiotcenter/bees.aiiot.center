// src/style/login/style.js
import styled from 'styled-components';

// Styled components for styling the login page
export const Container = styled.section`
        width: 40%;
        padding: 15px;
        /* border: 1px solid rgba(0, 0, 0, 0.125); */
        border: 1px solid ${({ theme }) => (theme === 'light' ? '#80808021' : '#808080')};
        border-radius: 8px;
        /* background: #fff; */
        background: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};
        color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
        transition: 0.3s ease all;
        /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
        &:hover{
                /* background: ${({ theme }) => (theme === 'light' ? '#fff' : '#0b0e14')};
                transform: scale(1.05); */
                transform: scale(1.05);
    /* border-image: linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%) 1;  */
                background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#0b0e14')};
                box-shadow: 0 0 5px 2px rgba(0, 219, 222, 0.3), 0 0 10px 4px rgba(252, 0, 255, 0.3); 
        }
        @media screen and (max-width: 767px) {
            width: 100%;
        }
     
line {
        stroke: ${({ theme }) => (theme === 'light' ? '#fff' : '#ffffff73')};
        /* stroke: #ffffff73 !important;  */
    }
    text{
        tspan{
                color: ${({ theme }) => (theme === 'light' ? '#fff' : '#fff')};
                fill: ${({ theme }) => (theme === 'light' ? '#fff' : '#fff')};
                /* color: #fff !important;
                fill: #fff !important; */
        }
       
    }
`;
export const H2 = styled.h2`
            font-size: 18px;
            /* color: #6f2036; */
            color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
            margin-bottom: 10px;  
`;

export const P = styled.p`
margin-bottom: -15px;  
color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')}; 
`;

