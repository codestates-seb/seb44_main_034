import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { LocationAtom } from '../../recoil/mainState';
import styled from 'styled-components';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';

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
    height: 30px;
    padding: 0 10px;
    border-radius: 25px;
    box-shadow: 0px 1px 1px 1px gray;
    font-size: ${FONT_SIZE_1.small_3};
    border: none;
    background-color: ${COLOR_1.ivory};
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
  `,
};

const LocationBox = () => {
  const locationName = ['전체', '강서구', '양천구', '영등포구', '마포구'];
  const [shortAddress, setShortAddress] = useRecoilState<string>(LocationAtom);
  const [location, setLocation] = useState<string>('');
  const handleClickEvent = (el: string) => {
    setLocation(el);
    console.log(el);
  };
  console.log(location);
  if (location === '전체') {
    setShortAddress('');
  }
  if (location !== '전체') {
    setShortAddress(`shortaddress=${location}`);
  }
  console.log(shortAddress);

  return (
    <S.Container>
      <S.SubContainer>
        {locationName.map((el) => (
          <S.LocationButton
            key={el}
            onClick={() => {
              handleClickEvent(el);
            }}
          >
            {el}
          </S.LocationButton>
        ))}
      </S.SubContainer>
    </S.Container>
  );
};
export default LocationBox;
