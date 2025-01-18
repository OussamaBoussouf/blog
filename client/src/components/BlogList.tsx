import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";
import Blog from "./Blog";
import BlogListLoading from "../components/BlogListLoading";
import noBlogFound from "../assets/images/no-blog.png";


const BlogListConainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-block: 2rem;
`;

const Container = styled.div`
  display: grid;
  place-content: center;
  justify-items: center;
  margin-top: 4.5rem;
`;

type TypeBlog = {
  akey: string;
  _id: string;
  title: string;
  summary: string;
  image: string;
  content: string;
  created_at: Date;
  user_id: any;
};

function BlogList({
  blogs,
  isLoading,
}: {
  blogs: TypeBlog[];
  isLoading: boolean;
}) {
  
  if (isLoading) {
    return (
      <Wrapper>
        <BlogListConainer>
          {[...Array(4)].map((_, index) => (
            <BlogListLoading key={index} />
          ))}
        </BlogListConainer>
      </Wrapper>
    );
  }

  if (blogs?.length === 0) {
    return (
      <Container>
        <img src={noBlogFound} width="267" alt="bee fly over a box" />
        <h2>Sorry no blog has been published yeat.</h2>
      </Container>
    );
  }

  return (
    <Wrapper>
      <BlogListConainer>
        {blogs?.map((blog: TypeBlog) => (
          <Blog
            key={blog._id}
            akey={blog._id}
            title={blog.title}
            createdAt={blog.created_at}
            image={blog.image}
            author={blog.user_id.username}
            summary={blog.summary}
          />
        ))}
      </BlogListConainer>
    </Wrapper>
  );
}

export default BlogList;
