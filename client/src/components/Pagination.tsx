import styled from "styled-components";

const PaginationContainer = styled.div`
  margin-bottom: 2rem;
`;

const PaginationWrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = styled.button<{ $isSelected?: boolean }>`
  height: 40px;
  width: 40px;
  margin-inline: 0.2rem;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$isSelected ? "white" : "")};
  background-color: ${(props) => (props.$isSelected ? "blue" : "")};
  
  &:hover {
    cursor: pointer;
    background-color: ${(props) => (!props.$isSelected ? "#e0e0e05c" : "")};
  }
`;

const ArrowButton = styled.button`
  height: 40px;
  width: 40px;
  margin-inline: 0.2rem;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover:not(:disabled) {
    cursor: pointer;
    background-color: #e0e0e05c;
  }
`;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  next,
  previous,
}: {
  totalPages: number;
  onPageChange: (val: string) => void;
  currentPage: number;
  next: { page: number };
  previous: { page: number };
}) {
  const paginationNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  if (!totalPages) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationWrapper>
        <ArrowButton
          disabled={!previous}
          onClick={() => {
            onPageChange(String(previous.page));
          }}
        >
          &#129120;
        </ArrowButton>
        {paginationNumbers.map((page) => (
          <Page
            key={page}
            $isSelected={currentPage === page}
            onClick={() => {
              onPageChange(String(page));
            }}
          >
            {page}
          </Page>
        ))}
        <ArrowButton
          disabled={!next}
          onClick={() => {
            onPageChange(String(next.page));
          }}
        >
          &#129122;
        </ArrowButton>
      </PaginationWrapper>
    </PaginationContainer>
  );
}

export default Pagination;
