import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Wrapper } from "../styles/GlobalStyle.style";
import { useUser } from "../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";
import axiosApi from "../api/axios";

type FormInputs = {
  username: string;
  password: string;
};

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

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em 0.5em;
`;

const Button = styled.button`
  width: 100%;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  padding-block: 0.5em;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  color: white;
  background-color: black;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  padding-block: 0.5em;
  cursor: pointer;
`;

const DemoButton = styled(Button)`
  border: 2px solid black;
  background-color: transparent;
  color: black;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.9;
    background-color: lightgray;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-block: 0.3rem;
`;

function Login() {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    axiosApi
      .post("/auth/login", data)
      .then((response) => {
        localStorage.setItem("user_id", response.data.id);
        localStorage.setItem("accessToken", response.headers["x-access-token"]);
        setUserInfo(response.data);
        navigate("/");
      })
      .catch((error) => {
        setError("root.serverError", {
          type: error.status,
          message: error.response.data,
        });
      });
  };

  const handleDemoAccountSubimission = () => {
    onSubmit({ username: "Tom", password: "123456789" });
  };

  if (userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <StyledLogin>
      <Wrapper>
        <Heading>Login</Heading>
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
          {errors.root?.serverError.type === 400 && (
            <ErrorMessage>{errors.root.serverError.message}</ErrorMessage>
          )}
          <DemoButton type="button" onClick={handleDemoAccountSubimission}>
            Try a Demo Account
          </DemoButton>
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
      </Wrapper>
    </StyledLogin>
  );
}

export default Login;
