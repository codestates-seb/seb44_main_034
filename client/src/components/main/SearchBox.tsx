import { COLOR_1 } from '../../common/common';
import { BsSearch } from 'react-icons/bs';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100vw;
    background-color: none;
    box-shadow: 0px 1px 1px 1px gray;
    @media screen and (min-width: 767px) {
      width: 768px;
    }
  `,

  InputBox: styled.input`
    height: 40px;
    width: 70vw;
    padding: 5px;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.white};
    box-shadow: 0px 2px 2px 1px gray;

    cursor: pointer;

    &:hover {
      background-color: #efefef;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 767px) {
      width: 600px;
    }
  `,
  IconBox: styled.div`
    width: 10vw;
    height: 25px;
    margin-left: 20px;
    cursor: pointer;
    @media screen and (min-width: 767px) {
      width: 50px;
    }
  `,
};

const SearchBox = () => {
  return (
    <S.Container>
      <S.InputBox />
      <S.IconBox>
        <BsSearch size='25' color='#23ec00' />
      </S.IconBox>
    </S.Container>
  );
};

export default SearchBox;
