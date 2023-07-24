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
    border-radius: 20px;
    border-style: solid;
    right: 0;
    border-color: #525252;
    background-color: ${COLOR_1.white};
    box-shadow: 0px 3px 10px 3px #878787;
    @media screen and (min-width: 786px) {
      margin-right: 0;
      right: auto;
    }
  `,
  TopBox: styled.div`
    text-align: center;
    height: 130px;
    width: 200px;
  `,
  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 13px;
    height: 30px;
    width: 175px;
  `,
  ProfileImg: styled.img`
    height: 50px;
    width: 50px;
  `,
  DisplayName: styled.div`
    margin-top: 20px;
    font-size: ${FONT_SIZE_1.normal_2};
    font-weight: ${FONT_WEIGHT.weight_600};
  `,
  Position: styled.div``,
  ModalLeftBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 29px;
    width: 80px;
    color: ${COLOR_1.black};
    background-color: ${COLOR_1.white};
    font-weight: ${FONT_WEIGHT.weight_800};
    font-size: ${FONT_SIZE_1.normal_2};
    border-radius: 10px;
    border: solid 1px black;
    box-shadow: 0px 0cqw 7px 0px #8c8c8c;
    &:hover {
      background-color: #c6c6c6;
    }
    &:active {
      background-color: #bcc9bc;
    }
  `,
  ModalRightBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 29px;
    width: 80px;
    color: ${COLOR_1.black};
    background-color: ${COLOR_1.white};
    font-weight: ${FONT_WEIGHT.weight_800};
    font-size: ${FONT_SIZE_1.normal_2};
    border-radius: 10px;
    border: solid 1px black;
    box-shadow: 0px 0px 7px 0px #8c8c8c;
    &:hover {
      background-color: #c6c6c6;
    }
    &:active {
      background-color: #bcc9bc;
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
    window.location.replace("/main");
  };
  return (
    <S.Container>
      <S.IconBox></S.IconBox>
      <S.TopBox>
        <S.ProfileImg src={profileimg}></S.ProfileImg>
        {!login ? (
          <S.DisplayName>
            안녕하세요<br></br> 카페인입니다!
          </S.DisplayName>
        ) : (
          <S.DisplayName>
            {role}님 <br></br>안녕하세요!
          </S.DisplayName>
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
