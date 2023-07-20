import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCafes } from '../api/mainApi';
import SearchBox from '../components/main/SearchBox';
import LocationBox from '../components/main/LocationBox';
import FilterSearchBox from '../components/main/FilterSearchBox';
import Map from '../components/main/Map';
import styled from 'styled-components';
import '../Paging.css';
import Cafe from '../components/main/Cafe';
import { FONT_SIZE_1 } from '../common/common';
import { BiSolidCoffeeBean } from 'react-icons/bi';
import { baseURL } from '../common/baseURL';
import { FacilitiesAtom, LocationAtom } from '../recoil/mainState';
import { HandleSearchAtom } from '../recoil/mainState';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { set } from 'react-hook-form';

const S = {
  ListContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    width: 90vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 768px;
    }
  `,
  ListSubContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 80px;
    width: 90vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 728px;
    }
  `,
  SubTitle: styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 100px;
    font-size: ${FONT_SIZE_1.big_3};
  `,
  SubButtonBox: styled.div`
    display: flex;
    height: 50px;
    width: 200px;
  `,
  FilterButton: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 60px;
    background-color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    &:active {
      background-color: #d6d6d6;
    }
  `,
  Iconbox: styled.div`
    height: 35px;
    width: 35px;
    text-align: center;
    color: black;
  `,
  IconTextBox: styled.div`
    height: 20px;
    width: 40px;
    text-align: center;
    color: black;
    font-size: ${FONT_SIZE_1.small_2};
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ListBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    @media screen and (min-width: 786px) {
      width: 700px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
    }
  `,
  MapBox: styled.div`
    z-index: 0;
  `,
};

type PageType = number;
export interface MainCafeType {
  cafeId?: number;
  cafeName?: string;
  image?: string;
  address?: string;
  rating?: number;
  countPost?: number;
}
const Main = () => {
  const shortaddress = useRecoilValue<string>(LocationAtom);
  const facilities = useRecoilValue<string>(FacilitiesAtom);
  const [handleSearch, setHandleSearch] = useRecoilState(HandleSearchAtom);

  const mockData = [
    {
      cafeId: 1,
      cafeName: '동대문 카페',
      image: undefined,
      address: '서울시 동대문구',
      rating: 4,
      countPost: 5,
    },
  ];
  const [page, setPage] = useState<PageType>(1);
  const [cafeInfo, setCafeInfo] = useState<MainCafeType[]>(mockData);
  const [sortType, setSortType] = useState<string>('');
  const cafePerPage = 6;
  const startIndex = (page - 1) * cafePerPage;
  const endIndex = startIndex + cafePerPage;
  const currentPageData = cafeInfo.slice(startIndex, endIndex);
  console.log(currentPageData.length);
  const handlePageChange = (pageNumber: number) => {
    console.log(pageNumber);
    setPage(pageNumber);
  };
  // 북마크 순으로 정렬하는 함수
  const sortByBookmark = () => {
    setSortType('sortType=countBookmark');
  };
  // 평점 순으로 정렬하는 함수
  const sortByRating = () => {
    setSortType('sortType=rating');
  };

  // 카페 ID 순으로 정렬하는 함수
  const sortByCafeId = () => {
    setSortType('sortType=countPost');
  };

  // 게시물 수 순으로 정렬하는 함수
  const sortByCountPost = () => {
    setSortType('sortType=createdAt');
  };
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
  }
  useEffect(() => {
    // 데이터를 불러오는 함수
    const fetchData = () => {
      axios
        .get(`${baseURL}/members/my-page/&sortType=${sortType}&page=1&size=3`, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        })
        .then((response) => {
          // Handle success.
          console.log('success');
          setCafeInfo(response.data); // 받아온 데이터를 상태로 설정
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response);
          // replace('/');
        });
    };

    fetchData(); // 페이지가 변경될 때마다 데이터를 불러오도록 호출
  }, [page]);

  return (
    <S.Container>
      <SearchBox />
      <LocationBox />
      <FilterSearchBox />
      <S.MapBox>
        <Map />
      </S.MapBox>
      <S.ListContainer>
        <S.ListSubContainer>
          <S.SubTitle>Cafe</S.SubTitle>
          <S.SubButtonBox onClick={sortByBookmark}>
            <S.FilterButton>
              <S.Iconbox>
                <BiSolidCoffeeBean size='30' color='#4f2500' />
              </S.Iconbox>
              <S.IconTextBox>북마크순</S.IconTextBox>
            </S.FilterButton>
            <S.FilterButton onClick={sortByRating}>
              <S.Iconbox>
                <BiSolidCoffeeBean size='30' color='#4f2500' />
              </S.Iconbox>
              <S.IconTextBox>별점순</S.IconTextBox>
            </S.FilterButton>
            <S.FilterButton onClick={sortByCountPost}>
              <S.Iconbox>
                <BiSolidCoffeeBean size='30' color='#4f2500' />
              </S.Iconbox>
              <S.IconTextBox>포스트순</S.IconTextBox>
            </S.FilterButton>
            <S.FilterButton onClick={sortByCafeId}>
              <S.Iconbox>
                <BiSolidCoffeeBean size='30' color='#4f2500' />
              </S.Iconbox>
              <S.IconTextBox>신규순</S.IconTextBox>
            </S.FilterButton>
          </S.SubButtonBox>
        </S.ListSubContainer>
      </S.ListContainer>
      <S.ListBox>
        {currentPageData.map((data) => {
          return <Cafe data={data} key={data.cafeId} />;
        })}
      </S.ListBox>
      <Pagination
        activePage={page}
        itemsCountPerPage={cafePerPage}
        totalItemsCount={cafeInfo.length}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />
    </S.Container>
  );
};

export default Main;
