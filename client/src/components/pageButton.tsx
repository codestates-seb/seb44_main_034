type PageButtonProps = {
  page: number;
  setPage: (p:number)=>void;
}
const PageButton = ({ page, setPage }:PageButtonProps) => {
  return <button onClick={() => setPage(page)}>{page}</button>
}

export default PageButton;