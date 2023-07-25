import { useState } from "react";
import { Link } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { data as dataAll } from "../../mockData/cafePost.json";
// import { PostCafeAtom } from "../../recoil/postState";
import { CafePostList } from "../../types/type";
// import { PostCafeType } from "../../types/type";
import StablePagination from "../../common/post/StablePagination";
import PostThumbnail from "../../common/post/PostThumbnail";
import styled from "styled-components";
import { FONT_SIZE_2 } from "../../common/common";
// import { COLOR_1, FONT_SIZE_1 } from "../../common/common";

type PostDataProp = {
  postData: CafePostList[];
  cafeName?: string;
  cafeId?: number;
};

const S = {
  Container: styled.div`
    /* display: block; */
    /* > ul {
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
      } */
    /* } */
  `,
  FlexWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px 0 24px 0;
    min-height: 80px;
    > ul {
      > li {
        margin: 30px;
      }
    }
  `,
  Div: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0 24px 0;
  `,
  P: styled.p`
    margin-top: 40px;
    display: block;
    text-align: center;
    font-size: ${FONT_SIZE_2.normal_3};
  `,
};

const PostList = ({ postData }: PostDataProp) => {
  // const data= dataAll.post;
  const data = postData;

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  console.log(setPostsPerPage);

  // const handleBtnCafeName = (): void => {};
  return (
    <S.Container>
      {currentPosts.length < 1 ? (
        <>
          <S.P>작성한 포스트가 없습니다.</S.P>
          <S.P>플러스 버튼을 눌러 포스트를 작성해보세요.</S.P>
        </>
      ) : (
        <S.FlexWrap>
          <ul>
            {currentPosts.map((el: CafePostList) => (
              <li key={el.postId}>
                <Link to={`../postpage/${el.postId}`}>
                  <PostThumbnail
                    image={el.image}
                    title={el.title}
                    author={el.author}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </S.FlexWrap>
      )}

      <S.Div>
        <StablePagination
          totalElements={data.length}
          elementsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </S.Div>
    </S.Container>
  );
};

export default PostList;
