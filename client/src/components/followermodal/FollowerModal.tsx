import { COLOR_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import styled from 'styled-components';
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 180px;
    z-index: 1;
    position: absolute;
    border-radius: 10px;
    border: solid 1px ${COLOR_1.light_gray};
    background-color: ${COLOR_1.sand};
  `,
  SubContainer: styled.div`
    width: 150px;
    height: 250px;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 150px;
    margin-top: 10px;
    border: solid 1px ${COLOR_1.light_gray};
    border-radius: 5px;
    background-color: ${COLOR_1.white};
  `,
  UserImg: styled.img`
    height: 50px;
    width: 50px;
    border-radius: 25px;
  `,
  UserName: styled.div`
    display: flex;
    align-items: center;
    justify-content: right;
    height: 50px;
    width: 100px;
    background-color: white;
  `,
};

const FollowerModal = () => {
  //   const [data, setData] = useState([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [page, setPage] = useState(1);

  //   useEffect(() => {
  //     // 스크롤 이벤트 리스너 등록
  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //       // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 해제
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, []);

  //   const handleScroll = () => {
  //     // 스크롤 이벤트 핸들러
  //     if (
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //       !isLoading
  //     ) {
  //       // 스크롤이 하단에 도달하고 로딩 중이 아닐 때
  //       fetchData(); // 추가 데이터 로드
  //     }
  //   };

  //   const fetchData = async () => {
  //     setIsLoading(true);

  // 데이터 로드를 위한 API 호출 등의 비동기 작업 수행
  // const newItems = await fetchMoreData();

  // 기존 데이터에 새로운 데이터 추가
  //     setData((prevData) => [...prevData, ...newItems]);

  //     setPage((prevPage) => prevPage + 1);
  //     setIsLoading(false);
  //   };

  //   const fetchMoreData = () => {
  //     // 새로운 데이터를 가져오는 비동기 작업 수행
  //     // 예를 들어, API 호출 등
  //     // 가져온 데이터를 반환하는 Promise를 리턴합니다.

  //     // 예시: 페이지와 관련된 데이터를 가져오는 API 호출
  //     return fetch(`https://api.example.com/data?page=${page}`)
  //       .then((response) => response.json())
  //       .then((data) => data.items);
  //   };

  return (
    <S.Container>
      <S.SubContainer>
        <S.UserBox>
          <S.UserImg src={profileimg}></S.UserImg>
          <S.UserName>나나</S.UserName>
        </S.UserBox>
        {/* 로딩 표시
      {isLoading && <div>Loading...</div>} */}
      </S.SubContainer>
    </S.Container>
  );
};

export default FollowerModal;
