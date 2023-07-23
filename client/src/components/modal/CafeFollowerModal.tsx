import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { COLOR_1 } from "../../common/common";
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
    z-index: 1;
    position: absolute;
    border-radius: 10px;
    margin-top: 370px;
    border: solid 1px ${COLOR_1.light_gray};
    background-color: ${COLOR_1.ivory};
  `,
  SubContainer: styled.div`
    width: 190px;
    height: 230px;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 160px;
    margin-top: 10px;
    border: solid 1px ${COLOR_1.light_gray};
    border-radius: 30px;
    background-color: ${COLOR_1.white};
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
    fetchData();
    ("");
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseURL}/owners/my-page?size=4&id`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          withCredentials: true,
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        // Handle success.
        console.log("success");
        const followers: Follower[] = response.data.payload.cafes;
        setLastId(response.data.payload.cafes[3].id);
        setDataSource(followers);
        setHasMore(response.data.payload.hasNext);
      })
      .catch((error) => {
        // Handle error.

        console.log("An error occurred:", error.response);
        // replace('/');
      });
  };
  const fetchMoreData = () => {
    if (hasMore) {
      axios
        .get(`${baseURL}/owners/my-page?size=4&id${lastId}`, {
          headers: {
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
              ...response.data.payload.cafes,
            ]);
            setLastId(response.data.payload.cafes[0].id);
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
          loader={<p>Loading...</p>}
          endMessage={<p>You ar all set!</p>}
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
