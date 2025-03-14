import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;  
  background: #fff;
  padding: 25px;
  margin-bottom: 50px;
  box-sizing: border-box;
`;

export const Left = styled.div`
    box-shadow: none;
    border: none;
`;

export const Right = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column; 
    gap: 25px;
    
    h1 {
        font-size: 200px;
        display: inline-block;
    }

    h1::after {
        content: attr(data-last);
        color: green;
    }
`;