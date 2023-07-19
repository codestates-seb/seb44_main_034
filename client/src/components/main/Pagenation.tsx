import { useState } from 'react';
import styled from 'styled-components';

const S = {
  PageSection: styled.div`
    height: 50px;
    width: 300px;
  `,
  ButtonWrap: styled.div``,
  Button: styled.div``,
};

const Pageination = ({ totalPosts, limit, page, setPage }) => {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  const firstNum = currPage - (currPage % 5) + 1;
  const lastNum = currPage - (currPage % 5) + 5;
  //console.log({"currPage is":currPage, "firsNum is" : firstNum, "page is" : page})

  return (
    <S.PageSection>
      <S.ButtonWrap>
        <S.Button
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </S.Button>
        <S.Button
          onClick={() => setPage(firstNum)}
          aria-current={page === firstNum ? 'page' : null}
        >
          {firstNum}
        </S.Button>
        {Array(4)
          .fill()
          .map((_, i) => {
            if (i <= 2) {
              return (
                <S.Button
                  border='true'
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i);
                  }}
                  aria-current={page === firstNum + 1 + i ? 'page' : null}
                >
                  {firstNum + 1 + i}
                </S.Button>
              );
            } else if (i >= 3) {
              return (
                <S.Button
                  border='true'
                  key={i + 1}
                  onClick={() => setPage(lastNum)}
                  aria-current={page === lastNum ? 'page' : null}
                >
                  {lastNum}
                </S.Button>
              );
            }
          })}
        <S.Button
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </S.Button>
      </S.ButtonWrap>
    </S.PageSection>
  );
};
export default Pagenation;
