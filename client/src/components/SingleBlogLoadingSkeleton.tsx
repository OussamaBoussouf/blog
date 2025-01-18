import styled from "styled-components";
import { SkeletonLoader } from "../styles/GlobalStyle.style";

const TitleSkeleton = styled(SkeletonLoader)`
  width: 100%;
  height: 100px;
  margin-top: 2rem;
`;

const EditSkeleton = styled(SkeletonLoader)`
  width: 100%;
  height: 50px;
  margin-block: 1rem;
`;

const ImageSkeleton = styled(SkeletonLoader)`
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;
`;

const TextSkeleton = styled(SkeletonLoader)`
  width: 100%;
  height: 20px;
  margin-block: 1rem;
`;

const SmallTextSkeleton = styled(SkeletonLoader)`
  width: 80%;
  height: 20px;
  margin-block: 1rem;
`;

function SingleBlogLoadingSkeleton() {
  return (
    <>
      <TitleSkeleton />
      <EditSkeleton />
      <ImageSkeleton />
      <TextSkeleton />
      <TextSkeleton />
      <SmallTextSkeleton />
    </>
  );
}

export default SingleBlogLoadingSkeleton;
