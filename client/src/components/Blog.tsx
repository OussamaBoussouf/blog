import styled from "styled-components";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: 1rem;
  @media screen and (min-width: 768px) {
    padding-block: 0;
  }
`;

const Image = styled.img`
  object-fit: cover;
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`;

const Heading = styled.h2`
  font-size: clamp(1rem, 5vw, 1.5rem);
  line-height: 1.8rem;
`;

const Text = styled.p`
  font-size: clamp(0.9rem, 2vw, 1rem);
  line-height: 1.5rem;
`;

const Author = styled.p`
  font-size: clamp(0.9rem, 2vw, 1rem);
  display: flex;
  justify-content: space-between;
`;

function Blog() {
  return (
    <BlogContainer>
      <Image src="./images/blog-image.jpg" alt="blog image" />
      <Description>
        <Heading>
          How Chat GPT and Other AI Tools Can Transform Our World
        </Heading>
        <Author>
          <b>Published by dawid</b> <span>2023-01-07 11:03:14</span>
        </Author>
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quasi
          repellat sed non iure, nam earum velit atque praesentium, maiores
          exercitationem necessitatibus! Esse laboriosam odio ullam quasi nisi
          deleniti amet!
        </Text>
      </Description>
    </BlogContainer>
  );
}

export default Blog;
