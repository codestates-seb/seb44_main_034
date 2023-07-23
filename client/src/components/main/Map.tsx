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

const createMarkerAndInfowindow = (map: any, cafe: any) => {
  const markerPosition = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
  console.log(cafe.latitude);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);

  const iwContent = `<div style="padding:5px; border:1px solid green; ">
  ${cafe.name} 
  <div style="font-size:5px">${cafe.address}</div>
  <a href="https://cafein34.vercel.app/cafes/${cafe.cafeId}" style="color:green; font-size:10px;" target="_blank">카페 보러가기</a>
  </div> `;
  const iwPosition = new kakao.maps.LatLng(cafe.latitude, cafe.longitude);
  const iwRemoveable = true;
  const infowindow = new kakao.maps.InfoWindow({
    position: iwPosition,
    content: iwContent,
    removable: iwRemoveable,
  });

  kakao.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, marker);
  });
};

const Map = ({ cafeData }: any) => {
  useEffect(() => {
    const container = document.getElementById("map");
    if (container !== null) {
      const options = {
        center: new kakao.maps.LatLng(37.549328709, 126.913624675), //합정역
        level: 8,
      };
      const map = new kakao.maps.Map(container, options);
      if (cafeData) {
        cafeData.forEach((cafe: any) => {
          createMarkerAndInfowindow(map, cafe);
        });
      }
    }
  });

  return <S.Container id='map'></S.Container>;
};
export default Map;
