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
    @media screen and (min-width: 767px) {
      width: 768px;
    }
  `,
  SubContainer: styled.div`
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 95vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 728px;
    }
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

const LocationBox = () => {
  return (
    <S.Container>
      <S.SubContainer>
        <S.LocationButton>전체</S.LocationButton>
        <S.LocationButton>강서구</S.LocationButton>
        <S.LocationButton>양천구</S.LocationButton>
        <S.LocationButton>영등포구</S.LocationButton>
        <S.LocationButton>마포구</S.LocationButton>
      </S.SubContainer>
    </S.Container>
  );
};
export default LocationBox;
