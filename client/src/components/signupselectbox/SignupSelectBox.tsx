import { Link } from 'react-router-dom';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';
import clienticon from '../../assets/clienticon.svg';
import ownericon from '../../assets/ownericon.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 90vw;
    margin-top: 40px;
    @media screen and (min-width: 786px) {
      width: 600px;
    }
  `,

  MainTitleBox: styled.div`
    width: 90vw;
    height: 50px;
    font-size: ${FONT_SIZE_1.big_6};
    @media screen and (min-width: 786px) {
      width: 600px;
    }
  `,

  SubBox: styled.div`
    display: flex;
    width: 90vw;
    height: 300px;
    @media screen and (min-width: 786px) {
      width: 600px;
    }
  `,
  MainTitle: styled.div`
    display: flex;
    justify-content: center;
    font-size: ${FONT_SIZE_1.big_1};
    width: 90vw;
    height: 30px;
    @media screen and (min-width: 786px) {
      width: 600px;
    }
  `,
  SubTitle: styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${FONT_SIZE_1.normal_1};
  `,

  UserSubContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 45vw;
    border-radius: 20px 0px 0px 20px;
    background-color: ${COLOR_1.ivory};
    font-size: 16px;
    @media screen and (min-width: 786px) {
      width: 300px;
    }
  `,
  OwnerSubContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 45vw;
    border-radius: 0px 20px 20px 0px;
    background-color: ${COLOR_1.light_green};
    font-size: 16px;
    @media screen and (min-width: 786px) {
      width: 300px;
    }
  `,
  SubExplain: styled.div`
    height: 50px;
    width: 25vw;
    font-size: ${FONT_SIZE_1.small_2};
    margin-top: 20px;
    @media screen and (min-width: 786px) {
      width: 150px;
    }
  `,
  ImgBox: styled.img`
    height: 90px;
    width: 25vw;
    @media screen and (min-width: 786px) {
    }
  `,
  DarkSandBtn: styled.button`
    width: 25vw;
    height: 25px;
    font-size: ${FONT_SIZE_1.small_2};
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.dark_sand};
    color: white;
    font-size: ${FONT_SIZE_1.small_1};
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 786px) {
      width: 150px;
      font-size: ${FONT_SIZE_1.small_3};
    }
  `,
};

const SignupSelectBox: React.FC = () => {
  return (
    <S.Container>
      <S.MainTitleBox>
        <S.MainTitle>회원가입</S.MainTitle>
      </S.MainTitleBox>
      <S.SubBox>
        <S.UserSubContainer>
          <S.SubTitle>개인회원</S.SubTitle>
          <S.ImgBox src={clienticon}></S.ImgBox>
          <S.SubExplain>
            가입하고,카페에 대한 포스트를 발행해보세요!
          </S.SubExplain>
          <Link to='/usersignup'>
            <S.DarkSandBtn>개인 회원가입</S.DarkSandBtn>
          </Link>
        </S.UserSubContainer>
        <S.OwnerSubContainer>
          <S.SubTitle>사업자</S.SubTitle>
          <S.ImgBox src={ownericon}></S.ImgBox>
          <S.SubExplain>
            사업자 회원 가입하고, 카페를 등록해보세요!
          </S.SubExplain>
          <Link to='/ownersignup'>
            <S.DarkSandBtn>사업자회원가입</S.DarkSandBtn>
          </Link>
        </S.OwnerSubContainer>
      </S.SubBox>
    </S.Container>
  );
};

export default SignupSelectBox;
