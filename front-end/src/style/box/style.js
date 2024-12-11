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
        background: ${({ theme }) => (theme === 'light' ? '#fff' : 'transparent')};
        color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
        border: 1px solid ${({ theme }) => (theme === 'light' ? '#80808021' : '#333b4d99')};
        width: 48%;
        border-radius: 8px;
        padding: 15px;
        transition: 0.3s;
        transition: transform 0.3s ease; 
        &:hover{
                background: ${({ theme }) => (theme === 'light' ? '#fff' : '#0b0e14')};
                transform: scale(1.05);
        }
        @media screen and (max-width: 767px) {
            width: 100%;
        }
`;

export const TopSegment = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
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

`;

export const ListItems = styled.li`
display: flex;
        justify-content: space-between;
        padding: 0px 0px 7px 0px;
`;

export const Paper = styled.span`
font-size: 16px;
        font-weight: 500;
        /* color: #303030; */
        color: ${({ theme }) => (theme === 'light' ? '#303030' : '#fff')};

`;
