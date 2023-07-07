import styled from 'styled-components';
import profileimg from '../../assets/profileimg.svg';
import coffeeshop from '../../assets/coffeeshop.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';

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
    margin-top: 30px;
  `,
  TopSubBox: styled.div`
    width: 33vw;
  `,
  MiddleBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    height: 25vh;
  `,
  BottomBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
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
      height: 20vh;
    }
  `,
  AllProfileBoxRight: styled.div`
    display: flex;
    height: 25vh;
    width: 30vw;
    border-radius: 10px;
    background-color: ${COLOR_1.light_green};
    @media screen and (max-width: 800px) {
      font-size: ${FONT_SIZE_1.small_1};
      height: 20vh;
    }
  `,
  TitleInformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  TitleInformaiton: styled.div`
    width: 10vw;
    margin-top: 5px;
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20vw;
  `,
  Informaiton: styled.div`
    width: 25vw;
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
    height: 5vh;
    width: 18vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.ivory};
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.big_1};
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
};
const UserMyPageBox = () => {
  const [bookmarkCafeFocus, setBookmarkCafeFocus] = useState<boolean>(true);
  const [bookmarkPostFocus, setBookmarkPostFocus] = useState<boolean>(false);
  const [myPostFocus, setMyPostFocus] = useState<boolean>(false);
  const handleBookmarkCafeFocus = () => {
    console.log('handler');
    setBookmarkCafeFocus(true);
    setBookmarkPostFocus(false);
    setMyPostFocus(false);
  };
  const handleBookmarkPostFocus = () => {
    setBookmarkCafeFocus(false);
    setBookmarkPostFocus(true);
    setMyPostFocus(false);
  };
  const handleMyPostFocus = () => {
    setBookmarkCafeFocus(false);
    setBookmarkPostFocus(false);
    setMyPostFocus(true);
  };
  return (
    <S.Container>
      <S.TopBox>
        <S.TopSubBox></S.TopSubBox>

        <S.TitleBox>마이페이지</S.TitleBox>
        <S.TopSubBox>
          <Link to='/usermypage/edit/:id'>
            <S.EditBtn>프로필 수정</S.EditBtn>
          </Link>
        </S.TopSubBox>
      </S.TopBox>
      <S.MiddleBox>
        <S.AllProfileBoxLeft>
          <S.ProfileImg src={profileimg}></S.ProfileImg>
        </S.AllProfileBoxLeft>
        <S.AllProfileBoxRight>
          <S.TitleInformaitonBox>
            <S.TitleInformaiton>이메일</S.TitleInformaiton>
            <S.TitleInformaiton>닉네임</S.TitleInformaiton>
            <S.TitleInformaiton>회원등급</S.TitleInformaiton>
            <S.TitleInformaiton>팔로워</S.TitleInformaiton>
            <S.TitleInformaiton>팔로잉</S.TitleInformaiton>
          </S.TitleInformaitonBox>
          <S.InformaitonBox>
            <S.Informaiton>cafein@cafein.com</S.Informaiton>
            <S.Informaiton>카페인</S.Informaiton>
            <S.Informaiton>에소프레소</S.Informaiton>
            <S.Informaiton>100</S.Informaiton>
            <S.Informaiton>100</S.Informaiton>
          </S.InformaitonBox>
        </S.AllProfileBoxRight>
      </S.MiddleBox>
      <S.BottomBox>
        <S.SandBtn
          onClick={handleBookmarkCafeFocus}
          style={{
            backgroundColor: bookmarkCafeFocus
              ? `${COLOR_1.dark_sand}`
              : `${COLOR_1.ivory}`,
          }}
        >
          북마크한 카페
        </S.SandBtn>
        <S.SandBtn
          onClick={handleBookmarkPostFocus}
          style={{
            backgroundColor: bookmarkPostFocus
              ? `${COLOR_1.dark_sand}`
              : `${COLOR_1.ivory}`,
          }}
        >
          북마크한 포스트
        </S.SandBtn>
        <S.SandBtn
          onClick={handleMyPostFocus}
          style={{
            backgroundColor: myPostFocus
              ? `${COLOR_1.dark_sand}`
              : `${COLOR_1.ivory}`,
          }}
        >
          작성한 포스트
        </S.SandBtn>
      </S.BottomBox>

      <S.CafeImgBox>
        <S.CafeImg src={coffeeshop}></S.CafeImg>
        <S.CafeImg src={coffeeshop}></S.CafeImg>
        <S.CafeImg src={coffeeshop}></S.CafeImg>
      </S.CafeImgBox>
    </S.Container>
  );
};

export default UserMyPageBox;
