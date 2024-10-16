import styled from "styled-components";
import { ContentWrapper } from "../styles/GlobalStyle.style";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axiosApi from "../api/axios";
import { useUser } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import { createPortal } from "react-dom";
import useSWR from "swr";

const SingleBlogContainer = styled.div`
  margin-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Heading = styled.h2`
  font-size: clamp(1.2rem, 5vw, 2rem);
  line-height: 2rem;
  @media screen and (min-width: 768px) {
    line-height: 2.5rem;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 0.8em 1.5em;
  border: none;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  &:hover {
    opacity: 0.7;
  }
`;

const Image = styled.img`
  object-fit: cover;
  max-height: 400px;
  width: 100%;
`;

const Author = styled.p`
  font-size: clamp(0.8rem, 2vw, 1rem);

  span {
    margin-left: 1em;
  }
`;

const BlogContent = styled.div`
  p {
    line-height: 1.8rem;
  }
`;

type Blog = {
  title: string;
  image: string;
  created_at: Date;
  content: HTMLElement;
  user_id: any;
};

function SingleBlog() {
  const id = useParams().id;
  const { userInfo } = useUser();
  const [searchParams] = useSearchParams();

  const fetcher = (url: string) => axiosApi.get(url).then(({ data }) => data);
  const { data: blog, error, isLoading } = useSWR<Blog>(`/${id}/blog`, fetcher);
  const successNotification = () =>
    toast.success("Blog has been updated successfully.");

  useEffect(() => {
    if (searchParams.get("updated")) {
      successNotification();
    }
  }, []);

  return (
    <ContentWrapper>
      {blog != undefined ? (
        <SingleBlogContainer>
          <Heading>{blog?.title}</Heading>
          <AuthorContainer>
            <Author>
              <b>Published by {blog?.user_id?.username}</b>
              <span>
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </span>
            </Author>
            {userInfo && userInfo.id === blog.user_id._id && (
              <Link to={`/edit/${id}`}>
                <Button type="button">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                  Edit this blog
                </Button>
              </Link>
            )}
          </AuthorContainer>
          <Image
            src={`http://localhost:8000/static/images/${blog?.image}`}
            alt="blog image"
          />
          <BlogContent>
            <div dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
          </BlogContent>
        </SingleBlogContainer>
      ) : null}
      {createPortal(<ToastContainer position="top-right" />, document.body)}
    </ContentWrapper>
  );
}

export default SingleBlog;
