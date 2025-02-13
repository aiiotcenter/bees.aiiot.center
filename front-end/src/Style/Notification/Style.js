import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 360px;
    height: auto;
    max-height: 422px;
    width: 100%;
    margin-bottom: 30px;
    padding: 13px 30px 28px 30px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 0px 25px 70px 0px #01213A12;
    background: #fff;
    position: absolute;
    top: 200px;
    z-index: 99;
    overflow-y: scroll;

     /* Hide scrollbar for WebKit browsers */
     &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    &::-webkit-scrollbar-thumb {
        background: #c1c1c1; 
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
    }
`;

export const List = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    
`;

export const ListItems = styled.li`
    display: flex;
    align-items: center;
    text-align: left;
    gap: 12px;
    border-bottom: 1px solid #E9E9E9 !important;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    width: 100%;
 
    &:last-child{
        margin-bottom: 0px;
        border-bottom: 0px;
    }
`;

export const Left = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    &:last-child{
        margin-bottom: 0px;
        border-bottom: 0px;
    }
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
`;
