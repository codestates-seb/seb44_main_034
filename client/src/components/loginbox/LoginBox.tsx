import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginState } from '../../recoil/recoil';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import GoogleOauth from '../../assets/GoogleOauth.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    height: 500px;
    width: 500px;
    margin-top: 40px;
    @media screen and (max-width: 500px) {
      height: 300px;
      width: 300px;
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
    border: solid 1px #cfcfcf;
    @media screen and (max-width: 500px) {
      height: 300px;
      width: 300px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 230px;
    width: 350px;
    margin-top: 40px;
    @media screen and (max-width: 500px) {
      height: 140px;
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
    color: ${COLOR_1.light_red};
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
    font-size: ${FONT_SIZE_1.big_1};
    border: solid 1px #cfcfcf;
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 500px) {
      height: 30px;
      width: 250px;
      border-radius: 7px;
      border: none;
      background-color: dark_sand;
      color: white;
      font-size: ${FONT_SIZE_1.normal_2};
    }
  `,
  InputBox: styled.input`
    height: 50px;
    width: 350px;
    border-radius: 5px;
    border: solid 1px #a5a5a5;
    background-color: ${COLOR_1.white};
    cursor: pointer;

    &:hover {
      background-color: #eaeaea;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (max-width: 500px) {
      height: 25px;
      width: 250px;
    }
  `,
  OauthBtn: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    @media screen and (max-width: 500px) {
    }
  `,
  BtnBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;
    width: 350px;
    @media screen and (max-width: 500px) {
      height: 100px;
      width: 250px;
    }
  `,
  GoogleBtn: styled.img`
    height: 50px;
    width: 50px;
  `,
};

const LoginBox = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [idMessage, setIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  useEffect(() => {
    if (isLogin) {
      replace('/');
    }
  });
  const replace = useNavigate();

  const onChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentId = event.target.value;
    setEmail(currentId);
    const idRegExp =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (!idRegExp.test(currentId)) {
      setIdMessage('이메일 형식에 맞게 작성하세요');
      setIsEmail(false);
    } else {
      setIdMessage('');
      setIsEmail(true);
    }
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = event.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('');
      setIsPassword(true);
    }
  };

  const checkUser = () => {
    if (isEmail && isPassword) {
      axios
        .post('https://c1da-58-237-124-214.ngrok-free.app/api/users/log-in', {
          username: email,
          password: password,
        })
        .then((response) => {
          // Handle success.
          console.log('Login successful!');
          console.log(response);
          console.log(response.headers.role);
          localStorage.setItem('access_token', response.headers.authorization);
          localStorage.setItem('refresh_token', response.headers.refresh);
          localStorage.setItem('role_token', response.headers.role);
          setIsLogin(true);
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });
    } else {
      alert('공백없이 입력바랍니다');
    }
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorization = url.searchParams.get('access_token');
    const refresh = url.searchParams.get('refresh_token');
    if (authorization !== undefined) {
      localStorage.setItem('access_token', authorization || '');
      localStorage.setItem('refresh_token', refresh || '');
      localStorage.setItem('role_token', 'member');
      // replace('/');
    }
  });
  return (
    <S.Container>
      <S.MainBox>
        <S.MainTitle>로그인</S.MainTitle>
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
          <S.DarkSandBtn onClick={checkUser}>로그인</S.DarkSandBtn>
          <S.OauthBtn>
            <Link to='https://7810-58-237-124-214.ngrok-free.app/oauth2/authorization/google'>
              <S.GoogleBtn src={GoogleOauth} />
            </Link>
          </S.OauthBtn>
        </S.BtnBox>
      </S.SubBox>
    </S.Container>
  );
};

export default LoginBox;
