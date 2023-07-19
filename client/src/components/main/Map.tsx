import { COLOR_1 } from '../../common/common';
import styled from 'styled-components';
import { FONT_SIZE_1 } from '../../common/common';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    height: 50px;
    width: 95vw;
    margin-top: 10px;
  `,
  SubContainer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 95vw;
    margin-top: 10px;
  `,
  LocationButton: styled.button`
    height: 30px;
    width: 55px;
    border-radius: 25px;
    box-shadow: 0px 1px 1px 1px gray;
    font-size: ${FONT_SIZE_1.small_2};
    border: none;
    background-color: ${COLOR_1.ivory};
    &:hover {
      background-color: ${COLOR_1.sand};
      cursor: pointer;
    }
    &:active {
      background-color: ${COLOR_1.dark_sand};
      transform: translateY(4px);
      box-shadow: none;
      cursor: pointer;
    }
  `,
};

const Map = () => {
  return (
    <S.Container>
      <script
        type='text/javascript'
        src='//dapi.kakao.com/v2/maps/sdk.js?appkey=663938e5deb9406f6bf7b47d55f1bbc8'
      ></script>
    </S.Container>
  );
};
export default Map;
