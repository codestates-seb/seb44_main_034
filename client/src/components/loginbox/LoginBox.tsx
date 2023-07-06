import styled from 'styled-components';
import { useState } from 'react';
import GoogleLoginButton from '../../common/googleoauth/GoogleOauth';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';

const S = {
  Container: styled.div`
    height: 500px;
    width: 500px;
    margin-top: 40px;
    @media screen and (max-width: 500px) {
      height: 300px;
      width: 250px;
    }
  `,
  MainBox: styled.div`
    height: 50px;
    margin-bottom: 50px;
    @media screen and (max-width: 500px) {
      height: 25px;
      margin-bottom: 25px;
    }
  `,
  SubBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;
    width: 500px;
    border-radius: 20px;
    background-color: ${COLOR_1.ivory};
    @media screen and (max-width: 500px) {
      height: 300px;
      width: 250px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 230px;
    width: 250px;
    margin-top: 40px;
    @media screen and (max-width: 500px) {
      height: 140px;
      width: 150px;
    }
  `,
  MainTitle: styled.div`
    height: 50px;
    font-size: ${FONT_SIZE_1.big_3};
    @media screen and (max-width: 500px) {
      height: 25px;
      font-size: ${FONT_SIZE_1.normal_3};
    }
  `,
  SubTitle: styled.label`
    height: 20px;
    margin-bottom: 5px;
    font-size: ${FONT_SIZE_1.normal_3};
    @media screen and (max-width: 500px) {
      height: 10px;
      font-size: ${FONT_SIZE_1.small_2};
    }
  `,
  InputInformation: styled.p`
    height: 10px;
    font-size: ${FONT_SIZE_1.small_2};
    @media screen and (max-width: 500px) {
      font-size: 5px;
    }
  `,
  DarkSandBtn: styled.button`
    height: 50px;
    width: 250px;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.dark_sand};
    color: white;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 500px) {
      height: 30px;
      width: 150px;
      border-radius: 7px;
      border: none;
      background-color: dark_sand;
      color: white;
      font-size: 10px;
    }
  `,
  InputBox: styled.input`
    height: 50px;
    width: 250px;
    border-radius: 15px;
    border: solid 1px #a5a5a5;
    background-color: ${COLOR_1.green};
    cursor: pointer;

    &:hover {
      background-color: #c6cbb2;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 500px) {
      height: 25px;
      width: 150px;
    }
  `,
  OauthBtn: styled.div`
    height: 25px;
    width: 250px;
    margin-top: 20px;
    @media screen and (max-width: 500px) {
      height: 25px;
      width: 100px;
    }
  `,
  BtnBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    width: 250px;
    @media screen and (max-width: 500px) {
      height: 100px;
      width: 150px;
    }
  `,
};

const LoginBox = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentId = event.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage('4-12사이 대소문자 또는 숫자만 입력해 주세요!');
      setIsId(false);
    } else {
      setIdMessage('사용가능한 아이디 입니다.');
      setIsId(true);
    }
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = event.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPassword(true);
    }
  };
  return (
    <S.Container>
      <S.MainBox>
        <S.MainTitle>로그인</S.MainTitle>
      </S.MainBox>
      <S.SubBox>
        <S.SubMiniBox>
          <S.SubTitle htmlFor='id'>아이디</S.SubTitle>
          <S.InputBox id='id' value={id} onChange={onChangeId}></S.InputBox>
          <S.InputInformation>{idMessage}</S.InputInformation>
          <S.SubTitle htmlFor='password'>비밀번호</S.SubTitle>
          <S.InputBox
            id='password'
            type='password'
            value={password}
            onChange={onChangePassword}
          ></S.InputBox>
          <S.InputInformation>{passwordMessage}</S.InputInformation>
        </S.SubMiniBox>
        <S.BtnBox>
          <S.DarkSandBtn>로그인</S.DarkSandBtn>
          <S.OauthBtn>
            <GoogleLoginButton></GoogleLoginButton>
          </S.OauthBtn>
        </S.BtnBox>
      </S.SubBox>
    </S.Container>
  );
};

export default LoginBox;
