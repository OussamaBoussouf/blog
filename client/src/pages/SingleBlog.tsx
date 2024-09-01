import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";

const SingleBlogContainer = styled.div`
  margin-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Heading = styled.h2`
  font-size: clamp(1.2rem, 5vw, 2rem);
  line-height: 1.8rem;
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
  width: fit-content;
`;

const Image = styled.img`
  object-fit: cover;
  max-height: 400px;
  width: 100%;
`;

const Author = styled.p`
  font-size: clamp(0.8rem, 2vw, 1rem);
`;

const BlogContent = styled.div`
  p {
    line-height: 1.8rem;
  }
`;

function SingleBlog() {
  return (
    <Wrapper>
      <SingleBlogContainer>
        <Heading>
          How Chat GPT and Other AI Tools Can Transform Our World
        </Heading>
        <AuthorContainer>
          <Author>
            <b>Published by dawid</b> <span>2023-01-07 11:03:14</span>
          </Author>
          <Button type="button">Edit this blog</Button>
        </AuthorContainer>
        <Image src="./images/blog-image.jpg" alt="blog image" />
        <BlogContent>
          <p>
            Axios, a popular JavaScript library, simplifies the process of
            sending HTTP requests to servers. But what truly sets Axios apart is
            its interceptors feature. This tool allows developers to intercept
            and manipulate HTTP requests and responses globally before they are
            handled by then() or catch(). Let’s dive into the concept of Axios
            interceptors, their advantages, and how they can be used
            effectively, such as in implementing token refresh mechanisms.
          </p>
          <h3>What Are Axios Interceptors?</h3>
          <p>
            Axios interceptors are functions that Axios calls for every request
            or response. Essentially, these interceptors give you the ability to
            run your code or modify the request/response before the request is
            sent or before the promise is returned to the client code. This
            feature is particularly useful for logging, authentication, and
            handling errors uniformly across all API calls.
          </p>
        </BlogContent>
      </SingleBlogContainer>
    </Wrapper>
  );
}

export default SingleBlog;
