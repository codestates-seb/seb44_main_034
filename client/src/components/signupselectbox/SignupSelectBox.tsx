import styled from 'styled-components';
import clienticon from '../../assets/clienticon.svg';
import ownericon from '../../assets/ownericon.svg';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';

const S = {
  Container: styled.div`
    height: 600px;
    width: 500px;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    @media screen and (max-width: 800px) {
      height: 80vh;
      width: 70vw;
    }
    @media screen and (max-width: 500px) {
      height: 300px;
      width: 250px;
      display: flex;
      flex-direction: column;
    }
  `,

  MainTitleBox: styled.div`
    width: 500px;
    height: 100px;
    font-size: ${FONT_SIZE_1.big_6};
    @media screen and (max-width: 500px) {
      height: 50px;
      width: 250px;
    }
  `,

  SubBox: styled.div`
    display: flex;
    width: 500px;
    height: 500px;
    @media screen and (max-width: 500px) {
      height: 250px;
      width: 250px;
      display: flex;
    }
  `,
  MainTitle: styled.div`
    display: flex;
    justify-content: center;
    font-size: ${FONT_SIZE_1.big_6};
    height: 30px;
    width: 500px;
    @media screen and (max-width: 800px) {
      width: 70vw;
    }
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.big_1};
      width: 250px;
      height: 15px;
    }
  `,
  SubTitle: styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${FONT_SIZE_1.big_2};
    @media screen and (max-width: 500px) {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${FONT_SIZE_1.normal_1};
    }
  `,

  UserSubContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    width: 250px;
    border-radius: 20px 0px 0px 20px;
    background-color: ${COLOR_1.ivory};
    font-size: 16px;
    @media screen and (max-width: 800px) {
      height: 60vh;
      width: 35vw;
    }
    @media screen and (max-width: 500px) {
      height: 250px;
      width: 150px;
      font-size: 10px;
    }
  `,
  OwnerSubContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    width: 250px;
    border-radius: 0px 20px 20px 0px;
    background-color: ${COLOR_1.light_green};
    @media screen and (max-width: 800px) {
      height: 60vh;
      width: 35vw;
    }
    @media screen and (max-width: 500px) {
      height: 250px;
      width: 150px;
      font-size: 10px;
    }
  `,
  SubExplain: styled.div`
    height: 100px;
    width: 137px;
    font-size: ${FONT_SIZE_1.normal_1};
    @media screen and (max-width: 800px) {
      height: 60px;
    }
    @media screen and (max-width: 500px) {
      height: 50px;
      width: 75px;
      font-size: ${FONT_SIZE_1.small_2};
    }
  `,
  ImgBox: styled.img`
    width: 150px;
    height: 200px;
    @media screen and (max-width: 500px) {
      height: 100px;
      width: 75px;
    }
  `,
  DarkSandBtn: styled.button`
    width: 200px;
    height: 50px;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.dark_sand};
    color: white;
    font-size: ${FONT_SIZE_1.big_1};
    cursor: pointer;

    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 800px) {
      width: 25vw;
      font-size: ${FONT_SIZE_1.normal_2};
    }
    @media screen and (max-width: 500px) {
      width: 100px;
      height: 25px;
      font-size: ${FONT_SIZE_1.small_2};
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
          <S.DarkSandBtn>개인 회원가입</S.DarkSandBtn>
        </S.UserSubContainer>
        <S.OwnerSubContainer>
          <S.SubTitle>사업자</S.SubTitle>
          <S.ImgBox src={ownericon}></S.ImgBox>
          <S.SubExplain>
            사업자 회원 가입하고, 카페를 등록해보세요!
          </S.SubExplain>
          <S.DarkSandBtn>사업자회원가입</S.DarkSandBtn>
        </S.OwnerSubContainer>
      </S.SubBox>
    </S.Container>
  );
};

export default SignupSelectBox;
