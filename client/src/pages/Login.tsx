import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";

const StyledLogin = styled.div`
  margin-block: 2rem;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  max-width: 350px;
  margin-inline: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em 0.5em;

  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
    width: 100%;
    color: white;
    background-color: black; 
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    padding-block: .5em;
    cursor: pointer;
`

function Login() {
  return (
    <StyledLogin>
      <Wrapper>
        <Heading>Login</Heading>
        <Form>
          <Input type="text" placeholder="username" aria-label="Enter username"/>
          <Input type="password" placeholder="password" aria-label="Enter password"/>
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
      </Wrapper>
    </StyledLogin>
  );
}

export default Login;
