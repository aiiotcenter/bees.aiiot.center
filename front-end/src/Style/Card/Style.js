import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 16px; /* Reduce gap to prevent wrapping */
    margin-bottom: 30px;
    box-sizing: border-box;
`;

export const Box = styled.div`
    flex: 1 1 calc(25% - 16px); /* Ensures 4 cards per row, accounting for the gap */
    padding: 20px; /* Adjusted for spacing */
    border-radius: 4px;
    background: #fff;
    min-height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: 0.3s ease all;
    &:hover{
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
    }

    @media (max-width: 1200px) {
        flex: 1 1 calc(33.33% - 16px); /* 3 cards per row */
    }

    @media (max-width: 900px) {
        flex: 1 1 calc(50% - 16px); /* 2 cards per row */
    }

    @media (max-width: 600px) {
        flex: 1 1 100%; /* 1 card per row */
    }
`;


export const DetailWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Left = styled.div`
    max-width: 145px;
    width: 100%;
    p {
        color: #6B7177;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    h2 {
        padding-bottom: 8px;
        line-height: 34px;
    }
`;

export const Right = styled.div`
    max-width: 58px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.div`
    width: 58px;
    height: 52px;
    position: relative;
    img {
        z-index: 99;
        position: relative;
    }
`;

export const PlaceHolder = styled.div`
    background-color: #FBF7ED;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    position: absolute;
    top: 16px;
    right: 4px;
    z-index: 0;
`;

export const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`;

export const Paper = styled.span``;
