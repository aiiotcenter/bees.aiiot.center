import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;  
  background: #fff;
  padding: 25px;
  margin-bottom: 50px;
  box-sizing: border-box;
  flex-direction: column;
  min-height: 600px;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 30px;
span{
    color: green;
    font-size: 16px;
    text-transform: capitalize;
}
`;

export const Section = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;  
  background: #fff;
  box-sizing: border-box;
`;

export const Main = styled.div`
  display: flex;
  gap: 20px;
  width: 100%; 
  border: 1px solid #E9E9E9;
    border-radius: 4px;
    padding: 25px; 
    box-sizing: border-box;
    min-height: 400px;
`;

export const Content = styled.div`
  /* max-width: 80%; */
  width: 100%;  
  display: flex;
    align-items: center;
    justify-content: center;

  
`;

export const Result = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 20%;
  width: 100%;  
`;

export const List = styled.ul`
 padding : 0px;
 margin: 0px;
 list-style: disc;
`;

export const ListItems = styled.li`
    padding: 0px;
    margin: 0px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;  
  box-sizing: border-box;

  position: absolute;
  bottom: 25px;

  form{

    margin-top: 0px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px 20px;
    box-sizing: border-box;
    flex-direction: row-reverse;
    align-content: center;
  }
`;