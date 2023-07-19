import { COLOR_1 } from '../../common/common';
import styled from 'styled-components';
import { FONT_SIZE_1 } from '../../common/common';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 300px;
    width: 95vw;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 500px;
    }
  `,
  FacilityContainer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 95vw;
    margin-top: 10px;
    border-radius: 20px;
    border: solid 1px ${COLOR_1.brown};
  `,
  MoodContainer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 150px;
    width: 95vw;
    margin-top: 10px;
    border-radius: 20px;
    border: solid 1px ${COLOR_1.brown};
  `,
  TitleBox: styled.div`
    height: 20px;
    width: 90vw;
  `,
  Title: styled.div`
    height: 20px;
    width: 80vw;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: center;
    width: 90vw;
  `,
  SearchButton: styled.button`
    height: 30px;
    width: 55px;
    border-radius: 25px;
    box-shadow: 0px 1px 1px 1px gray;
    font-size: ${FONT_SIZE_1.small_2};
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
  return (
    <S.Container>
      <S.TitleBox>
        <S.Title>시설</S.Title>
      </S.TitleBox>
      <S.FacilityContainer></S.FacilityContainer>
      <S.TitleBox>
        <S.Title>Mood</S.Title>
      </S.TitleBox>
      <S.MoodContainer></S.MoodContainer>
      <S.ButtonBox>
        <S.SearchButton>Search</S.SearchButton>
      </S.ButtonBox>
    </S.Container>
  );
};
export default FilterSearchBox;
