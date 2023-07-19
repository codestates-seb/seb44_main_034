import styled from 'styled-components';
import { FONT_SIZE_1 } from '../../common/common';
import { BiSolidCoffeeBean } from 'react-icons/bi';
// import Cafe from './cafe';
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 300px;
    width: 90vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 768px;
    }
  `,
  SubContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 300px;
    width: 90vw;
    margin-top: 10px;
    @media screen and (min-width: 767px) {
      width: 728px;
    }
  `,
  SubTitle: styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 100px;
    font-size: ${FONT_SIZE_1.big_3};
  `,
  SubButtonBox: styled.div`
    display: flex;
    height: 50px;
    width: 200px;
  `,
  FilterButton: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 60px;
    background-color: white;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    &:active {
      background-color: #d6d6d6;
    }
  `,
  Iconbox: styled.div`
    height: 35px;
    width: 35px;
    text-align: center;
    color: black;
  `,
  IconTextBox: styled.div`
    height: 20px;
    width: 40px;
    text-align: center;
    color: black;
    font-size: ${FONT_SIZE_1.small_2};
  `,
};

const CafeList = () => {
  return (
    <S.Container>
      <S.SubContainer>
        <S.SubTitle>Cafe</S.SubTitle>
        <S.SubButtonBox>
          <S.FilterButton>
            <S.Iconbox>
              <BiSolidCoffeeBean size='30' color='#4f2500' />
            </S.Iconbox>
            <S.IconTextBox>북마크순</S.IconTextBox>
          </S.FilterButton>
          <S.FilterButton>
            <S.Iconbox>
              <BiSolidCoffeeBean size='30' color='#4f2500' />
            </S.Iconbox>
            <S.IconTextBox>별점순</S.IconTextBox>
          </S.FilterButton>
          <S.FilterButton>
            <S.Iconbox>
              <BiSolidCoffeeBean size='30' color='#4f2500' />
            </S.Iconbox>
            <S.IconTextBox>포스트순</S.IconTextBox>
          </S.FilterButton>
          <S.FilterButton>
            <S.Iconbox>
              <BiSolidCoffeeBean size='30' color='#4f2500' />
            </S.Iconbox>
            <S.IconTextBox>신규순</S.IconTextBox>
          </S.FilterButton>
        </S.SubButtonBox>
      </S.SubContainer>
    </S.Container>
  );
};
export default CafeList;
