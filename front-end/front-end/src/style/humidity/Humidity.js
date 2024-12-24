import styled from 'styled-components';


// Styled components for styling the login page
export const Container = styled.section`
        width: 100%;
        padding: 15px;
        border: 1px solid ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 0, 0.125)' : 'hsl(220, 20%, 65%)')};
        border-radius: 8px;
        background: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};
        color: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: transform 0.3s ease;
        line {
        stroke: ${({ theme }) => (theme === 'light' ? '#fff' : '#ffffff73')};
        }
        text{
                tspan{
                        color: ${({ theme }) => (theme === 'light' ? '#fff' : '#fff')};
                        fill: ${({ theme }) => (theme === 'light' ? '#fff' : '#fff')};
                }
        
        }
        &:hover{
                background: ${({ theme }) => (theme === 'light' ? '#fff' : '#0b0e14')};
                transform: scale(1.02);
        }
`;
export const H2 = styled.h2`
font-size: 18px;
            color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
            margin-bottom: 10px;  
`;

export const P = styled.p`
margin-bottom: -15px;   
color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')}; 
`;


