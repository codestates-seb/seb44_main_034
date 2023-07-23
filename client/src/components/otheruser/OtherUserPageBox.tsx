import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from "react-spinners/SyncLoader";
import { useParams } from "react-router-dom";
import { COLOR_1 } from "../../common/common";
import { FONT_SIZE_1 } from "../../common/common";
import profileimg from "../../assets/profileimg.svg";
import { baseURL } from "../../common/baseURL";
import coffeebean from "../../assets/coffeebean.svg";
import greenbean from "../../assets/greenbean.svg";
import espresso from "../../assets/espresso.svg";
import roastedbean from "../../assets/roastedbean.svg";
import { ListType } from "../users/UserMyPageBox";
import MyPost from "../users/MyPost";
import styled from "styled-components";

const S = {
  Container: styled.div`
    min-height: 100vh;
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
  MiddleTopBox: styled.div`
    display: flex;
    height: 150px;
    width: 90vw;
    @media screen and (min-width: 768px) {
      width: 350px;
    }
  `,
  BottomBox: styled.div`
    display: flex;
    justify-content: center;
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
  ProfileImg: styled.img`
    width: 170px;
    @media screen and (min-width: 768px) {
      width: 200px;
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
    flex-direction: column;
    align-items: center;
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
    width: 30vw;
    @media screen and (min-width: 768px) {
      width: 80px;
    }
  `,
  TitleInformaiton: styled.div`
    width: 30vw;
    margin-top: 5px;
    text-align: center;
    color: ${COLOR_1.brown};
    @media screen and (min-width: 768px) {
      width: 60px;
    }
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
    font-weight: 200;
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
      color: white;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 768px) {
      font-size: ${FONT_SIZE_1.normal_2};
      width: 200px;
    }
  `,
  GradeImg: styled.img`
    height: 20px;
    width: 20px;
  `,
  FollowButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 160px;
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
  UnFollowButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 160px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    color: white;
    background-color: #a57d52;
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #764f26;
      color: white;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
      color: white;
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
  PostContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 90vw;
    border: solid 1px black;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 1px gray;
    margin-top: 20px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      width: 330px;
    }
  `,
  PostImgBox: styled.img`
    height: 140px;
    width: 90vw;
    border-radius: 10px 10px 0px 0px;
    @media screen and (min-width: 768px) {
      width: 330px;
    }
  `,
  PostInformaiton: styled.div`
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
  PostTitleBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 75vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  PostTitle: styled.div`
    width: 80vw;
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  PostWriterBox: styled.div`
    display: flex;
    justify-content: right;
    width: 60vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  Writer: styled.div`
    text-align: center;
    width: 70px;
    font-size: ${FONT_SIZE_1.normal_1};
  `,
  EndMessageBox: styled.div`
    width: 180;
    text-align: center;
    margin-top: 10px;
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
  displayName?: string;
  grade?: string;
  image?: File;
}

const OtherUserMyPageBox = () => {
  // const replace = useNavigate();
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState<UserData | undefined>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<ListType[]>([]);
  const [lastId, setLastId] = useState<number>();
  const [hasMore, setHasMore] = useState(true);
  //특정회원 정보 불러오기
  useEffect(() => {
    axios
      .get(`${baseURL}/members/${id}`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        console.log("아더유저");
        setMemberInfo(response.data.payload);
        setIsFollowing(response.data.payload.following);
      })
      .catch((error) => {
        // Handle error.

        console.log("An error occurred:", error.response);
        // replace('/');
      });
  }, []);
  //특정회원 팔로우하기
  const followingHandler = () => {
    axios
      .post(`${baseURL}/members/${id}/follow`, null, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        console.log(response);
        setIsFollowing(!isFollowing);
      })
      .catch((error) => {
        // Handle error.

        console.log("An error occurred:", error.response);
        // replace('/');
      });
  };

  //특정회원 포스터 불러오기
  useEffect(() => {
    axios
      .get(`${baseURL}/members/my-page/?size&id`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        console.log("여기");
        const myList: ListType[] = response.data.payload.data;
        const myListLength = myList.length;
        setLastId(response.data.payload.data[myListLength - 1].postId);
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
  }, []);
  const fetchMoreData = () => {
    if (hasMore) {
      axios
        .get(`${baseURL}/members/my-page/?size=1&id=${lastId}`, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          // Handle success.
          setTimeout(() => {
            console.log("팔로어");
            console.log(response);
            setDataSource((prevData) => [
              ...prevData,
              ...response.data.payload.data,
            ]);
            setLastId(response.data.payload.data[0].postId);
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
              memberInfo?.image
                ? URL.createObjectURL(memberInfo.image)
                : profileimg
            }
          />
        </S.ProfileImgBox>
        <S.ProfileListBox>
          <S.MiddleTopBox>
            <S.TitleInformaitonBox>
              <S.TitleInformaiton>닉네임</S.TitleInformaiton>
              <S.TitleInformaiton>회원등급</S.TitleInformaiton>
            </S.TitleInformaitonBox>
            <S.InformaitonBox>
              <S.Informaiton>
                {memberInfo ? memberInfo.displayName : "-"}
              </S.Informaiton>
              <S.Informaiton>
                <S.GradeImg
                  src={
                    memberInfo?.grade === "GRADE_COFFEE_BEAN"
                      ? coffeebean
                      : memberInfo?.grade === "GRADE_ROASTED_BEAN"
                      ? roastedbean
                      : memberInfo?.grade === "GRADE_ESPRESSO"
                      ? espresso
                      : greenbean
                  }
                />
              </S.Informaiton>
            </S.InformaitonBox>
          </S.MiddleTopBox>
          {!isFollowing ? (
            <S.FollowButton onClick={followingHandler}>
              팔로우하기
            </S.FollowButton>
          ) : (
            <S.UnFollowButton onClick={followingHandler}>
              언팔로우하기
            </S.UnFollowButton>
          )}
        </S.ProfileListBox>
      </S.MiddleBox>
      <S.EditButtonBox></S.EditButtonBox>
      <S.BottomBox>
        <S.SandBtn>작성한 포스트</S.SandBtn>
      </S.BottomBox>

      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <S.LoadingBox>
            <SyncLoader color='#36d759' />
          </S.LoadingBox>
        }
        endMessage={<S.EndMessageBox>불러올 포스트가 없습니다</S.EndMessageBox>}
        height={400}
      >
        <S.ListBox>
          {dataSource.map((el) => {
            return <MyPost data={el} key={el?.id} />;
          })}
        </S.ListBox>
      </InfiniteScroll>
    </S.Container>
  );
};

export default OtherUserMyPageBox;
