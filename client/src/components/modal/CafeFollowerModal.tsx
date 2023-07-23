import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import profileimg from "../../assets/profileimg.svg";
import styled from "styled-components";
import { baseURL } from "../../common/baseURL";
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 230px;
    width: 200px;
    z-index: 0;
    position: absolute;
    border-radius: 10px;
    margin-top: 350px;
    border: solid 2px #525252;
    box-shadow: 0px 0px 10px 0px gray;
    background-color: white;
  `,
  SubContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 200px;
    height: 250px;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 165px;
    margin-top: 10px;
    border: solid 2px #525252;
    border-radius: 30px;
    background-color: #e9e9e9;
    box-shadow: 0px 0px 2px 0px gray;
    &:hover {
      background-color: white;
    }
  `,
  UserImg: styled.img`
    height: 50px;
    width: 50px;
    margin-left: 5px;
    border-radius: 25px;
  `,
  UserName: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    width: 70px;
  `,
  EndMessageBox: styled.div`
    width: 180;
    text-align: center;
    margin-top: 10px;
  `,
  LoadingBox: styled.div`
    display: flex;
    justify-content: center;
    width: 180px;
    margin-top: 20px;
  `,
};

interface Follower {
  id?: number;
  displayName?: string;
  image?: string;
}
const CafeFollowerModal = () => {
  const [dataSource, setDataSource] = useState<Follower[]>(Array.from([]));
  const [lastId, setLastId] = useState<number>();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURL}/owners/my-page`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          withCredentials: true,
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        console.log(response);
        const followers: Follower[] = response.data.payload.data;
        const myListLength = followers.length;
        setLastId(response.data.payload.data[myListLength - 1].id);
        setDataSource(followers);
        setHasMore(response.data.payload.hasNext);
      })
      .catch((error) => {
        setHasMore(false);
        setDataSource([]);
        console.log("An error occurred:", error.response);
        // replace('/');
      });
  }, []);
  const fetchMoreData = () => {
    if (hasMore) {
      axios
        .get(`${baseURL}/members/my-page/follower?size&id=${lastId}`, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          // Handle success.
          setTimeout(() => {
            console.log(response);
            setDataSource((prevData) => [
              ...prevData,
              ...response.data.payload.data,
            ]);
            setLastId(response.data.payload.data[0].id);
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
      <S.SubContainer>
        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <S.LoadingBox>
              <SyncLoader color='#36d759' />
            </S.LoadingBox>
          }
          endMessage={<S.EndMessageBox>불러올 유저가 없습니다</S.EndMessageBox>}
          height={200}
        >
          {dataSource.map((item) => {
            return (
              <S.UserBox key={item.id}>
                <S.UserImg src={item.image || profileimg}></S.UserImg>
                <S.UserName>{item.displayName}</S.UserName>
              </S.UserBox>
            );
          })}
        </InfiniteScroll>
      </S.SubContainer>
    </S.Container>
  );
};

export default CafeFollowerModal;
