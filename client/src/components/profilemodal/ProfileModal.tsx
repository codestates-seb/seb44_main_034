import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLOR_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 200px;
    margin-top: 200px;
    margin-right: 21px;
    border-radius: 8px;
    border-style: solid;
    border-color: ${COLOR_1.dark_brown};
    background-color: ${COLOR_1.light_green};
  `,
  TopBox: styled.div`
    height: 150px;
    width: 200px;
  `,
  ButtonBox: styled.div`
    height: 30px;
    width: 200px;
  `,
  ProfileImg: styled.img`
    height: 50px;
    width: 50px;
  `,
  DisplayName: styled.div``,
  Position: styled.div``,
  ModalBtnLeft: styled.button`
    height: 30px;
    width: 100px;
    background-color: ${COLOR_1.green};
    border-radius: 0px 0px 0px 6px;
    border: solid 1px gray;
    &:hover {
      background-color: #bfcdbf;
    }
    &:active {
      background-color: #b3cbb3;
    }
  `,
  ModalBtnRight: styled.button`
    height: 30px;
    width: 100px;
    background-color: ${COLOR_1.green};
    border-radius: 0px 0px 6px 0px;
    border: solid 1px gray;
    &:hover {
      background-color: #bfcdbf;
    }
    &:active {
      background-color: #b3cbb3;
    }
  `,
  IconBox: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 8px;
    height: 20px;
  `,
};

const ProfileModal = () => {
  const [loginDistinction, setLoginDistinction] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem('access_token') === 'owner') {
      setLoginDistinction(true);
    } else {
      setLoginDistinction(false);
    }
  });

  const resetHandler = () => {
    localStorage.removeItem('recoil-persist');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.replace('/');
  };
  return (
    <S.Container>
      <S.IconBox></S.IconBox>
      <S.TopBox>
        <S.ProfileImg src={profileimg}></S.ProfileImg>
        <S.DisplayName>카페사랑</S.DisplayName>
        {!loginDistinction ? (
          <S.DisplayName>손님</S.DisplayName>
        ) : (
          <S.DisplayName>사장님</S.DisplayName>
        )}
      </S.TopBox>
      <S.ButtonBox>
        {!loginDistinction ? (
          <Link to='/usermypage'>
            <S.ModalBtnLeft>마이페이지</S.ModalBtnLeft>
          </Link>
        ) : (
          <Link to='/owersmypage'>
            <S.ModalBtnLeft>마이페이지</S.ModalBtnLeft>
          </Link>
        )}
        <S.ModalBtnRight onClick={resetHandler}>로그아웃</S.ModalBtnRight>
      </S.ButtonBox>
    </S.Container>
  );
};

export default ProfileModal;
