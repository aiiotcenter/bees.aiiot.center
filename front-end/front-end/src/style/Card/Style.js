import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    margin-bottom: 30px;
    box-sizing: border-box;
`;

export const Box = styled.div`
    min-width: 281px;
    max-width: 345px;
    width: 100%;
    padding: 0 32px;
    border-radius: 4px;
    background: #fff;
    min-height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
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
