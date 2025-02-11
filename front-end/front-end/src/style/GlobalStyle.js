import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;  
`;

export const Main = styled.main`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: #F0EFEC;
  height: 100vh;
`;

export const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: #F0EFEC;
  padding-top: 5%;
  border-radius: 4px;
`;

export const Container = styled.div`
  padding: 60px;
  width: 100%;
`;

// New Figure component
export const Figure = styled.figure`
  margin: 0;
  text-align: center;
  background: transparent;
`;

// New Image component
export const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
`;

// Optional: Styling for the figcaption
export const FigCaption = styled.figcaption`
  margin-top: 8px;
  font-size: 14px;
  color: #555;
`;


export const FormWrapper = styled.form`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px 20px;
  box-sizing: border-box;
`;

export const InputGroup = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    max-width: 400px;
    width: 100%;
`;

export const Label = styled.div`
    font-weight: 500;
    font-size: 15px;
    line-height: 28px;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    border: 1px solid #E9E9E9;
    height: 55px;
    border-radius: 4px;
    padding: 0px 15px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    transition: 0.3s ease all;
    &::placeholder{
      color: #6B7177;
      font-size: 15px;
      font-weight: 400;
    }
    &:hover{
      border-color: #1F4B3F;
    }
    &:focus{
      outline: none;
      border-color: #1F4B3F;
    }
`;