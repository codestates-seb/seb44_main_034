import { useEffect, useState } from "react";
import axios from "axios";
import { styled, css } from "styled-components";
import { FONT_SIZE_1, COLOR_1 } from "../common/common";
import CafeDetailMenu from "../components/cafe/CafeDetailMenu";
import CafeDetailsInfo from "../components/cafe/CafeDetailsInfo";
import Loading from "../components/Loading";
import { CafeDetailType, MenuDataType } from "../types/type";
import { baseURL } from "../common/baseURL";
import { useParams } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";
const CafePage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [cafeDetail, setCafeDetail] = useState<CafeDetailType | undefined>();
  const [menus, setMenus] = useState<MenuDataType[][] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const handleBookmarkClick = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/cafes/${id}/Bookmark`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
      setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending bookmark request:", error);
    }
  };
  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/cafes');
        const response = await axios.get(`${baseURL}/cafes/${id}`, {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("access_token"),
          },
        });
        const data = response.data.payload;
        console.log(data);
        setCafeDetail(data.cafeDetail);
        console.log(data.cafeDetail);
        setMenus(data.menus);
        console.log(data.menus);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cafe data:", error);
      }
    };
    fetchCafeData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> // 로딩 페이지 표시
      ) : (
        <S.Container>
          <S.BookmarkDiv>
            <Bookmark
              onClick={handleBookmarkClick}
              isBookmarked={isBookmarked}
            />
          </S.BookmarkDiv>

          {cafeDetail && <CafeDetailsInfo cafeDetail={cafeDetail} />}
          <S.Title>
            Menu
            <div></div>
          </S.Title>
          {menus && <CafeDetailMenu menu={menus} />}
          <S.Title>
            Post
            <div></div>
            {/* 여기에 추가해주시면 됩니다 !! 위에 div는 구분선입니다 ㅎ.ㅎ  */}
          </S.Title>
        </S.Container>
      )}
    </>
  );
};
const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    flex-direction: column;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
    }
  `,
  Title: styled.div`
    font-size: ${FONT_SIZE_1.big_6};
    margin-top: 2%;
    > div {
      border-bottom: 1px solid ${COLOR_1.green};
    }
    @media screen and (max-width: 767px) {
      text-align: center;
    }
  `,
  BookmarkDiv: styled.div`
    display: flex;
    justify-content: end;
  `,
};

const Bookmark = styled(BsFillBookmarkFill)`
  width: 40px;
  height: 40px;
  text-align: end;
  color: ${COLOR_1.dark_brown};
  cursor: pointer;

  /* 클릭된 상태일 때 색상 변경 */
  ${({ isBookmarked }) =>
    isBookmarked &&
    css`
      color: white; /* 클릭된 상태일 때 색상 */
      border: 1px soild ${COLOR_1.dark_brown};
    `}
`;
export default CafePage;
