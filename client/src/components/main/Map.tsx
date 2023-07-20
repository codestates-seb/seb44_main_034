import { COLOR_1 } from "../../common/common";
import styled from "styled-components";
import { FONT_SIZE_1 } from "../../common/common";
import { useEffect } from "react";
declare global {
  interface Window {
    kakao: any;
  }
}
const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    height: 300px;
    width: 90vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 728px;
    }
  `,
  SubContainer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 90vw;
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

const { kakao } = window;
const Map = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    if (container !== null) {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
      console.log(map);
    }
  }, []);
  return <S.Container id='map'></S.Container>;
};
export default Map;
