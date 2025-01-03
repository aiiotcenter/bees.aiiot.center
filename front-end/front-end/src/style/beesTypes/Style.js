import styled, { keyframes } from 'styled-components';

// Define keyframes for animations
const fadeTextIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeTextOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.section``;

export const Wrapper = styled.div``;

export const Heading = styled.h2`
  margin-bottom: 5px;
  margin-top: 25px;
  &:nth-child(1) {
    margin-top: 0px;
  }
`;

export const Text = styled.p`
  padding-bottom: 15px;
`;

export const List = styled.ul`
  list-style: disc;
  padding: 0px 0px 0px 25px;
  margin: 15px 0px 15px 0px;
`;

export const ListItems = styled.li`
  padding-bottom: 10px;
`;

export const InnerWrapper = styled.div``;

export const Box = styled.div`
  border: 1px solid #80808021;
  padding: 0px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: 0.3s ease all;
  margin-bottom: 25px;

  /* AppBar styles */
  .app-bar {
    margin-bottom: 20px;
    background-color: #6f2036;
    color: #fff;

    .MuiTab-root {
      color: white;
      transition: color 0.3s ease-in-out; /* Smooth color change transition */
    }

    .MuiTab-root:hover {
      color: lightgray;
      transition: color 0.3s ease-in-out;
    }

    .Mui-selected {
      color: #e3e3e3f7;
    }

    .MuiTab-textColorPrimary {
      color: #fff;
    }
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 5px 2px rgba(0, 219, 222, 0.3), 0 0 10px 4px rgba(252, 0, 255, 0.3);
  }

  /* Apply animation to tabs when changing */
  .tab-change-animation {
    animation: ${fadeTextOut} 0.3s ease-in-out, ${fadeTextIn} 0.3s ease-in-out;
  }

  /* Apply fade-in animation for the whole Box when it's rendered */
  animation: ${fadeTextIn} 0.5s ease-in-out;
`;

export const Div = styled.div`
  padding: 10px 15px;
`;

