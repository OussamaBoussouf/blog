import styled from "styled-components";
import { ContentWrapper } from "../styles/GlobalStyle.style";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import axiosApi from "../api/axios";
import { useUser } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormErrorMessage from "../components/FormErrorMessage";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
  image: FileList;
  content: string;
};

type Blog = {
  title: string;
  summary: string;
  content: string;
  user_id: string;
};

function EditBlog() {
  const [isPending, setIsPending] = useState(false);
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const { userInfo } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    unregister,
    formState: { errors },
  } = useForm<FormInputs>();

  //NOTIFICATON MESSAGE
  const errorNotification = () => toast.error("Something went wrong.");

  //READ CURRENT BLOG
  useEffect(() => {
    unregister("image");
    axiosApi
      .get(`/${id}/edit`)
      .then(({ data }) => {
        setBlog(data);
        setValue("title", data?.title);
        setValue("summary", data?.summary);
      })
      .catch((error) => console.log(error));
  }, []);

  //SUBMIT THE UPDATED VERSION OF BLOG
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("content", data.content);
    formData.append("user_id", userInfo!.id);
    formData.append("image", data.image[0]);

    axiosApi
      .put(`/${id}/update`, formData)
      .then(() => {
        navigate(`/blog/${id}?updated=true`);
      })
      .catch(() => errorNotification())
      .finally(() => setIsPending(false));
  };

  if (blog && blog.user_id != localStorage.getItem("user_id")) {
    return <Navigate to="/unauthorized" replace={true} />;
  }

  return (
    <ContentWrapper>
      {blog ? (
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <InputContainer>
            <Label htmlFor="title">Blog Title</Label>
            <Input
              {...register("title", {
                required: "this field is required",
                maxLength: {
                  value: 100,
                  message: "the title should have at max 100 characters",
                },
              })}
              name="title"
              type="text"
              id="title"
              placeholder="put title here..."
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
                  value: 300,
                  message: "the summary should have at max 300 characters",
                },
              })}
              name="summary"
              type="text"
              id="summary"
              placeholder="your blog summary..."
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
            <Input {...register("image")} name="image" type="file" />
            {/* HANDLING ERRORS */}
            <FormErrorMessage
              inputName="image"
              validationType={["required"]}
              errors={errors}
            />{" "}
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
              render={({ field: { onChange } }) => (
                <Editor
                  apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
                  initialValue={blog?.content}
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
            {isPending ? "Updatting..." : "Update"}
          </SubmitButton>
        </Form>
      ) : (
        ""
      )}
      {createPortal(<ToastContainer position="top-right" />, document.body)}
    </ContentWrapper>
  );
}

export default EditBlog;
