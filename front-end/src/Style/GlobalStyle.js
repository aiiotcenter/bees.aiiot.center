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
  object-fit: cover;
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

export const Button = styled.button`
  background-color: #78091e;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 0px 0px;
  &:focus{
    outline: unset;
  }

  &:hover {
    background-color: #78091e;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #E9E9E9;
  }
thead{
  background-color: #F1FCFA;
}
  th {
    
    font-weight: 500;
    font-size: 17px;
    line-height: 28px;
    padding: 21px 0px 21px 21px;
    border-bottom: 0px;
    &:last-child{
      display: flex;
    justify-content: center;
    padding-right: 21px;
    padding-left: 0px;

    }

  }

  tr:hover {
    /* background-color: #f9f9f9; */
  }

  tbody tr:nth-child(even) {
    /* background-color: #f8f8f8; */
  }

  td {
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    padding: 21px 0px 21px 21px;
    height: auto;
    &:last-child{
      display: flex;
    justify-content: flex-end;
    padding-right: 21px;
    padding-left: 0px;

    }
  }

  @media (max-width: 768px) {
    th, td {
      padding: 10px;
    }
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto; // Ensures horizontal scrolling for smaller screens
  padding: 30px;
  /* background: #FFFFFF; */
  border-radius: 4px;
  width: 100%;

  .role-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: auto;
  border-radius: 6px;
  padding: 6px 11.5px;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0%;
  text-align: center;
  background: #FFF4DE;
  color: #FFA800;
}

.status-active{
  padding: 6px 11px;
  background: #F1FAFF;
  border-radius: 6px;
  color: #00A3FF;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;

}

`;



export const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  padding: 3px 0px;
`;
