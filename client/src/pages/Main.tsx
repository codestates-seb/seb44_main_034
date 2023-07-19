import { useEffect, useState } from 'react';
import SearchBox from '../components/main/SearchBox';
import LocationBox from '../components/main/LocationBox';
import FilterSearchBox from '../components/main/FilterSearchBox';
import Map from '../components/main/Map';
import styled from 'styled-components';
import CafeList from '../components/main/CafeList';
import axios from 'axios';
import { baseURL } from '../common/baseURL';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};

const Main = () => {
  const [page, setPage] = useState<number>(1); //페이지
  const [cafeInfo, setCafeInfo] = useState([]);
  const limit = 10; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  useEffect(() => {
    axios
      .get(`${baseURL}/members/my-page/`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      })
      .then((response) => {
        // Handle success.
        console.log('success');
        setCafeInfo(response.data);
      })
      .catch((error) => {
        // Handle error.

        console.log('An error occurred:', error.response);
        // replace('/');
      });
  }, []);

  const postsData = (posts: any) => {
    if (posts) {
      const result = posts.slice(offset, offset + limit);
      return result;
    }
  };
  return (
    <S.Container>
      <SearchBox />
      <LocationBox />
      <FilterSearchBox />
      <Map />
      <CafeList />
      {/* <Pagenation
        limit={limit}
        page={page}
        totalPosts={cafeInfo.length}
        setPage={setPage}
      /> */}
    </S.Container>
  );
};

export default Main;
