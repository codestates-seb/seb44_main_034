import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCafes } from '../api/mainApi';
import SearchBox from '../components/main/SearchBox';
import LocationBox from '../components/main/LocationBox';
import FilterSearchBox from '../components/main/FilterSearchBox';
import Map from '../components/main/Map';
import styled from 'styled-components';
import CafeList from '../components/main/CafeList';
import { baseURL } from '../common/baseURL';
import { FacilitiesAtom, LocationAtom } from '../recoil/mainState';
import { HandleSearchAtom } from '../recoil/mainState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { set } from 'react-hook-form';

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
  const shortaddress = useRecoilValue<string>(LocationAtom);
  const facilities = useRecoilValue<string>(FacilitiesAtom);
  const [handleSearch, setHandleSearch] = useRecoilState(HandleSearchAtom);

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

  //카페 목록 요청 (api: ../api/mainApi.tsx)
  const {
    // isLoading,
    // isError,
    // error,
    data,
    // isPreviousData,
  } = useQuery(
    ['getAllposts', page, handleSearch],
    () => getCafes(page, shortaddress, facilities),
    {
      keepPreviousData: true,
    }
  );

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>{error as string}</p>

  /* ☕️카페 데이터 */
  if (data) {
    setHandleSearch(false); //서치 함수
    const cafesData = data.payload;
    console.log(cafesData);
    console.log(data);
    console.log(data.payload);
    console.log(data.payload.pageInfo);
    const pageData = data.payload.pageInfo;
    console.log(pageData);
    // const lastPage = () => setPage(pageData.totalpages);
    // const firstPage = () => setPage(1);
    // const pagesArray = Array(pageData.totalpages)
    //   .fill(null)
    //   .map((_, i) => i + 1);
  }

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
