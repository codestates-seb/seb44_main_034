import { useState } from "react";
import Pagination from "react-js-pagination";
import { useQuery } from "@tanstack/react-query";
import { getCafes } from "../api/mainApi";
import SearchBox from "../components/main/SearchBox";
import LocationBox from "../components/main/LocationBox";
import FilterSearchBox from "../components/main/FilterSearchBox";
import Map from "../components/main/Map";
import styled from "styled-components";
import "../Paging.css";
import { FONT_SIZE_1 } from "../common/common";
import { BiSolidCoffeeBean } from "react-icons/bi";
// import { baseURL } from "../common/baseURL";
import { FacilitiesAtom, MoodAtom, LocationAtom } from "../recoil/mainState";
import { HandleSearchAtom } from "../recoil/mainState";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchValueAtom } from "../recoil/mainState";
import Cafe from "../components/main/Cafe";
// import { set } from 'react-hook-form';

const S = {
  ListContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    width: 90vw;
    margin-top: 10px;
    border-top: solid 1px #cfcfcf;
    @media screen and (min-width: 768px) {
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
    @media screen and (min-width: 768px) {
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
    font-family: 돋움;
    text-align: center;
    color: black;
    font-size: ${FONT_SIZE_1.small_2};
  `,
  Container: styled.div`
    display: flex;
    padding: 12px 0;
    flex-direction: column;
    align-items: center;
  `,
  ListBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90vw;
    @media screen and (min-width: 768px) {
      margin-left: 68px;
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
  length: number;
  map(
    arg0: (data: any) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  cafeId?: number;
  name?: string;
  image?: string;
  address?: string;
  rating?: number;
  countPost?: number;
  isbookmarked?: boolean;
  latitude?: number;
  longitude?: number;
}

const Main = () => {
  const shortaddress = useRecoilValue<string>(LocationAtom);
  const facilities = useRecoilValue<string>(FacilitiesAtom);
  const mood = useRecoilValue<string>(MoodAtom);
  const [handleSearch, setHandleSearch] = useRecoilState(HandleSearchAtom);
  // const [searchBox, setSearchBox] = useRecoilState(HandleSearchBoxAtom);
  const searchValue = useRecoilValue(SearchValueAtom);

  const [page, setPage] = useState<PageType>(1);
  const [sortType, setSortType] = useState<string>("");
  // console.log(sortType);

  // const [cafeData, setCafeData] = useState<MainCafeType>([]);
  const cafePerPage = 8;
  const startIndex = (page - 1) * cafePerPage;
  const endIndex = startIndex + cafePerPage;

  console.log(endIndex);
  // const currentPageData = cafeInfo.slice(startIndex, endIndex);
  // console.log(currentPageData.length);
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  // 북마크 순으로 정렬하는 함수
  const sortByBookmark = () => {
    setSortType("&sortType=countBookmark");
    setHandleSearch((prev) => !prev);
  };
  // 평점 순으로 정렬하는 함수
  const sortByRating = () => {
    setSortType("&sortType=rating");
    setHandleSearch((prev) => !prev);
  };

  // 카페 ID 순으로 정렬하는 함수
  const sortByCafeId = () => {
    setSortType("&sortType=createdAt");
    setHandleSearch((prev) => !prev);
  };

  // 게시물 수 순으로 정렬하는 함수
  const sortByCountPost = () => {
    setSortType("&sortType=countPost");
    setHandleSearch((prev) => !prev);
  };
  //카페 목록 요청 (api: ../api/mainApi.tsx)
  const {
    // isLoading,
    isError,
    error,
    data,
    // isPreviousData,
  } = useQuery(
    ["getAllCafes", page, handleSearch],
    () => getCafes(searchValue, page, shortaddress, facilities, mood, sortType),
    {
      keepPreviousData: true,
    }
  );

  console.log(sortType);
  if (isError) {
    console.log(error);
  }

  /* ☕️카페 데이터 */
  // useEffect(() => {
  //   if (data) {
  //     // setSearchBox(false);
  //     console.log("카페리스트업로드");
  //     const pageData = data.payload.content;
  //     setCafeData(pageData);
  //   }
  // }, []);

  if (data) {
    const cafeData = data.payload.content;
    const totalPages = data.payload.totalPages;
    const totalItem = totalPages * 8;
    return (
      <S.Container>
        <SearchBox />
        <LocationBox />
        <FilterSearchBox />
        <S.MapBox>
          <Map cafeData={cafeData} />
        </S.MapBox>
        <S.ListContainer>
          <S.ListSubContainer>
            <S.SubTitle>Cafe</S.SubTitle>
            <S.SubButtonBox>
              <S.FilterButton onClick={sortByBookmark}>
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
          {cafeData.map((data: MainCafeType) => {
            return <Cafe data={data} key={data.cafeId} />;
          })}
        </S.ListBox>
        {totalItem === 0 && <div>검색한 카페가 없습니다</div>}
        <Pagination
          activePage={page}
          itemsCountPerPage={cafePerPage}
          totalItemsCount={totalItem}
          pageRangeDisplayed={totalPages}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </S.Container>
    );
  }
};

export default Main;
