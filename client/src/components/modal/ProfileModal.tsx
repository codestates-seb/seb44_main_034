import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { COLOR_1, FONT_SIZE_1, FONT_WEIGHT } from "../../common/common";
import profileimg from "../../assets/profileimg.svg";
import styled from "styled-components";
import { LoginState } from "../../recoil/recoil";

const S = {
  Container: styled.div`
    z-index: 1;
    position: absolute;
    height: 200px;
    width: 200px;
    margin-bottom: 287px;
    border-radius: 8px;
    border-style: solid;
    right: 0;
    border-color: ${COLOR_1.dark_brown};
    background-color: ${COLOR_1.white};
    @media screen and (min-width: 786px) {
      margin-right: 0;
      right: auto;
    }
  `,
  TopBox: styled.div`
    text-align: center;
    height: 150px;
    width: 200px;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: center;
    height: 30px;
    width: 200px;
  `,
  ProfileImg: styled.img`
    height: 50px;
    width: 50px;
  `,
  DisplayName: styled.div``,
  Position: styled.div``,
  ModalLeftBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 29px;
    width: 100px;
    color: ${COLOR_1.dark_brown};
    background-color: ${COLOR_1.green};
    font-weight: ${FONT_WEIGHT.weight_800};
    font-size: ${FONT_SIZE_1.normal_2};
    border-radius: 0px 0px 0px 6px;
    border-top: solid 1px ${COLOR_1.dark_brown};
    border-right: solid 1px ${COLOR_1.dark_brown};
    &:hover {
      background-color: #bfcdbf;
    }
    &:active {
      background-color: #b3cbb3;
    }
  `,
  ModalRightBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 29px;
    width: 99px;
    color: ${COLOR_1.dark_brown};
    background-color: ${COLOR_1.green};
    font-weight: ${FONT_WEIGHT.weight_800};
    font-size: ${FONT_SIZE_1.normal_2};
    border-radius: 0px 0px 6px 0px;
    border-top: solid 1px ${COLOR_1.dark_brown};
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
  const [loginDistinction, setLoginDistinction] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    if (localStorage.getItem("role_token") === "owner") {
      setLoginDistinction(false);
      setRole("사업자");
    } else if (localStorage.getItem("role_token") === "member") {
      setLoginDistinction(true);
      setRole("일반유저");
    }
  });
  const login = useRecoilValue(LoginState);
  const LogoutHandler = () => {
    localStorage.removeItem("recoil-persist");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role_token");
    window.location.replace("/");
  };
  return (
    <S.Container>
      <S.IconBox></S.IconBox>
      <S.TopBox>
        <S.ProfileImg src={profileimg}></S.ProfileImg>
        {!login ? (
          <S.DisplayName>안녕하세요 카페인입니다!</S.DisplayName>
        ) : (
          <S.DisplayName>{role}님 안녕하세요!</S.DisplayName>
        )}
      </S.TopBox>
      {!login ? (
        <S.ButtonBox>
          <Link to='/login'>
            <S.ModalLeftBox>로그인</S.ModalLeftBox>
          </Link>
          <Link to='/signupagreement'>
            <S.ModalRightBox>회원가입</S.ModalRightBox>
          </Link>
        </S.ButtonBox>
      ) : loginDistinction ? (
        <S.ButtonBox>
          <Link to='/usermy'>
            <S.ModalLeftBox>마이페이지</S.ModalLeftBox>
          </Link>
          <S.ModalRightBox onClick={LogoutHandler}>로그아웃</S.ModalRightBox>
        </S.ButtonBox>
      ) : (
        <S.ButtonBox>
          <Link to='/ownermy'>
            <S.ModalLeftBox>마이페이지</S.ModalLeftBox>
          </Link>
          <S.ModalRightBox onClick={LogoutHandler}>로그아웃</S.ModalRightBox>
        </S.ButtonBox>
      )}
    </S.Container>
  );
};

export default ProfileModal;
