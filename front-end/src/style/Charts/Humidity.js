import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 470px;
    width: 100%;
    border-radius: 4px;
    .box{
        border-radius: 4px;
        padding: 16px;
        width: 100%;
        padding: 0px;
        box-shadow: none;
        h3{
            border-bottom: 1px solid #E9E9E9;
            padding-bottom: 17px;
        }
        div{
            box-shadow: none;  
        }
    }
`;
