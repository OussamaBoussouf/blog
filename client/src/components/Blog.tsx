import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    gap: 2rem;
    flex-direction: row;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  padding-block: 1rem;
  @media screen and (min-width: 768px) {
    padding-block: 0;
    width: 60%;
  }
`;

const Image = styled.img`
  object-fit: cover;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
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

type BlogProps = {
  akey: string;
  title: string;
  image: string;
  author: string;
  summary: string;
  createdAt: Date;
};

function Blog({ akey, title, author, summary, image, createdAt }: BlogProps) {
  const date = new Date(createdAt);
  const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  });
  const formatDate = dateTimeFormatter.format(date);


  return (
    <BlogContainer>
      <Image
        src={"http://localhost:8000/static/images/" + image}
        alt="blog image"
      />
      <Description>
        <Link to={`/blog/${akey}`}>
          <Heading>{title.length > 90 ? title.substring(0, 90) + '...' : title}</Heading>
        </Link>
        <Author>
          <b> Published by: {author}</b> <span>{formatDate}</span>
        </Author>
        <Text>{summary.length > 250 ? summary.substring(0, 250) + '...' : summary}</Text>
      </Description>
    </BlogContainer>
  );
}

export default Blog;
