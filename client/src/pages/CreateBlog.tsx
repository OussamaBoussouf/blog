import styled from "styled-components";
import { ContentWrapper } from "../styles/GlobalStyle.style";
import { useRef, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import axiosApi from "../api/axios";
import { useUser } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormErrorMessage from "../components/FormErrorMessage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 2rem;
`;

const InputContainer = styled.div``;

const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.5em;
  margin-top: 0.8rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
`;

const SubmitButton = styled.button`
  background-color: black;
  padding: 1em;
  border-radius: 5px;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
  }
`;

type FormInputs = {
  title: string;
  summary: string;
  image: string;
  content: string;
};

function CreateBlog() {
  const [isPending, setIsPending] = useState(false);
  const { userInfo } = useUser();
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      summary: "",
      image: "",
      content: "",
    },
  });

  //NOTIFICATION
  const successNotification = () =>
    toast.success("Blog has been added successfully.");
  const errorNotification = () => toast.error("Something went wrong.");


  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("content", data.content);
    formData.append("user_id", userInfo!.id);
    formData.append("image", data.image[0]);
    axiosApi
      .post("/blog/create", formData)
      .then(() => {
        successNotification();
        reset(
          {
            title: "",
            summary: "",
            image: "",
            content: "",
          },
          {
            keepErrors: false,
          }
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    )
      .catch(() => errorNotification())
      .finally(() => setIsPending(false));
  };
  return (
    <ContentWrapper>
      <Form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <InputContainer>
          <Label htmlFor="title">Blog Title</Label>
          <Input
            {...register("title", {
              required: "this field is required",
              maxLength: {
                value: 50,
                message: "the title should have at max 50 characters",
              },
            })}
            name="title"
            type="text"
            id="title"
            placeholder="title here..."
          />
          {/* HANDLING ERRORS */}
          <FormErrorMessage
            inputName="title"
            validationType={["required", "maxLength"]}
            errors={errors}
          />
          {/* HANDLING ERRORS */}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="summary">Blog Summary</Label>
          <Input
            {...register("summary", {
              required: "this field is required",
              maxLength: {
                value: 60,
                message: "the summary should have at max 60 characters",
              },
            })}
            name="summary"
            type="text"
            id="summary"
            placeholder="blog summary..."
          />
          {/* HANDLING ERRORS */}
          <FormErrorMessage
            inputName="summary"
            validationType={["required", "maxLength"]}
            errors={errors}
          />
          {/* HANDLING ERRORS */}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="cover">Blog Cover</Label>
          <Input
            {...register("image", { required: "this field is required" })}
            name="image"
            type="file"
          />
          {/* HANDLING ERRORS */}
          <FormErrorMessage
            inputName="image"
            validationType={["required"]}
            errors={errors}
          />
          {/* HANDLING ERRORS */}
        </InputContainer>
        <InputContainer>
          <Controller
            name="content"
            control={control}
            rules={{
              required: "this field is required",
              minLength: {
                value: 1000,
                message: "content should be at least 1000 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Editor
                apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
                value={value}
                onEditorChange={onChange}
                init={{
                  plugins: ["link", "lists"],
                  toolbar:
                    "undo redo | blocks | bold italic underline strikethrough | checklist numlist bullist indent outdent | link  ",
                  menubar: false,
                  statusbar: false,
                }}
              />
            )}
          />
          {/* HANDLING ERRORS */}
          <FormErrorMessage
            inputName="content"
            validationType={["required", "minLength"]}
            errors={errors}
          />
          {/* HANDLING ERRORS */}
        </InputContainer>
        <SubmitButton disabled={isPending} type="submit">
          {isPending ? "Submitting..." : "Submit"}
        </SubmitButton>
      </Form>
      <ToastContainer position="top-right" />
    </ContentWrapper>
  );
}

export default CreateBlog;
