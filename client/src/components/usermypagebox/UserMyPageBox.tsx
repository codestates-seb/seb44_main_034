import { useState, useEffect } from 'react';
import axios from 'axios';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import { data as dataAll } from '../../mockData/cafePost.json';
import FollowerModal from '../followermodal/FollowerModal';
import FollowingModal from '../followingmodal/FollowingModal';
import profileimg from '../../assets/profileimg.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const S = {
  Container: styled.div`
    min-height: 100vh;
    width: 90vw;
    @media screen and (min-width: 768px) {
      width: 700px;
    }
  `,
  MiddleBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      flex-direction: row;
      width: 700px;
    }
  `,
  BottomBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      width: 700px;
    }
  `,
  EditButtonBox: styled.div`
    display: flex;
    justify-content: right;
    height: 60px;
    width: 90vw;
    border-bottom: solid 1px ${COLOR_1.light_gray};
    @media screen and (min-width: 786px) {
      width: 700px;
    }
  `,
  EditButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 160px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    color: ${COLOR_1.dark_sand};
    background-color: ${COLOR_1.ivory};
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
      color: white;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
      color: white;
    }
  `,
  ProfileImg: styled.img`
    width: 150px;
    @media screen and (min-width: 786px) {
      width: 200px;
    }
  `,
  ProfileImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      width: 350px;
    }
  `,
  ProfileListBox: styled.div`
    display: flex;
    height: 200px;
    width: 90vw;
    border-radius: 10px;
    background-color: ${COLOR_1.white};
    border: solid 2px ${COLOR_1.green};
    @media screen and (min-width: 786px) {
      width: 350px;
    }
  `,
  TitleInformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20vw;
    @media screen and (min-width: 786px) {
      width: 80px;
    }
  `,
  TitleInformaiton: styled.div`
    width: 20vw;
    margin-top: 5px;
    text-align: center;
    @media screen and (min-width: 786px) {
      width: 60px;
    }
  `,
  FollowerInformaiton: styled.div`
    width: 10vw;
    margin-top: 5px;
    cursor: pointer;
    color: ${COLOR_1.black};
    &:hover {
      color: ${COLOR_1.light_red};
    }
  `,
  FollowingInformaiton: styled.div`
    width: 10vw;
    margin-top: 5px;
    cursor: pointer;
    color: ${COLOR_1.black};
    &:hover {
      color: ${COLOR_1.light_red};
    }
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
    @media screen and (min-width: 786px) {
      width: 270px;
    }
  `,
  Informaiton: styled.div`
    text-align: center;
    width: 70vw;
    margin-top: 5px;
    @media screen and (min-width: 786px) {
      width: 270px;
    }
  `,
  SandBtn: styled.button`
    height: 5vh;
    width: 27vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.ivory};
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.small_2};
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 786px) {
      font-size: ${FONT_SIZE_1.normal_2};
      width: 200px;
    }
  `,
};

const UserMyPageBox = () => {
  const [isFollowerOpen, setFollowerIsOpen] = useState<boolean>(false);
  const [isFollowingOpen, setFollowingIsOpen] = useState<boolean>(false);

  const openFollowerModal = () => {
    if (!isFollowerOpen) {
      setFollowerIsOpen(true);
      setFollowingIsOpen(false);
    } else {
      setFollowerIsOpen(false);
    }
  };
  const openFollowingModal = () => {
    if (!isFollowingOpen) {
      setFollowingIsOpen(true);
      setFollowerIsOpen(false);
    } else {
      setFollowingIsOpen(false);
    }
  };

  // const replace = useNavigate();
  useEffect(() => {
    axios
      .get('https://8a3d-58-237-124-214.ngrok-free.app/api/owners/my-page', {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: localStorage.getItem('access_token'),
        },
      })
      .then((response) => {
        // Handle success.
        console.log('success');
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error.

        console.log('An error occurred:', error.response);
        // replace('/');
      });
  });
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
  const data = dataAll.post;
  return (
    <S.Container>
      <S.MiddleBox>
        <S.ProfileImgBox>
          <S.ProfileImg src={profileimg}></S.ProfileImg>
        </S.ProfileImgBox>
        <S.ProfileListBox>
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
            <S.Informaiton onClick={openFollowerModal}>100</S.Informaiton>
            {isFollowerOpen ? <FollowerModal /> : null}
            <S.Informaiton onClick={openFollowingModal}>100</S.Informaiton>
            {isFollowingOpen ? <FollowingModal /> : null}
          </S.InformaitonBox>
        </S.ProfileListBox>
      </S.MiddleBox>
      <S.EditButtonBox>
        <Link to='/usermy/edit/:id'>
          <S.EditButton>내 정보 수정하기</S.EditButton>
        </Link>
      </S.EditButtonBox>
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
    </S.Container>
  );
};

export default UserMyPageBox;
