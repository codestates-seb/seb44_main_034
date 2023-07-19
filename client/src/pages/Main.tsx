import { styled } from 'styled-components';
import CafeMap from '../components/map/CafeMap';
const Main = () => {
  return (
    <S.Container>
      메인
      <CafeMap />
    </S.Container>
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
};
export default Main;
