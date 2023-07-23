import { useEffect, useState } from "react";
import {
  useRecoilState,
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { FacilitiesAtom } from "../../recoil/mainState";
import { MoodAtom } from "../../recoil/mainState";
import { SearchValueAtom, SearchValueStateAtom } from "../../recoil/mainState";
import { LocationAtom, LocationStateAtom } from "../../recoil/mainState";
import { FacilitiesStateAtom, MoodStateAtom } from "../../recoil/mainState";
import { HandleSearchAtom } from "../../recoil/mainState";
import { FacilitiesTagNames, MoodTagNames } from "../../common/tagNames";
import FacilitiesTag from "../../common/tags/FacilitiesTag";
import MoodTag from "../../common/tags/MoodTag";
import { COLOR_1 } from "../../common/common";
import styled from "styled-components";
import { FONT_SIZE_1 } from "../../common/common";

const S = {
  Container: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 270px;
    margin-top: 2px;
    align-items: center;
    width: 95%;
    @media screen and (min-width: 768px) {
      width: 760px;
    }
  `,
  FacilityContainer: styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    height: 44px;
    width: 95%;
    margin-top: 6px;
    padding: 0 10px;
    flex-wrap: nowrap;
    border-radius: 20px;
    border: solid 1px ${COLOR_1.brown};
    overflow-x: auto;
    > div {
      margin-right: 10px;
      margin-top: 4px;
    }
    @media screen and (min-width: 768px) {
      justify-content: space-around;
      width: 760px;
      height: 50px;
      padding: 0 100px;
      > div {
        margin-right: 14px;
      }
    }
  `,
  MoodContainer: styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    height: 108px;
    width: 95%;
    margin-top: 6px;
    padding: 6px 4px;
    gap: 7px;
    flex-wrap: wrap;
    background-color: ${COLOR_1.sand};
    border-radius: 20px;
    border: solid 1px ${COLOR_1.brown};
    overflow-y: auto;
    > div {
      margin-bottom: 1px;
    }
    @media screen and (min-width: 768px) {
      width: 760px;
      height: 120px;
      padding: 8px 4px;
      gap: 8px;
    }
  `,
  TitleBox: styled.div`
    height: 20px;
    width: 100%;
    margin-top: 12px;
    @media screen and (min-width: 768px) {
      width: 770px;
    }
  `,
  Title: styled.div`
    height: 20px;
    text-align: left;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: center;
    width: 90vw;
  `,
  SearchButton: styled.button`
    height: 30px;
    padding: 0 10px;
    border-radius: 25px;
    box-shadow: 0px 2px 2px gray;
    font-size: ${FONT_SIZE_1.normal_1};
    border: none;
    background-color: ${COLOR_1.light_green};
    margin-top: 10px;
    &:hover {
      background-color: ${COLOR_1.green};
      cursor: pointer;
    }
    &:active {
      background-color: ${COLOR_1.green};
      transform: translateY(4px);
      box-shadow: none;
      cursor: pointer;
    }
  `,
};

const FilterSearchBox = () => {
  const [facilities, setFacilities] = useState<string[]>([]);
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [moodIds, setMoodIds] = useState<number[]>([]);
  const facilitiesKeys = [
    "&isopenalltime=true",
    "&ischargingavailable=true",
    "&hasparking=true",
    "&ispetfriendly=true",
    "&hasdessert=true",
  ];

  const [facilAddress, setFacilAddress] = useState<string[]>([]);
  // const [moodAddress, setMoodAddress] = useState<string[]>([]);
  const [facilitiesAtom, setFacilitiesAtom] =
    useRecoilState<string>(FacilitiesAtom);
  const [moodAtom, setMoodAtom] = useRecoilState<string>(MoodAtom);
  const setFacilitiesState = useSetRecoilState(FacilitiesStateAtom);
  const setMoodState = useSetRecoilState(MoodStateAtom);
  const resetMoodTags = useResetRecoilState(MoodAtom);
  const resetFacilities = useResetRecoilState(FacilitiesAtom);
  const resetMoodState = useResetRecoilState(MoodStateAtom);
  const resetFacilitiesState = useResetRecoilState(FacilitiesStateAtom);
  const location = useRecoilValue(LocationStateAtom);
  const setLocation = useSetRecoilState(LocationAtom);
  const searchValue = useRecoilValue(SearchValueStateAtom);
  const setSearchValue = useSetRecoilState(SearchValueAtom);
  const setHandleSearch = useSetRecoilState(HandleSearchAtom);
  const handleSearchClick = () => {
    //로직 추가하여야 함
    //태그인지, 주소인지 클릭하였을 때 값을 넣을 수 있어야 함.

    if (facilAddress.length > 0) {
      saveFacil();
    }
    if (facilAddress.length === 0) {
      resetFacilities();
    }
    if (moodIds.length > 0) {
      saveMood();
    }
    if (moodIds.length === 0) {
      resetMoodTags();
    }
    setSearchValue(searchValue);
    setLocation(location);
    setHandleSearch((cur) => !cur);
  };

  const saveFacil = () => {
    setFacilitiesAtom(facilAddress.join(""));
  };

  const saveMood = () => {
    const moodToIds = moodIds.join();
    setMoodAtom(`&tags=${moodToIds}`);
  };

  console.log("시설 아톰" + facilitiesAtom);
  console.log("무드 아톰" + moodAtom);
  // console.log(moodAtom);
  // if (facilities === '전체') {
  //   setShortAddress('');
  // }
  // if (location !== '전체') {
  //   setShortAddress(`shortaddress=${location}`);
  // }
  // console.log(shortAddress);

  const handleFaciliesTagClick = (tagText: string, address: string): void => {
    const findTag = facilities.find((el) => el === tagText);
    const filterTag = facilities.filter((el) => el !== tagText);
    // const findFacil = facilitiesKeys.find((el) => (el === address));
    const filterFacil = facilAddress.filter((el) => el !== address);
    if (findTag) {
      setFacilities(() => [...filterTag]);
      setFacilAddress(() => [...filterFacil]);
    }
    if (!findTag) {
      setFacilities(() => [...facilities, tagText]);
      setFacilAddress(() => [...facilAddress, address]);
    }
  };

  const handleMoodTagClick = (tagText: string, id: number): void => {
    const findTag = moodTags.find((el) => el === tagText);
    const filterTag = moodTags.filter((el) => el !== tagText);
    const filterMoodIds = moodIds.filter((el) => el !== id);

    if (findTag) {
      setMoodTags(() => [...filterTag]);
      setMoodIds(() => [...filterMoodIds]);
    }
    if (!findTag) {
      setMoodTags(() => [...moodTags, tagText]);
      setMoodIds(() => [...moodIds, id]);
    }
  };

  const saveState = () => {
    if (facilAddress.length > 0) {
      setFacilitiesState(facilAddress.join(""));
    }
    if (facilAddress.length === 0) {
      resetFacilitiesState();
    }
    if (moodIds.length > 0) {
      setMoodState(`&tags=${moodIds}`);
    }
    if (moodIds.length === 0) {
      resetMoodState();
    }
  };

  useEffect(() => {
    saveState();
  }, [facilAddress, moodIds]);

  console.log(facilities, moodTags);
  // console.log(moodIds);
  // console.log(moodIds.join());

  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>시설</S.Title>
      </S.TitleBox>
      <S.FacilityContainer>
        {FacilitiesTagNames.map((el, idx) => (
          <FacilitiesTag
            key={facilitiesKeys[idx]}
            address={facilitiesKeys[idx]}
            text={el}
            onClickEvent={handleFaciliesTagClick}
            selected={facilities.find((ele) => ele === el)}
          ></FacilitiesTag>
        ))}
      </S.FacilityContainer>
      <S.TitleBox>
        <S.Title>Mood</S.Title>
      </S.TitleBox>
      <S.MoodContainer>
        {MoodTagNames.map((el, idx) => (
          <MoodTag
            key={el}
            id={idx + 1}
            text={el}
            onClickEvent={handleMoodTagClick}
            selected={moodTags.find((ele) => ele === el)}
          ></MoodTag>
        ))}
      </S.MoodContainer>
      <S.ButtonBox>
        <S.SearchButton onClick={handleSearchClick}>Search</S.SearchButton>
      </S.ButtonBox>
    </S.Container>
  );
};
export default FilterSearchBox;
