import { useState } from "react";
import { useRecoilState } from "recoil";
// import { LocationAtom } from "../../recoil/mainState";
import { LocationStateAtom } from "../../recoil/mainState";
import styled from "styled-components";
import { COLOR_1 } from "../../common/common";
import { FONT_SIZE_1 } from "../../common/common";

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
    width: 95vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 768px;
    }
  `,
  SubContainer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 32px;
    width: 95vw;
    @media screen and (min-width: 767px) {
      width: 728px;
    }
  `,
  LocationButton: styled.button`
    height: 28px;
    padding: 0 10px;
    border-radius: 25px;
    box-shadow: 0px 2px 4px rgba(96, 64, 64, 0.5);
    font-size: ${FONT_SIZE_1.small_3};
    border: none;
    background-color: ${COLOR_1.ivory};
    font-family: "TheJamsil5Bold";
    color: ${COLOR_1.dark_brown};
    @media screen and (min-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_1};
    }
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
    &.location {
      background-color: ${COLOR_1.dark_sand};
    }
  `,
};

const LocationBox = () => {
  const locationName = ["전체", "강서구", "양천구", "영등포구", "마포구"];
  // const shortAddress = useRecoilValue<string>(LocationAtom);
  const [locationState, setLocationState] =
    useRecoilState<string>(LocationStateAtom);
  const [location, setLocation] = useState<string>("");
  console.log(setLocation);
  const handleClickEvent = (el: string) => {
    // setLocation(el);
    // console.log(el);
    if (el === "전체") {
      setLocationState("");
      setLocation("전체");
      // setShortAddress("");
    }
    if (el !== "전체") {
      setLocationState(`shortAddress=${el}`);
      setLocation(el);
      // setShortAddress(`shortaddress=${el}`);
    }
  };
  // console.log(shortAddress);
  // console.log(location);
  console.log(locationState);
  // if (location === "전체") {
  //   setShortAddress("");
  // }
  // if (location !== "전체") {
  //   setShortAddress(`shortaddress=${location}`);
  // }

  return (
    <S.Container>
      <S.SubContainer>
        {locationName.map((el) => (
          <S.LocationButton
            key={el}
            onClick={() => {
              handleClickEvent(el);
            }}
            className={location === el ? "location" : ""}
          >
            {el}
          </S.LocationButton>
        ))}
      </S.SubContainer>
    </S.Container>
  );
};
export default LocationBox;
