import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";

const StyledRegister = styled.div`
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

function Register() {
  return (
    <StyledRegister>
      <Wrapper>
        <Heading>Register</Heading>
        <Form>
          <Input type="text" placeholder="username" aria-label="Enter username"/>
          <Input type="password" placeholder="password" aria-label="Enter password"/>
          <SubmitButton type="submit">Register</SubmitButton>
        </Form>
      </Wrapper>
    </StyledRegister>
  );
}

export default Register;
