// src/common/GlobalStyles.js

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    /* color: #333; */
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  ul, ol {
    list-style: none;
  }


  /* Input field styles */
input {
    transition: 
        border-color 0.3s ease-in-out,   /* Smooth transition for border color */
        border-width 0.3s ease-in-out,   /* Smooth transition for border width */
        box-shadow 0.3s ease-in-out;     /* Smooth transition for box-shadow */
    outline: unset;

    &::placeholder {
        font-size: 14px;
        color: #9796967a; /* Light grayish placeholder text */
    }

    &:focus-visible {
        outline: unset;
    }

    &:focus-within {
        outline: unset;
    }

    &:focus {
        outline: unset;
        border-color: #6f2036 !important;
        border-width: 1.5px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px !important;
    }
}


`;







export default GlobalStyles;
