import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    from{
        opacity: 0.3;
    }
    to{
        opacity: 1; 
    }
`;

const BlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${pulse} 1s linear infinite alternate;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const Image = styled.div`
  height: 250px;
  width: 100%;
  background-color: lightgray;
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`;
const Description = styled.div`
  height: 100px;
  width: 100%;
  background-color: lightgray;
  @media screen and (min-width: 768px) {
    padding-block: 0;
    height: 250px;
    width: 60%;
  }
`;

function BlogListLoading() {
  return (
    <BlogWrapper>
      <Image />
      <Description />
    </BlogWrapper>
  );
}

export default BlogListLoading;
