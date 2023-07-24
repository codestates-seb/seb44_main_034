import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// import { data as dataAll } from "../../mockData/cafePost.json";
import { PostCafeAtom } from "../../recoil/postState";
import { CafePostList } from "../../types/type";
import { PostCafeType } from "../../types/type";
import StablePagination from "../../common/post/StablePagination";
import PostThumbnail from "../../common/post/PostThumbnail";
import PlusButton from "../../common/post/PlusButton";
import styled from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";

type PostDataProp = {
  postData: CafePostList[];
  cafeName?: string;
  cafeId?: number;
};

const S = {
  Container: styled.div`
    display: block;
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
    @media screen and (max-width: 767px) {
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
};

const PostList = ({ postData, cafeName, cafeId }: PostDataProp) => {
  // const data= dataAll.post;
  const data = postData;
  const [cafe, setPostData] = useRecoilState<PostCafeType>(PostCafeAtom);
  const navigate = useNavigate();

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  console.log(setPostsPerPage);

  const handleClick = () => {
    setPostData((prev) => ({
      ...prev,
      cafeName: cafeName,
      cafeId: cafeId?.toString(),
    })); //카페 이름 받아오는 함수
    navigate("../postpage/create");
    console.log("clicked");
  };
  // const handleBtnCafeName = (): void => {};
  console.log(cafe);
  return (
    <S.Container>
      <S.PostStart>
        <span>POST</span>
        <PlusButton text={"+"} handleClick={handleClick} />
      </S.PostStart>
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
      <StablePagination
        totalElements={data.length}
        elementsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </S.Container>
  );
};

export default PostList;
