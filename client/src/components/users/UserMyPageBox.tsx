import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import { COLOR_1 } from "../../common/common";
import { FONT_SIZE_1 } from "../../common/common";
import FollowerModal from "../modal/FollowerModal";
import FollowingModal from "../modal/FollowingModal";
import BookmarkCafe from "./BookmarkCafe";
import BookmarkPost from "./BookmarkPost";
import MyPost from "./MyPost";
import profileimg from "../../assets/profileimg.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { baseURL } from "../../common/baseURL";
import coffeebean from "../../assets/coffeebean.svg";
import greenbean from "../../assets/greenbean.svg";
import espresso from "../../assets/espresso.svg";
import React from "react";
// import { useNavigate } from 'react-router-dom';

const defaultHeader = {
  "ngrok-skip-browser-warning": "true",
  "Access-Control-Allow-Origin": "*",
};

const S = {
  Container: styled.div`
    width: 90vw;
    @media screen and (min-width: 768px) {
      width: 720px;
    }
  `,
  MiddleBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 90vw;
    @media screen and (min-width: 768px) {
      flex-direction: row;
      width: 700px;
    }
  `,
  BottomBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 90vw;
    margin-bottom: 20px;
    @media screen and (min-width: 768px) {
      width: 700px;
    }
  `,
  EditButtonBox: styled.div`
    display: flex;
    justify-content: right;
    height: 60px;
    width: 90vw;
    border-bottom: solid 1px ${COLOR_1.light_gray};
    @media screen and (min-width: 768px) {
      width: 700px;
    }
  `,
  EditButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 140px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    color: ${COLOR_1.dark_sand};
    background-color: ${COLOR_1.ivory};
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
      color: white;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
      color: white;
    }
  `,
  ProfileImg: styled.img`
    width: 170px;
    border-radius: 85px;
    @media screen and (min-width: 768px) {
      width: 200px;
      border-radius: 100px;
    }
  `,
  ProfileImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 90vw;
    @media screen and (min-width: 768px) {
      width: 350px;
    }
  `,
  ProfileListBox: styled.div`
    display: flex;
    height: 200px;
    width: 90vw;
    border-radius: 10px;
    background-color: ${COLOR_1.white};
    border: solid 2px ${COLOR_1.green};
    box-shadow: 2px 2px 2px 2px ${COLOR_1.light_green};
    @media screen and (min-width: 768px) {
      width: 350px;
    }
  `,
  TitleInformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20vw;
    @media screen and (min-width: 768px) {
      width: 80px;
    }
  `,
  TitleInformaiton: styled.div`
    width: 20vw;
    margin-top: 5px;
    text-align: center;
    color: ${COLOR_1.brown};
    @media screen and (min-width: 768px) {
      width: 60px;
    }
  `,
  FollowerInformaiton: styled.div`
    width: 60vw;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    color: ${COLOR_1.black};
    &:hover {
      color: ${COLOR_1.light_red};
    }
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  FollowingInformaiton: styled.div`
    width: 60vw;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    color: ${COLOR_1.black};
    &:hover {
      color: ${COLOR_1.light_red};
    }
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  Informaiton: styled.div`
    text-align: center;
    width: 60vw;
    margin-top: 5px;
    color: black;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  SandBtn: styled.button`
    height: 5vh;
    width: 29vw;
    border-radius: 3px;
    border: none;
    background-color: ${COLOR_1.ivory};
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.small_3};
    font-weight: bold;
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 768px) {
      font-size: ${FONT_SIZE_1.normal_2};
      width: 200px;
    }
  `,
  ListBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    @media screen and (min-width: 768px) {
      width: 700px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }
  `,
  GradeImg: styled.img`
    height: 20px;
    width: 20px;
    border-radius: 10px;
  `,
  CafeContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 90vw;
    border: solid 1px black;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 1px gray;
    margin-bottom: 20px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      width: 330px;
    }
  `,
  CafeImgBox: styled.img`
    height: 140px;
    width: 90vw;
    border-radius: 10px 10px 0px 0px;
    @media screen and (min-width: 768px) {
      width: 330px;
    }
  `,
  CafeInformaiton: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 80vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  CafeTitleBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 75vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  CafeTitle: styled.div`
    width: 60px;
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  CafeRating: styled.div`
    display: flex;
    width: 50px;
    font-size: ${FONT_SIZE_1.normal_1};
  `,
  CafeAddressBox: styled.div`
    width: 75vw;
    font-size: 10px;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  CafeTagBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 60vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  CafeTag: styled.div`
    text-align: center;
    width: 70px;
    border: solid 1px black;
    border-radius: 10px;
    font-size: 10px;
  `,
  LoadingBox: styled.div`
    display: flex;
    justify-content: center;
    width: 90vw;
    height: 50px;
    margin-top: 10px;
    @media screen and (min-width: 768px) {
      width: 700px;
    }
  `,
};

interface UserData {
  email?: string;
  displayName?: string;
  grade?: string;
  countFollower?: number;
  countFollowing?: number;
  image?: File | string;
}

export interface ListType {
  id?: number;
  cafeId?: number;
  cafeName?: string;
  image?: string;
  address?: string;
  rating?: number;
  postId?: number;
  title?: string;
  author?: string;
}
const UserMyPageBox = () => {
  const [isFollowerOpen, setFollowerIsOpen] = useState<boolean>(false);
  const [isFollowingOpen, setFollowingIsOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserData | undefined>();
  const [dataSource, setDataSource] = useState<ListType[]>([]);
  const [lastId, setLastId] = useState<number>();
  const [hasMore, setHasMore] = useState(true);

  // cafe, post, myPost
  const [selectedTab, setSelctedTab] = useState<
    "bookmarked-cafe" | "bookmarked-post" | "my-post"
  >("bookmarked-cafe");

  const openFollowerModal = () => {
    if (!isFollowerOpen) {
      setFollowerIsOpen(true);
      setFollowingIsOpen(false);
    } else {
      setFollowerIsOpen(false);
    }
  };
  const openFollowingModal = () => {
    if (!isFollowingOpen) {
      setFollowingIsOpen(true);
      setFollowerIsOpen(false);
    } else {
      setFollowingIsOpen(false);
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const followModalhandler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFollowerIsOpen(false);
        setFollowingIsOpen(false);
      }
    };
    document.addEventListener("mousedown", followModalhandler);

    return () => {
      document.removeEventListener("mousedown", followModalhandler);
    };
  }, []);
  // const replace = useNavigate();
  useEffect(() => {
    axios
      .get(`${baseURL}/members/my-page`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Access-Control-Allow-Origin": "*",
          withCredentials: true,
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        setUserInfo(response.data.payload);
      })
      .catch((error) => {
        // Handle error.

        console.log("An error occurred:", error.response);
        // replace('/');
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/members/my-page/${selectedTab}?size&id`, {
        headers: {
          ...defaultHeader,
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        console.log("success");
        const myList: ListType[] = response.data.payload.data;
        const myListLength = myList.length;
        if (selectedTab === "bookmarked-cafe") {
          setLastId(
            response.data.payload.data[myListLength - 1].cafeBookMarkId
          );
        } else {
          setLastId(response.data.payload.data[myListLength - 1].postId);
        }
        setHasMore(response.data.payload.hasNext);
        setDataSource(myList);
      })
      .catch((error) => {
        // Handle error.
        setHasMore(false);
        setDataSource([]);
        console.log("An error occurred:", error.response);
        // replace('/');
      });
  }, [selectedTab]);
  const fetchMoreData = () => {
    if (hasMore) {
      axios
        .get(`${baseURL}/members/my-page/${selectedTab}?size=1&id=${lastId}`, {
          headers: {
            ...defaultHeader,
            Authorization: localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          // Handle success.
          setTimeout(() => {
            console.log("success");
            console.log(response);
            setDataSource((prevData) => [
              ...prevData,
              ...response.data.payload.data,
            ]);
            if (selectedTab === "bookmarked-cafe") {
              setLastId(response.data.payload.data[0].cafeBookMarkId);
            } else {
              setLastId(response.data.payload.data[0].postId);
            }
            setHasMore(response.data.payload.hasNext);
          }, 500);
        })

        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
          // replace('/');
        });
    } else {
      setHasMore(false);
    }
  };
  return (
    <S.Container>
      <S.MiddleBox>
        <S.ProfileImgBox>
          <S.ProfileImg
            src={
              userInfo?.image instanceof File
                ? URL.createObjectURL(userInfo?.image)
                : userInfo?.image || profileimg
            }
          ></S.ProfileImg>
        </S.ProfileImgBox>
        <S.ProfileListBox>
          <S.TitleInformaitonBox>
            <S.TitleInformaiton>이메일</S.TitleInformaiton>
            <S.TitleInformaiton>닉네임</S.TitleInformaiton>
            <S.TitleInformaiton>회원등급</S.TitleInformaiton>
            <S.TitleInformaiton>팔로워</S.TitleInformaiton>
            <S.TitleInformaiton>팔로잉</S.TitleInformaiton>
          </S.TitleInformaitonBox>
          <S.InformaitonBox ref={dropdownRef}>
            <S.Informaiton>{userInfo ? userInfo.email : "-"}</S.Informaiton>
            <S.Informaiton>
              {userInfo ? userInfo.displayName : "-"}
            </S.Informaiton>
            <S.Informaiton>
              <S.GradeImg
                src={
                  userInfo?.grade === "GRADE_COFFEE_BEAN"
                    ? coffeebean
                    : userInfo?.grade === "GRADE_ESPRESSO"
                    ? espresso
                    : greenbean
                }
              />
            </S.Informaiton>
            <S.FollowerInformaiton onClick={openFollowerModal}>
              {userInfo ? userInfo.countFollower : "0"}
            </S.FollowerInformaiton>
            {isFollowerOpen ? <FollowerModal /> : null}
            <S.FollowingInformaiton onClick={openFollowingModal}>
              {userInfo ? userInfo.countFollowing : "0"}
            </S.FollowingInformaiton>
            {isFollowingOpen ? <FollowingModal /> : null}
          </S.InformaitonBox>
        </S.ProfileListBox>
      </S.MiddleBox>
      <S.EditButtonBox>
        <Link to='/usermy/edit/:id'>
          <S.EditButton>내 정보 수정하기</S.EditButton>
        </Link>
      </S.EditButtonBox>
      <S.BottomBox>
        <S.SandBtn
          onClick={() => {
            setSelctedTab("bookmarked-cafe");
          }}
          style={{
            backgroundColor:
              selectedTab === "bookmarked-cafe"
                ? `${COLOR_1.dark_sand}`
                : `${COLOR_1.ivory}`,
          }}
        >
          북마크한 카페
        </S.SandBtn>
        <S.SandBtn
          onClick={() => {
            setSelctedTab("bookmarked-post");
          }}
          style={{
            backgroundColor:
              selectedTab === "bookmarked-post"
                ? `${COLOR_1.dark_sand}`
                : `${COLOR_1.ivory}`,
          }}
        >
          북마크한 포스트
        </S.SandBtn>
        <S.SandBtn
          onClick={() => {
            setSelctedTab("my-post");
          }}
          style={{
            backgroundColor:
              selectedTab === "my-post"
                ? `${COLOR_1.dark_sand}`
                : `${COLOR_1.ivory}`,
          }}
        >
          작성한 포스트
        </S.SandBtn>
      </S.BottomBox>

      <InfiniteScroll
        dataLength={dataSource.length} //반복되는 컴포넌트의 개수
        next={fetchMoreData} //스크롤이 화면 맨 아래에 닿았을때 부르는 함수
        hasMore={hasMore} // 추가 데이터가 있는지 여부
        loader={
          <S.LoadingBox>
            <SyncLoader color='#36d759' />
          </S.LoadingBox>
        }
        endMessage={<p>마지막 리스트입니다</p>}
        height={400}
      >
        <S.ListBox>
          {dataSource.map((el) => {
            // 각 데이터 요소마다 고유한 식별자를 가져옵니다.
            const key = el?.id || el?.cafeId || el?.postId;
            return (
              <React.Fragment key={key}>
                {selectedTab === "bookmarked-cafe" ? (
                  <BookmarkCafe data={el} />
                ) : selectedTab === "bookmarked-post" ? (
                  <BookmarkPost data={el} />
                ) : (
                  <MyPost data={el} />
                )}
              </React.Fragment>
            );
          })}
        </S.ListBox>
      </InfiniteScroll>
    </S.Container>
  );
};

export default UserMyPageBox;
