import styled from 'styled-components';
import logocafein from '../../assets/logocafein.svg';
import { Link } from 'react-router-dom';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import { FONT_WEIGHT } from '../../common/common';

const S = {
  Container: styled.div`
    display: flex;
    height: 90px;
    width: 100vw;
    background-color: ${COLOR_1.green};
    border-radius: 0px 0px 5px 5px;
    box-shadow: 0px 3px 3px 0px;
    @media screen and (max-width: 500px) {
      height: 60px;
    }
  `,
  LogoBox: styled.div`
    width: 20vw;
  `,
  LogoImg: styled.img`
    height: 100px;
    width: 100px;
    cursor: pointer;
    @media screen and (max-width: 500px) {
      height: 70px;
      width: 70px;
    }
  `,
  MiddleBox: styled.div`
    display: flex;

    width: 50vw;
  `,
  ListBtn: styled.button`
    height: 100px;
    width: 150px;
    font-size: ${FONT_SIZE_1.big_3};
    font-weight: ${FONT_WEIGHT.weight_800};
    background-color: transparent;
    font-family: 'Climate Crisis', cursive;
    border: none;
    cursor: pointer;
    &:hover {
      color: ${COLOR_1.brown};
    }
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.normal_2};
      height: 60px;
      width: 80px;
    }
  `,
  UserBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30vw;
  `,
  UserBtn: styled.div`
    position: relative;
    display: inline-block;
    font-size: ${FONT_SIZE_1.normal_3};
    height: 30px;
    width: 10vw;
    color: white;
    margin: 20px 10px 25px;
    border-radius: 6px;
    text-align: center;
    transition: top 0.01s linear;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background-color: #82c8a0;
    box-shadow: 0 0 0 1px #82c8a0 inset,
      0 0 0 2px rgba(255, 255, 255, 0.15) inset,
      0 8px 0 0 rgba(126, 194, 155, 0.7), 0 8px 0 1px rgba(0, 0, 0, 0.4),
      0 8px 8px 1px rgba(0, 0, 0, 0.5);
    margin-left: 10px;
    &:hover {
      background-color: #80c49d;
    }
    &:active {
      top: 9px;
      box-shadow: 0 0 0 1px #82c8a0 inset,
        0 0 0 2px rgba(255, 255, 255, 0.15) inset, 0 0 0 1px rgba(0, 0, 0, 0.4);
    }
    @media screen and (max-width: 700px) {
      font-size: ${FONT_SIZE_1.small_2};
      height: 20px;
    }
  `,
  ProfileImg: styled.img``,
};
const Header: React.FC = () => {
  return (
    <S.Container>
      <S.LogoBox>
        <S.LogoImg src={logocafein} />
      </S.LogoBox>
      <S.MiddleBox>
        <S.ListBtn>Post</S.ListBtn>
        <S.ListBtn>Cafe</S.ListBtn>
      </S.MiddleBox>
      <S.UserBox>
        <Link to='/Login'>
          <S.UserBtn>로그인</S.UserBtn>
        </Link>
        <Link to='/SignupSelect'>
          <S.UserBtn>회원가입</S.UserBtn>
        </Link>
      </S.UserBox>
    </S.Container>
  );
};

export default Header;
