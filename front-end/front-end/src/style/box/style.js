import styled from 'styled-components';

export const Container = styled.section`
        flex-direction: row;
        width: 58%;
        align-items: flex-start;
        gap: 15px;

        
        @media screen and (max-width: 767px) {
            width: 100%;
            flex-direction: column;
        }
`;


export const Boxs = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff; /* Ensure the background remains white */
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  border: 1px solid #80808021; /* Transparent border initially */
  width: 48%;
  border-radius: 8px;
  /* padding: 15px; */
  transition: 0.3s;
  transition: transform 0.3s ease;
  min-height: 185px;
  position: relative;
  border-image: none;
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    /* background-color: #fff; */
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};
    filter: blur(0);
    transition: filter 0.5s ease;
    border-radius: 8px;
  }
  &:hover {
    transform: scale(1.05);
    /* border-image: linear-gradient(45deg, #00DBDE 0%, #FC00FF 100%) 1;  */
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#0b0e14')};
    box-shadow: 0 0 5px 2px rgba(0, 219, 222, 0.3), 0 0 10px 4px rgba(252, 0, 255, 0.3); 
  }

  &:hover::after {
    filter: blur(40px); /* Apply blur effect on hover */
    border-radius: 8px;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;






export const TopSegment = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0px;
        border-bottom: 1px solid #80808021;
        /* padding-bottom: 10px; */
        padding: 15px 15px 10px 15px;
        max-height: 45px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

export const Strong = styled.strong`
font-size: 18px;
/* color: #6f2036; */
color: ${({ theme }) => (theme === 'light' ? '#6f2036' : '#fff')};
`;

export const Figure = styled.figure`
margin: 0;
        width: 30px;
        height: 30px;
`;

export const Image = styled.img`
width: 38px;
        height: 38px;
        padding: 0px;
        border-radius: 5px;
`;

export const List = styled.ul`
    overflow-y: scroll;
    max-height: 122px;
    /* padding: 10px 10px; */
    transition: 0.3s ease all;
   
`;

export const ListItems = styled.li`
display: flex;
        justify-content: space-between;
        padding: 10px 10px 10px 10px;
        transition: 0.3s ease all;
        border-bottom: 1px solid #80808014;
        &:hover{
        transition: 0.3s ease all;
        background-color: ${({ theme }) => (theme === 'light' ? '#f1f1f1' : '#34495e')};
        cursor: pointer;

    }
`;

export const Paper = styled.span`
font-size: 16px;
        font-weight: 500;
        /* color: #303030; */
        color: ${({ theme }) => (theme === 'light' ? '#303030' : '#fff')};

`;
