import styled from "styled-components";
import { SkeletonLoader } from "../styles/GlobalStyle.style";


const BlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const Image = styled(SkeletonLoader)`
  height: 250px;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`;
const Description = styled(SkeletonLoader)`
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
