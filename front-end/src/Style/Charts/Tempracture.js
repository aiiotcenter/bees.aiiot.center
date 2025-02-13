import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 64.9%;
  border-radius: 4px;
  .header{
    border-bottom: 1px solid #E9E9E9;
            padding-bottom: 17px;
            margin-bottom: 17px;
  }


    .box {
        border-radius: 4px;
        padding: 16px;
        width: 100%;
        box-shadow: none;
        .recharts-wrapper{
            margin-left: -25px;
        }
    
        div{
            padding: 5px 5px;
        }
        h3{
            /* border-bottom: 1px solid #E9E9E9;
            padding-bottom: 17px;
            margin-bottom: 17px; */
        }

        /* Remove unnecessary padding reset */
        div {
            box-shadow: none;
        }
    }
    @media (max-width: 1400px) {
    width: 68%;
  }

  @media (max-width: 1024px) {
    width: 100%; /* Takes full width on smaller screens */
  }
`;
