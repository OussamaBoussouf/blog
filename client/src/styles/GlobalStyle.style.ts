import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Inter';
    src: url('./fonts/Inter_18pt-Bold.ttf');
    font-weight: bold;
}

@font-face {
    font-family: 'Inter';
    src: url('./fonts/Inter_18pt-Regular.ttf');
    font-weight: normal;
}

body{
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
}

*, *::after, *::before{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

button{
  font-family: "Inter";
}

h1{
    letter-spacing: 1.1px;
}

a{
    text-decoration: none;
    color: black;
}
`;

export const Wrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  padding-inline: 2rem;
  margin-inline: auto;
`;
