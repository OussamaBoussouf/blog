import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  height: 50px;
  width: 50px;
  border-left: 5px solid blue;
  border-top: 5px solid lightgray;
  border-bottom: 5px solid lightgray;
  border-right: 5px solid lightgray;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${rotate} 1s linear infinite;
`;

const Loading = () => {
  return <Loader />;
};

export default Loading;
