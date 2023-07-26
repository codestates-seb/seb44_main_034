import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { baseURL } from "../../common/baseURL";
import styled from "styled-components";
import PostDate from "./PostDate";
import { ReqPostData } from "../../types/type";
import { ResPostData } from "../../types/type";
import { PostItemAtom } from "../../recoil/postState";
import { PostImgAtom } from "../../recoil/postState";
import { GetPostAtom } from "../../recoil/postState";
import KakaoShare from "../../common/KakaoShare";
import { decodeToken } from "../../common/token/decodeToken";
import { IoShareSocial } from "react-icons/io5";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { COLOR_1, FONT_SIZE_2, FONT_WEIGHT } from "../../common/common";

type PostItemProps = {
  postData: ResPostData;
};

// type FnProps = {
//   postId: number;
// }

const PostItemHead = ({ postData }: PostItemProps) => {
  const {
    postId,
    cafeId,
    cafeName,
    authorId,
    title,
    author,
    createdAt,
    image,
    content,
    starRating,
    tagNames,
  } = postData;
  // console.log(postId);
  // console.log(typeof postId);
  const setPostState = useSetRecoilState<ReqPostData>(PostItemAtom);
  const setPostImg = useSetRecoilState<string>(PostImgAtom);
  const [user, setUser] = useState("");
  const url = `https://cafein34.vercel.app/postpage/${postId}`;
  const setGetItem = useSetRecoilState(GetPostAtom);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const decodedPayLoad = decodeToken(token);
  useEffect(() => {
    if (token) {
      setUser(decodedPayLoad.userId);
    }
  }, []);
  const clickBookmark = async () => {
    try {
      await axios.post(`${baseURL}/posts/${postId}/bookmark`, null, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });
      setGetItem((prev) => !prev);
      // console.log("clicked");
      // console.log(response.data);
    } catch (error) {
      if (token) {
        alert("일시적인 오류가 발생했습니다. 잠시 후, 다시 시도해주세요.");
      } else {
        alert("로그인을 해주세요.");
      }
    }
  };
  const deleteMutation = useMutation(
    async () => {
      await axios.delete(`${baseURL}/posts/${postId}`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });
    },
    {
      onSuccess: () => {
        alert("삭제되었습니다. 메인페이지로 이동합니다.");
        navigate("../main");
      },
    }
  );

  const handleEdit = () => {
    const reqData = {
      // cafeId: cafeId,
      title: title,
      // image: image,
      content: content,
      starRating: starRating,
      tags: tagNames,
    };
    setPostState(reqData);
    setPostImg(image);
    navigate(`/postpage/edit/${postId}`);
  };
  const handleDelete = () => {
    //if user Id와 지금 userId가 일치하면
    if (confirm("삭제하신 글은 복구되지 않습니다. 정말로 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const clickSocial = () => {
    // useEffect(() => {
    // kakaoMessage();
    // }, []);

    const kakaoMessage = () => {
      if (window.Kakao) {
        const kakao = window.Kakao;

        if (!kakao.isInitialized()) {
          kakao.init("61eed962b53ec01e122316ed9170a6e2");
        }
      }
    };
    kakaoMessage();
    KakaoShare({ title: title, image: image, url: url });
  };
  return (
    <>
      <S.CafeNameWrap>
        <Link to={`../cafes/${cafeId}`}>
          <S.CafeName>{cafeName}</S.CafeName>
        </Link>
      </S.CafeNameWrap>
      <S.TitleWrap>
        <S.Title>{title}</S.Title>
      </S.TitleWrap>
      <S.FlexDiv>
        <S.InfoWrap>
          <Link to={`../otherusermy/${authorId}`}>
            <S.Autor>{author}</S.Autor>
          </Link>
        </S.InfoWrap>
        <S.CircleWrap>
          <S.Circle>
            <IoShareSocial
              size='30'
              onClick={() => {
                clickSocial();
              }}
            />
            {/* <KakaoShare /> */}
          </S.Circle>
          <S.Circle>
            {postData.isBookmarked ? (
              <GoBookmarkFill
                size='30'
                onClick={() => {
                  clickBookmark();
                }}
              />
            ) : (
              <GoBookmark
                size='30'
                onClick={() => {
                  clickBookmark();
                }}
              />
            )}
          </S.Circle>
        </S.CircleWrap>
      </S.FlexDiv>
      <S.FlexDiv>
        <S.DateWrap>
          <div>
            <PostDate postDate={createdAt} />
          </div>
        </S.DateWrap>
        {user === authorId ? (
          <S.EditWrap>
            <S.Edit onClick={handleEdit}>수정</S.Edit>
            <S.Edit
              onClick={() => {
                handleDelete();
              }}
            >
              삭제
            </S.Edit>
          </S.EditWrap>
        ) : null}
      </S.FlexDiv>
    </>
  );
};

const S = {
  CafeNameWrap: styled.div`
    text-align: left;
    margin: 30px 5px 8px -5px;
    @media screen and (max-width: 767px) {
      margin: 10px 5px 8px -5px;
    }
  `,
  CafeName: styled.span`
    text-align: left;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_4};
    cursor: pointer;
    &:hover {
      color: ${COLOR_1.brown};
    }
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_2.normal_3};
      font-weight: ${FONT_WEIGHT.weight_300};
    }
  `,
  TitleWrap: styled.div`
    text-align: left;
  `,
  Title: styled.span`
    width: 95%;
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_2.big_3};
    font-weight: ${FONT_WEIGHT.weight_400};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_2.normal_5};
      font-weight: ${FONT_WEIGHT.weight_300};
    }
  `,
  FlexDiv: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  InfoWrap: styled.div`
    margin: 20px -5px 5px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  Autor: styled.span`
    margin: 0 14px;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_4};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_2.normal_3};
    }
    &:hover {
      color: ${COLOR_1.brown};
      cursor: pointer;
    }
  `,
  CircleWrap: styled.div`
    display: flex;
  `,
  Circle: styled.div`
    margin: 0 5px 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover {
      cursor: pointer;
    }
  `,
  DateWrap: styled.div`
    display: flex;
    justify-content: flex;
    align-items: center;
    margin: 8px 14px;
    > div {
      display: block;
    }
  `,
  EditWrap: styled.div`
    color: grey;
    margin: 0px 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  Edit: styled.span`
    color: rgba(108, 87, 78, 0.8);
    font-size: ${FONT_SIZE_2.normal_2};
    margin-left: 18px;
    margin-right: 4px;
    text-align: center;
    &:hover {
      color: ${COLOR_1.brown};
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      text-align: center;
    }
  `,
};

export default PostItemHead;
