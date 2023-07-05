import styled from 'styled-components';
import logocafein from '../../assets/logocafein.svg';
import logonaver from '../../assets/logonaver.png';
import logoinstargram from '../../assets/logoinstargram.svg';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    height: 250px;
    width: 100vw;
    background-color: ${COLOR_1.sand};
    padding: 0;
    margin: 0;
    @media screen and (max-width: 500px) {
      height: 200px;
    }
  `,
  MainBox: styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 200px;
    width: 65vw;
    margin-left: 15vw;
  `,
  LogoBox: styled.img`
    height: 150px;
    width: 150px;
    @media screen and (max-width: 500px) {
      height: 75px;
      width: 75px;
    }
  `,
  LogoNaverBox: styled.img`
    height: 50px;
    width: 50px;
    margin-top: 8px;
    cursor: pointer;
    @media screen and (max-width: 500px) {
      height: 30px;
      width: 30px;
      margin-top: 5px;
    }
  `,
  LogoInstarBox: styled.img`
    height: 67px;
    width: 67px;
    cursor: pointer;
    @media screen and (max-width: 500px) {
      height: 42px;
      width: 42px;
    }
  `,
  ProjectTitle: styled.div`
    height: 30px;
    width: 70vw;
    font-size: ${FONT_SIZE_1.big_1};
    color: gray;
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.normal_2};
    }
  `,
  ProjectInformation: styled.div`
    height: 15px;
    width: 70vw;
    font-size: ${FONT_SIZE_1.normal_1};
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.small_2};
    }
  `,
  LinkBox: styled.div`
    display: flex;
    height: 200px;
    width: 30vw;
  `,
};

const Footer: React.FC = () => {
  return (
    <S.Container>
      <S.MainBox>
        <S.LogoBox src={logocafein} />
        <S.ProjectTitle>카페인 서치 웹사이트</S.ProjectTitle>
        <S.ProjectInformation>
          서울특별시 서초구 서초동 서초대로 396
        </S.ProjectInformation>
        <S.ProjectInformation>프로젝트 팀:CafeIn</S.ProjectInformation>
        <S.ProjectInformation>
          github:codestats_seb/seb44_main_034 | 사업 및 제휴문의:
          cafeinplus@zmail.com
        </S.ProjectInformation>
      </S.MainBox>
      <S.LinkBox>
        <S.LogoNaverBox src={logonaver}></S.LogoNaverBox>
        <S.LogoInstarBox src={logoinstargram}></S.LogoInstarBox>
      </S.LinkBox>
    </S.Container>
  );
};

export default Footer;
