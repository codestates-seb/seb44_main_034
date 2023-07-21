type CommentsProps = {
  totalComments: number;
  commentsPerPage: number;
  setCurrentPage: (page: number) => void;
};

const CommentsPagination = ({
  totalComments,
  commentsPerPage,
  setCurrentPage,
}: CommentsProps) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default CommentsPagination;
