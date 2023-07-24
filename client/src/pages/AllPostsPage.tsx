import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../common/common";
// import { data as dataAll } from '../mockData/cafePost.json';
import PostThumbnail from "../common/post/PostThumbnail";
import { CafePostList } from "../types/type";
import { getAllPosts } from "../api/postApi";
import PageButton from "../components/pageButton";

const S = {
  Container: styled.div`
    display: block;
    padding: 20px;
    > ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      > li {
        margin: 20px;
        @media screen and (max-width: 500px) {
          margin: 10px;
        }
      }
    }
  `,
  PostStart: styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid ${COLOR_1.dark_brown};
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.big_1};
      margin: 10px;
      padding: 2px;
      height: 45px;
      border-bottom: 1px solid rgba(72, 50, 25, 0.5);
    }
    > span {
      margin-top: 10px;
      color: ${COLOR_1.black};
      font-size: ${FONT_SIZE_1.big_4};
      @media screen and (max-width: 500px) {
        font-size: ${FONT_SIZE_1.big_2};
      }
    }
  `,
  Nav: styled.nav`
    display: flex;
    justify-content: center;
    margin: 40px 0 20px 0;
    > button {
      background-color: ${COLOR_1.white};
      margin: 3px;
      border-radius: 4px;
      border: 1px solid ${COLOR_1.dark_brown};
      box-shadow: 0 4px 4px ${COLOR_1.brown};
      &.active {
        background-color: ${COLOR_1.brown};
        color: ${COLOR_1.white};
      }
      &:hover {
        cursor: pointer;
        background-color: ${COLOR_1.brown};
        color: ${COLOR_1.white};
      }
    }
  `,
};

const AllPostsPage = () => {
  // const data = dataAll.post;

  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    data,
    // isFetching,
    isPreviousData,
  } = useQuery(["getAllposts", page], () => getAllPosts(page), {
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  if (data) {
    const postsData = data.payload.data;
    console.log(data);
    console.log(data.payload.data);
    console.log(data.payload.pageInfo);
    const pageData = data.payload.pageInfo;
    const lastPage = () => setPage(pageData.totalPages);
    const firstPage = () => setPage(1);
    const pagesArray = Array(pageData.totalPages)
      .fill(null)
      .map((_, i) => i + 1);
    return (
      <>
        <S.Container>
          <S.PostStart>
            <span>POST</span>
          </S.PostStart>
          <ul>
            {postsData.map((el: CafePostList) => (
              <li key={el.postId}>
                <Link to={`../postpage/${el.postId}`}>
                  <PostThumbnail
                    key={el.postId}
                    image={el.image}
                    title={el.title}
                    author={el.author}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <S.Nav>
            <button onClick={firstPage} disabled={isPreviousData || page === 1}>
              {`<`}
            </button>
            {pagesArray.map((el, idx) => (
              <PageButton
                key={el}
                active={page === idx + 1 ? "active" : null}
                page={el}
                setPage={setPage}
              />
            ))}
            <button
              onClick={lastPage}
              disabled={isPreviousData || page === data.totalpages}
            >
              {`>`}
            </button>
          </S.Nav>
        </S.Container>
      </>
    );
  }
};

export default AllPostsPage;
