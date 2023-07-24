// import { Styled } from "styled-components/dist/constructors/constructWithOptions";

type PageButtonProps = {
  page: number;
  active: any;
  setPage: (p: number) => void;
};

// const S = {
//   Button:styled.button`

//   `
// }

const PageButton = ({ page, active, setPage }: PageButtonProps) => {
  return (
    <button onClick={() => setPage(page)} className={active}>
      {page}
    </button>
  );
};

export default PageButton;
