import styled, { createGlobalStyle, keyframes } from "styled-components";

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

#root{
    display: flex;
    flex-direction: column;
    height: 100vh;
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

const slideSkeletonBg = keyframes`
  to {
    background-position-x: -250%;
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

export const SkeletonLoader = styled.div`
  background-color: gainsboro;
  background-image: linear-gradient(
    -80deg,
    transparent 40%,
    white 50%,
    transparent 60%
  );
  background-size: 200%;
  background-position-x: -50%;
  border-radius: 5px;
  animation: ${slideSkeletonBg} 2s linear forwards infinite;
`;
