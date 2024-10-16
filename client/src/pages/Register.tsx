import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosApi from "../api/axios";
import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";

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

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em 0.5em;
`;

const SubmitButton = styled.button`
  width: 100%;
  color: white;
  background-color: black;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  padding-block: 0.5em;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-block: 0.5rem;
`;


type FormInputs = {
  username: string;
  password: string;
};


function Register() {
  const { userInfo } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    axiosApi
      .post("/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError("root.serverError", {
          type: error.status,
          message: error.response.data,
        });
      });
  };

  if (userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <StyledRegister>
      <Wrapper>
        <Heading>Register</Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              type="text"
              placeholder="username"
              aria-label="Enter username"
              {...register("username", { required: "username is required" })}
            />
            {errors.username?.type === "required" && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="password"
              aria-label="Enter password"
              {...register("password", {
                required: "password is required",
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            {errors.password?.type === "minLength" && (
              <ErrorMessage>
                password should contain at least 6 characters
              </ErrorMessage>
            )}
          </InputContainer>
          {/* SERVER ERROR */}
          {errors.root?.serverError.type === 409 && (
            <ErrorMessage>{errors.root.serverError.message}</ErrorMessage>
          )}
          <SubmitButton type="submit">Register</SubmitButton>
        </Form>
      </Wrapper>
    </StyledRegister>
  );
}

export default Register;
