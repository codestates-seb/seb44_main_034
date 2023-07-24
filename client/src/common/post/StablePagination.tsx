import styled from "styled-components";
import { COLOR_1 } from "../common";

type PageProps = {
  totalElements: number;
  elementsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const S = {
  Div: styled.div`
    > button {
      background-color: ${COLOR_1.white};
      margin: 3px;
      border-radius: 4px;
      border: 1px solid ${COLOR_1.dark_brown};
      box-shadow: 0 4px 4px ${COLOR_1.brown};
      &:hover {
        cursor: pointer;
        background-color: ${COLOR_1.brown};
        color: ${COLOR_1.white};
      }
      &.active {
        background-color: ${COLOR_1.brown};
        color: ${COLOR_1.white};
      }
    }
  `,
};

const StablePagination = ({
  totalElements,
  elementsPerPage,
  setCurrentPage,
  currentPage,
}: PageProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pages.push(i);
  }

  return (
    <S.Div>
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => {
            setCurrentPage(page);
          }}
          className={currentPage === idx + 1 ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </S.Div>
  );
};

export default StablePagination;
