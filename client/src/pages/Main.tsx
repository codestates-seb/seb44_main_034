import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import SearchBox from '../components/main/SearchBox';
import LocationBox from '../components/main/LocationBox';
import FilterSearchBox from '../components/main/FilterSearchBox';
import Map from '../components/main/Map';
import styled from 'styled-components';
import '../Paging.css';
import axios from 'axios';
import { baseURL } from '../common/baseURL';
import Cafe from '../components/main/Cafe';
import { FONT_SIZE_1 } from '../common/common';
import { BiSolidCoffeeBean } from 'react-icons/bi';

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
  const mockData = [
    {
      cafeId: 1,
      cafeName: '동대문 카페',
      image: undefined,
      address: '서울시 동대문구',
      rating: 4,
      countPost: 5,
    },
    {
      cafeId: 2,
      cafeName: '동대문 카페1',
      image: undefined,
      address: '서울시 동대문구',
      rating: 2,
      countPost: 2,
    },
    {
      cafeId: 3,
      cafeName: '동대문 카페2',
      image: undefined,
      address: '서울시 동대문구',
      rating: 1,
      countPost: 3,
    },
    {
      cafeId: 4,
      cafeName: '동대문 카페3',
      image: undefined,
      address: '서울시 동대문구',
      rating: 3,
      countPost: 6,
    },
    {
      cafeId: 5,
      cafeName: '동대문 카페4',
      image: undefined,
      address: '서울시 동대문구',
      rating: 4,
      countPost: 8,
    },
    {
      cafeId: 6,
      cafeName: '동대문 카페5',
      image: undefined,
      address: '서울시 동대문구',
      rating: 5,
      countPost: 2,
    },
    {
      cafeId: 7,
      cafeName: '동대문 카페6',
      image: undefined,
      address: '서울시 동대문구',
      rating: 3,
      countPost: 1,
    },
    {
      cafeId: 8,
      cafeName: '동대문 카페7',
      image: undefined,
      address: '서울시 동대문구',
      rating: 1,
      countPost: 1,
    },
    {
      cafeId: 9,
      cafeName: '동대문 카페8',
      image: undefined,
      address: '서울시 동대문구',
      rating: 1,
    },
    {
      cafeId: 10,
      cafeName: '동대문 카페9',
      image: undefined,
      address: '서울시 동대문구',
      rating: 2,
      countPost: 1,
    },
    {
      cafeId: 11,
      cafeName: '동대문 카페10',
      image: undefined,
      address: '서울시 동대문구',
      rating: 1,
    },
    {
      cafeId: 12,
      cafeName: '동대문 카페11',
      image: undefined,
      address: '서울시 동대문구',
      rating: 1,
      countPost: 22,
    },
    {
      cafeId: 13,
      cafeName: '동대문 카페12',
      image: undefined,
      address: '서울시 동대문구',
      rating: 1,
      countPost: 0,
    },
  ];
  const [page, setPage] = useState<PageType>(1);
  const [cafeInfo, setCafeInfo] = useState<MainCafeType[]>(mockData);
  const cafePerPage = 6;
  const startIndex = (page - 1) * cafePerPage;
  const endIndex = startIndex + cafePerPage;
  const currentPageData = cafeInfo.slice(startIndex, endIndex);
  console.log(currentPageData.length);
  const handlePageChange = (pageNumber: number) => {
    console.log(pageNumber);
    setPage(pageNumber);
  };
  // 평점 순으로 정렬하는 함수
  const sortByRating = () => {
    const sortedData = [...cafeInfo];
    sortedData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setCafeInfo(sortedData);
  };

  // 카페 ID 순으로 정렬하는 함수
  const sortByCafeId = () => {
    const sortedData = [...cafeInfo];
    sortedData.sort((a, b) => (a.cafeId || 0) - (b.cafeId || 0));
    setCafeInfo(sortedData);
  };

  // 게시물 수 순으로 정렬하는 함수
  const sortByCountPost = () => {
    const sortedData = [...cafeInfo];
    sortedData.sort((a, b) => (b.countPost || 0) - (a.countPost || 0));
    setCafeInfo(sortedData);
  };
  useEffect(() => {
    // 데이터를 불러오는 함수
    const fetchData = () => {
      axios
        .get(`${baseURL}/members/my-page/`, {
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
      <Map />
      <S.ListContainer>
        <S.ListSubContainer>
          <S.SubTitle>Cafe</S.SubTitle>
          <S.SubButtonBox>
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
