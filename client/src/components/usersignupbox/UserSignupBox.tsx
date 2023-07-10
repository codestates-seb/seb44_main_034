import styled from 'styled-components';
import { useState } from 'react';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import axios from 'axios';

const S = {
  Container: styled.div`
    margin-top: 20px;
    height: 500px;
    width: 400px;
    @media screen and (max-width: 500px) {
      height: 350px;
      width: 300px;
    }
  `,
  MainBox: styled.div`
    height: 50px;
    margin-bottom: 25px;
    @media screen and (max-width: 500px) {
      height: 25px;
      margin-bottom: 25px;
    }
  `,
  SubBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 500px;
    width: 400px;
    border-radius: 20px;
    border: solid 1px #cfcfcf;
    background-color: ${COLOR_1.ivory};
    @media screen and (max-width: 500px) {
      height: 320px;
      width: 300px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 400px;
    width: 350px;
    margin-top: 10px;
    @media screen and (max-width: 500px) {
      height: 375px;
      width: 250px;
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
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: ${FONT_SIZE_1.normal_3};
    @media screen and (max-width: 500px) {
      height: 10px;
      font-size: ${FONT_SIZE_1.small_2};
    }
  `,
  InputInformation: styled.p`
    height: 10px;
    color: ${COLOR_1.light_red};
    font-size: ${FONT_SIZE_1.small_2};
    @media screen and (max-width: 500px) {
      font-size: 5px;
    }
  `,
  DarkSandBtn: styled.button`
    height: 50px;
    width: 350px;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.dark_sand};
    color: white;
    font-size: 20px;
    margin-bottom: 40px;
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 500px) {
      height: 35px;
      width: 250px;
      border-radius: 7px;
      border: none;
      background-color: dark_sand;
      color: white;
      font-size: 10px;
      margin-bottom: 20px;
    }
  `,
  InputBox: styled.input`
    height: 60px;
    width: 350px;
    border-radius: 5px;
    border: solid 1px #a5a5a5;
    background-color: ${COLOR_1.white};
    cursor: pointer;

    &:hover {
      background-color: #efefef;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 500px) {
      height: 20px;
      width: 250px;
    }
  `,
};

const UserSignupBox = () => {
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [idMessage, setIdMessage] = useState<string>('');
  const [displayNameMessage, setDisplayNameMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  const [isId, setIsId] = useState<boolean>(false);
  const [isname, setIsName] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentId = event.target.value;
    setEmail(currentId);
    const idRegExp =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (!idRegExp.test(currentId)) {
      setIdMessage('이메일 형식에 맞게 작성해주세요');
      setIsId(false);
    } else {
      setIdMessage('사용가능한 아이디 입니다.');
      setIsId(true);
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentName = event.target.value;
    setDisplayName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setDisplayNameMessage('닉네임은 2글자 이상 5글자 이하로 입력해주세요!');
      setIsName(false);
    } else {
      setDisplayNameMessage('사용가능한 닉네임 입니다.');
      setIsName(true);
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
  const onChangePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentPasswordConfirm = event.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('');
      setIsPasswordConfirm(true);
    }
  };
  const register = () => {
    if (isId && isname && isPassword && isPasswordConfirm) {
      axios
        .post('http://43.201.232.213:8080/members', {
          email: email,
          password: password,
          displayName: displayName,
        })
        .then((response) => {
          // Handle success.
          console.log('Well done!');
          console.log('User profile', response);
          alert('가입이 완료되었습니디.');
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });
    } else {
      alert('공백없이 입력바랍니다.');
    }
  };
  return (
    <S.Container>
      <S.MainBox>
        <S.MainTitle>개인 회원가입</S.MainTitle>
      </S.MainBox>
      <S.SubBox>
        <S.SubMiniBox>
          <S.SubTitle htmlFor='email'>이메일</S.SubTitle>
          <S.InputBox
            id='email'
            value={email}
            onChange={onChangeId}
          ></S.InputBox>
          <S.InputInformation>{idMessage}</S.InputInformation>
          <S.SubTitle htmlFor='displayName'>닉네임</S.SubTitle>
          <S.InputBox
            id='displayName'
            value={displayName}
            onChange={onChangeName}
          ></S.InputBox>
          <S.InputInformation>{displayNameMessage}</S.InputInformation>
          <S.SubTitle htmlFor='password'>비밀번호</S.SubTitle>
          <S.InputBox
            id='password'
            type='password'
            value={password}
            onChange={onChangePassword}
          ></S.InputBox>
          <S.InputInformation>{passwordMessage}</S.InputInformation>
          <S.SubTitle htmlFor='passwordConfirm'>비밀번호 확인</S.SubTitle>
          <S.InputBox
            id='passwordConfirm'
            type='password'
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          ></S.InputBox>
          <S.InputInformation>{passwordConfirmMessage}</S.InputInformation>
        </S.SubMiniBox>
        <S.DarkSandBtn
          onClick={() => {
            register();
          }}
        >
          회원가입
        </S.DarkSandBtn>
      </S.SubBox>
    </S.Container>
  );
};

export default UserSignupBox;
