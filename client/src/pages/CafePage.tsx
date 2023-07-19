import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { FONT_SIZE_1, COLOR_1 } from '../common/common';
import CafeDetailMenu from '../components/cafe/CafeDetailMenu';
import CafeDetailsInfo from '../components/cafe/CafeDetailsInfo';
import Loading from '../components/Loading';
import { CafeDetailType, MenuDataType } from '../types/type';
import { baseURL } from '../common/baseURL';
import { useParams } from 'react-router-dom';
const CafePage = () => {
  const [cafeDetail, setCafeDetail] = useState<CafeDetailType | undefined>();
  const [menus, setMenus] = useState<MenuDataType[][] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/cafes');
        const response = await axios.get(`${baseURL}/cafes/${id}`, {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem('access_token'),
          },
        });
        const data = response.data.payload;
        console.log(data);
        setCafeDetail(data.cafeDetail);
        setMenus(data.menus);
        console.log(data.menus);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cafe data:', error);
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
    overflow: scroll;
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
  `,
};
export default CafePage;
