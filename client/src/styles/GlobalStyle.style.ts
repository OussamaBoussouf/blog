import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Poppins';
    src: url('../assets/fonts/Poppins-Bold.ttf');
    font-weight: bold;
}

@font-face {
    font-family: 'Poppins';
    src: url('../assets/fonts/Poppins-Regular.ttf');
    font-weight: normal;
}

body{
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

*, *::after, *::before{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

button{
  font-family: "Poppins";
}

h1{
    letter-spacing: 1.1px;
}

a{
    text-decoration: none;
    color: black;
}

ul, ol{
    padding-left: 2rem;
}

ul > li, ol > li {
    margin-block: .8rem;
    line-height: 1.5rem;
}

input{
  border-color: #e4e4e7;
  border-radius: 0.3rem;
  border-style: solid;
  border-width: 1px;
  padding: 0.7em;
  position: relative;
}

`;

export const Wrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  padding-inline: 2rem;
  margin-inline: auto;
`;
export const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  padding-inline: 2rem;
  margin-inline: auto;
`;
