import { useState } from 'react';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import coffeeshop from '../../assets/coffeeshop.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    height: 90vh;
    width: 65vw;
    @media screen and (max-width: 500px) {
      width: 70vw;
    }
  `,
  TopBox: styled.div`
    display: flex;
    justify-content: center;
    width: 65vw;
    margin-top: 30px;
  `,
  MiddleBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    height: 25vh;
    @media screen and (max-width: 500px) {
      height: 15vh;
    }
  `,
  BottomBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5vh;
  `,
  EditBtn: styled.div`
    width: 12vw;
    border-radius: 5px;
    margin-left: 10vw;
    color: ${COLOR_1.dark_sand};
    background-color: ${COLOR_1.ivory};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 800px) {
      font-size: ${FONT_SIZE_1.small_2};
    }
  `,
  TitleBox: styled.div`
    width: 33vw;
    font-size: ${FONT_SIZE_1.big_2};
    @media screen and (max-width: 800px) {
      font-size: ${FONT_SIZE_1.normal_2};
    }
  `,
  ProfileImg: styled.img`
    width: 14vw;
    @media screen and (max-width: 500px) {
      width: 20vw;
    }
  `,
  AllProfileBoxLeft: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25vh;
    width: 30vw;
    @media screen and (max-width: 800px) {
      height: 15vh;
    }
  `,
  AllProfileBoxRight: styled.div`
    display: flex;
    flex-direction: column;
    height: 25vh;
    width: 30vw;
    border-radius: 10px;
    background-color: ${COLOR_1.light_green};
    @media screen and (max-width: 800px) {
      font-size: ${FONT_SIZE_1.small_1};
      height: 15vh;
    }
  `,
  TitleInformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 15vw;
  `,
  TitleInformaiton: styled.div`
    display: flex;
    justify-content: center;
    width: 15vw;
    margin-top: 5px;
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15vw;
    font-weight: 200;
  `,
  SubInformaitonBox: styled.div`
    display: flex;
    justify-content: center;
    height: 130px;
  `,
  Informaiton: styled.div`
    width: 15vw;
    margin-top: 5px;
  `,
  CafeImgBox: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  CafeImg: styled.img`
    margin-top: 15px;
    width: 18vw;
  `,
  SandBtn: styled.button`
    border: none;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.big_1};
    cursor: pointer;
    height: 5vh;
    width: 18vw;
    border-radius: 15px;
    background-color: ${COLOR_1.ivory};
    margin-bottom: 1vh;
    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 800px) {
      font-size: ${FONT_SIZE_1.small_2};
      height: 3vh;
    }
  `,
  FollowBox: styled.div`
    display: flex;
    justify-content: center;
    width: 30vw;
  `,
};
const OtherUserMyPageBox = () => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const FollowingHandler = (): void => {
    if (!isFollowing) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };
  return (
    <S.Container>
      <S.TopBox>
        <S.TitleBox>닉네임(CafeI)</S.TitleBox>
      </S.TopBox>
      <S.MiddleBox>
        <S.AllProfileBoxLeft>
          <S.ProfileImg src={profileimg}></S.ProfileImg>
        </S.AllProfileBoxLeft>

        <S.AllProfileBoxRight>
          <S.SubInformaitonBox>
            <S.TitleInformaitonBox>
              <S.TitleInformaiton>닉네임</S.TitleInformaiton>
              <S.TitleInformaiton>회원등급</S.TitleInformaiton>
            </S.TitleInformaitonBox>
            <S.InformaitonBox>
              <S.Informaiton>카페인</S.Informaiton>
              <S.Informaiton>에소프레소</S.Informaiton>
            </S.InformaitonBox>
          </S.SubInformaitonBox>
          <S.FollowBox>
            <S.SandBtn
              onClick={FollowingHandler}
              style={{
                backgroundColor: isFollowing
                  ? `${COLOR_1.dark_sand}`
                  : `${COLOR_1.ivory}`,
              }}
            >
              팔로우하기
            </S.SandBtn>
          </S.FollowBox>
        </S.AllProfileBoxRight>
      </S.MiddleBox>
      <S.BottomBox>
        <S.SandBtn>작성한 포스트</S.SandBtn>
      </S.BottomBox>

      <S.CafeImgBox>
        <S.CafeImg src={coffeeshop}></S.CafeImg>
        <S.CafeImg src={coffeeshop}></S.CafeImg>
        <S.CafeImg src={coffeeshop}></S.CafeImg>
      </S.CafeImgBox>
    </S.Container>
  );
};

export default OtherUserMyPageBox;
