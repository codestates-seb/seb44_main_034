import { useState } from 'react';
import { FacilitiesTagNames, MoodTagNames } from '../../common/tagNames';
import FacilitiesTag from '../../common/tags/FacilitiesTag';
import MoodTag from '../../common/tags/MoodTag';
import { COLOR_1 } from '../../common/common';
import styled from 'styled-components';
import { FONT_SIZE_1 } from '../../common/common';


const S = {
  Container: styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    height: 46px;
    width: 95%;
    margin-top: 6px;
    padding: 0 10px;
    flex-wrap: nowrap;
    border-radius: 20px;
    border: solid 1px ${COLOR_1.brown};
    overflow-x: auto;
    >div {
      margin-right: 10px;
      margin-top: 4px;
    }
    @media screen and (min-width: 768px) {
      justify-content: space-around;
      width: 760px;
      height: 50px;
      padding: 0 100px;
      >div {
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
    >div {
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
    text-align:left;
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


  const handleFaciliesTagClick = (tagText:string):void => {
    const findTag = facilities.find((el) => (el === tagText));
    const filterTag = facilities.filter((el) => (el !== tagText));

    if (findTag) {
      setFacilities(() => ([...filterTag]));
    }
    if (!findTag) {
      setFacilities(() => ([...facilities, tagText]));
    }
  }

  const handleMoodTagClick = (tagText:string):void => {
    const findTag = moodTags.find((el) => (el === tagText));
    const filterTag = moodTags.filter((el) => (el !== tagText));

    if (findTag) {
      setMoodTags(() => ([...filterTag]));
    }
    if (!findTag) {
      setMoodTags(() => ([...moodTags, tagText]));
    }
  }
console.log(facilities, moodTags)
  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>시설</S.Title>
      </S.TitleBox>
      <S.FacilityContainer>
      {FacilitiesTagNames.map((el)=> (<FacilitiesTag key={el} text={el} onClickEvent={handleFaciliesTagClick} selected={
          facilities.find((ele)=>(ele === el))
        }></FacilitiesTag>))}
      </S.FacilityContainer>
      <S.TitleBox>
        <S.Title>Mood</S.Title>
      </S.TitleBox>
      <S.MoodContainer>
      {MoodTagNames.map((el)=> (<MoodTag key={el} text={el} onClickEvent={handleMoodTagClick} selected={
          moodTags.find((ele)=>(ele === el))
        }></MoodTag>))}
      </S.MoodContainer>
      <S.ButtonBox>
        <S.SearchButton>Search</S.SearchButton>
      </S.ButtonBox>
    </S.Container>
  );
};
export default FilterSearchBox;
