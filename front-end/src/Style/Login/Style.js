// src/styles/SidebarStyles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
    max-width: 686px;
    width: 100%;
    margin: 0 auto;
    h1{
        padding-bottom: 10px;
        text-align: center;
    }
    p{
        padding-bottom: 60px;
        text-align: center; 
    }
`;

export const Container = styled.div`
    background: #fff;
    border-radius: 8px;
    border: 1px solid #E9E9E9;
    box-shadow: 0px 6px 15px 0px #404F680D;
    padding: 50px;
    text-align: left; 
    h2{
        padding-bottom: 20px;
    }
    p{
        padding-bottom: 30px;
        text-align: left; 
        span{
            color: #5BBB7B;
            cursor: pointer;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap:20px;
    button{
        width: 100%;
        height: 60px;
        border-radius: 4px;
        text-align: center;
        align-items: center; 
        justify-content: center; 
        display: flex; 
        padding: 0px;
        margin-bottom: 20px;
    }
`;

export const InputGroup = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`;

export const Label = styled.label`
    font-weight: 500;
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 0%;
    margin-bottom: 5px;

`;

export const Input = styled.input`
    width: 586px;
    height: auto;
    border-radius: 4px;
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    padding: 21px 14px;
    box-sizing: border-box;
    &:focus{
        outline: none;
    }
    &::placeholder{
        font-weight: 400;
        font-size: 15px;
        line-height: 28px;
        letter-spacing: 0%;
        color: #626974;

    }
`;



export const PaymentWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 23px;
`;

export const PaymentBox = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border-radius: 8px;
    width: 200px;
    height: auto;
    transition: 0.3s ease all;
    cursor: pointer;
    text-align: center;
    
    border: ${({ variant }) =>
        variant === "second" ? "1px solid #D93025" :
        variant === "third" ? "none" : "1px solid #1967D2"};
    
    background: ${({ variant }) => (variant === "third" ? "#041E42" : "transparent")};
    color: ${({ variant }) => (variant === "third" ? "#fff" : "#000")};

    &:hover {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
`;



export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  padding-bottom: 0px !important;
`;
