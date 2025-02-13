import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 35%;
  border-radius: 4px;
  .header{
    border-bottom: 1px solid #E9E9E9;
            padding-bottom: 17px;
            margin-bottom: 17px;
  }
    .box{
        border-radius: 4px;
        padding: 16px;
        width: 100%;
        padding: 0px;
        box-shadow: none;
        div{
            padding: 5px 5px;
        }
        /* h3{
            border-bottom: 1px solid #E9E9E9;
            padding-bottom: 17px;
        } */
        div{
            box-shadow: none;  
        }
    }
    @media (max-width: 1400px) {
    width: 30%;
  }

  @media (max-width: 1024px) {
    width: 100%; /* Stacks below the first section */
  }
`;
