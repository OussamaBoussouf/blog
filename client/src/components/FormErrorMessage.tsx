import { FieldErrors } from "react-hook-form";
import styled from "styled-components";

type FormInputs = {
  title: string;
  summary: string;
  image: FileList;
  content: string;
};

type FormErrorMessageProps = {
  inputName: "title" | "content" | "summary" | "image";
  validationType: string[];
  errors: FieldErrors<FormInputs>;
};

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-block: 0.5rem;
`;

function FormErrorMessage({ inputName, validationType, errors }: FormErrorMessageProps) {
  return (
    <>
      {validationType.map((key, index) =>
        errors[inputName]?.type === key ? (
          <ErrorMessage key={index}>{errors[inputName].message}</ErrorMessage>
        ) : null
      )}
    </>
  );
}

export default FormErrorMessage;
