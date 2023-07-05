import styled from 'styled-components';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_2 } from '../../common/common';
import { FacilityType } from '../../recoil/recoil';

const facility: FacilityType[] = [
  { id: 'isOpenAllTime', name: '24시간 운영여부', value: false },
  { id: 'isChargingAvailable', name: '콘센트 유무', value: false },
  { id: 'hasParking', name: '주차공간', value: false },
  { id: 'isPetFriendly', name: '동물 출입 가능 여부', value: false },
  { id: 'hasDessert', name: '디저트 판매 여부', value: false },
];

const CafeInfo = () => {
  return (
    <S.MainDiv>
      <S.AddImageDiv></S.AddImageDiv>
      <S.AddCafeInfoDiv>
        <S.CafeName type='text' placeholder='카페명을 입력해주세요' />
        <S.CafeInputLabel>
          OPEN :
          <CafeBusinessHours type='text' placeholder='9:00' />
        </S.CafeInputLabel>
        <S.CafeInputLabel>
          CLOSE :
          <CafeBusinessHours type='text' placeholder='22:00' />
        </S.CafeInputLabel>
        <S.CafeInputLabel>
          주소 :
          <CafeAddress type='text' />
        </S.CafeInputLabel>
        <S.CafeInputLabel>
          연락처 :
          <CafeContact type='text' />
        </S.CafeInputLabel>
        <S.CafeNoticeDiv>
          공지사항
          <CafeNotice type='text' />
        </S.CafeNoticeDiv>
        <S.CafeFacilityDiv>
          {facility.map((item) => (
            <S.CafeFacilitySpan>
              <S.CafeFacility type='checkbox' value={item.id} />
              {item.name}
            </S.CafeFacilitySpan>
          ))}
        </S.CafeFacilityDiv>
      </S.AddCafeInfoDiv>
    </S.MainDiv>
  );
};
const S = {
  MainDiv: styled.div`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center;

    flex-direction: row;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      justify-content: flex-start;
    }
  `,
  AddImageDiv: styled.div`
    width: 35vw;
    height: 55vh;
    border: 2px solid ${COLOR_1.black};
    margin-right: 2%;
    @media screen and (max-width: 500px) {
      width: 80vw;
      height: 23vh;
      margin-top: 10%;
      margin-bottom: 5%;
    }
  `,
  AddCafeInfoDiv: styled.div`
    width: 45vw;
    height: 55vh;
    padding: 1%;

    @media screen and (max-width: 500px) {
      width: 80vw;
      height: 50vh;
    }
  `,
  InputBase: styled.input`
    outline: none;
    border: none;
    font-size: ${FONT_SIZE_2.normal_3};
    &:hover {
      outline: auto;
    }
  `,
  CafeName: styled.input`
    width: 100%;
    height: 18%;
    outline: none;
    border: none;
    margin-bottom: 2%;
    &:hover {
      outline: auto;
    }
    font-size: ${FONT_SIZE_2.big_2};
    @media screen and (max-width: 500px) {
      height: 10%;
    }
  `,
  CafeInputLabel: styled.div`
    width: 100%;
    height: 8%;
    margin: 1%;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_3};
    text-align: start;
  `,
  CafeNoticeDiv: styled.div`
    width: 95%;
    height: 20%;
    min-height: 20%;
    border: 5px solid ${COLOR_1.dark_sand};
    border-radius: 20px;
    @media screen and (max-width: 500px) {
      height: 10%;
    }
  `,
  CafeFacilityDiv: styled.div`
    min-width: 350px;
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
  `,
  CafeFacilitySpan: styled.span`
    padding: 2%;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_2};
    @media screen and (max-width: 500px) {
      display: block;
      text-align: start;
    }
  `,
  CafeFacility: styled.input`
    transform: scale(1.5);
    font-size: ${FONT_SIZE_2.normal_4};
    margin-top: 1%;
    &:hover {
      cursor: pointer;
    }
  `,
};
const CafeBusinessHours = styled(S.InputBase)`
  width: 20%;
  height: 90%;
  @media screen and (max-width: 500px) {
    width: 30%;
    height: 50%;
  }
`;
const CafeAddress = styled(S.InputBase)`
  width: 80%;
  height: 90%;
  @media screen and (max-width: 500px) {
    width: 80%;
    height: 50%;
  }
`;
const CafeContact = styled(S.InputBase)`
  width: 50%;
  height: 90%;
`;
const CafeNotice = styled(S.InputBase)`
  width: 90%;
  height: 50%;
  margin: 1%;
  display: block;
  margin: auto;
  @media screen and (max-width: 500px) {
    height: 50%;
  }
`;
export default CafeInfo;