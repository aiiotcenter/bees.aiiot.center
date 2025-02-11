import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center; /* Ensures vertical alignment */
    max-width: calc(100% - 309px);
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 0; /* Ensures it sticks to the left */
    background-color: #fff;
    padding: 20px 30px; /* Adjust padding for spacing */
    border-top: 0px solid #e0e0e0; /* Optional: Adds a subtle border on top */
    z-index: 1000; /* Makes sure it stays above other elements */
`;

export const Left = styled.div`
    flex: 1; /* Allows flexible spacing for alignment */
    text-align: left;
`;

export const Right = styled.div`
    flex: 1; /* Allows flexible spacing for alignment */
    text-align: right;
`;
