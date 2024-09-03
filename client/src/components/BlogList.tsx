import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";
import Blog from "./Blog";

const BlogListConainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-block: 2rem;
`;

function BlogList() {
  return (
    <Wrapper>
      <BlogListConainer>
        {[...Array(6).keys()].map((index) => (
          <Blog key={index} />
        ))}
      </BlogListConainer>
    </Wrapper>
  );
}

export default BlogList;
