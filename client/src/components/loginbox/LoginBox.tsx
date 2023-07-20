import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { LoginState } from "../../recoil/recoil";
import { useRecoilState } from "recoil";
import axios from "axios";
import GoogleLoginButton from "../googleoauth/GoogleOauth";
import { COLOR_1 } from "../../common/common";
import { FONT_SIZE_1 } from "../../common/common";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../common/baseURL";

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 90vw;
    border-radius: 20px;
    background-color: #fafafa;
    box-shadow: 1px 1px 3px 1px gray;
    @media screen and (min-width: 550px) {
      width: 500px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 250px;
    width: 80vw;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  SubTitle: styled.label`
    height: 15px;
    margin-top: 10px;
    margin-bottom: 6px;
    font-size: ${FONT_SIZE_1.normal_1};
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  InputInformation: styled.p`
    height: 5px;
    width: 250px;
    color: ${COLOR_1.light_red};
    font-size: ${FONT_SIZE_1.small_2};
    @media screen and (min-width: 550px) {
      font-size: ${FONT_SIZE_1.small_3};
    }
  `,
  Submitbutton: styled.button`
    height: 50px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.green};
    color: black;
    font-size: ${FONT_SIZE_1.big_1};
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #a4c6a4;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  InputBox: styled.input`
    height: 50px;
    width: 78vw;
    padding: 3px;
    border-radius: 15px;
    border: solid 1.5px ${COLOR_1.dark_sand};
    background-color: ${COLOR_1.white};
    cursor: pointer;

    &:hover {
      background-color: #efefef;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 460px;
    }
  `,
};
interface FormValue {
  username: string;
  password: string;
}

const LoginBox = () => {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const [posterror, setPostError] = useState<string>("");
  const replace = useNavigate();
  useEffect(() => {
    if (isLogin) {
      replace("/");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const { username, password } = data;
    axios
      .post(`${baseURL}/users/log-in`, {
        username: username,
        password: password,
      })
      .then((response) => {
        // Handle success.
        console.log("Login successful!");
        console.log(response);
        console.log(response.headers.role);
        console.log(response.headers.refresh);
        localStorage.setItem("access_token", response.headers.authorization);
        localStorage.setItem("refresh_token", response.headers.refresh);
        localStorage.setItem("role_token", response.headers.role);
        setIsLogin(true);
        replace("/");
        const waitForTokenExpiration = async (expirationTime: number) => {
          const currentTime = Date.now();
          const remainingTime = expirationTime - currentTime;

          if (remainingTime > 0) {
            await new Promise((resolve) => setTimeout(resolve, remainingTime));
            localStorage.removeItem("recoil-persist");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("role_token");
            window.location.replace("/");
          } else {
            console.log("토큰이 이미 만료되었습니다.");
          }
        };
        // 예시: 토큰 만료 시간 설정
        const expirationTime = Date.now() + 604700000; // 현재 시간으로부터 7일 후
        waitForTokenExpiration(expirationTime);
      })
      .catch((error) => {
        // Handle error.
        console.log(error.response);
        setPostError("이메일또는 비밀번호가 맞지않습니다.");
      });
  };
  return (
    <S.Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.SubMiniBox>
          <S.SubTitle htmlFor='email'>이메일</S.SubTitle>
          <S.InputBox
            id='email'
            type='text'
            placeholder='이메일을 입력하세요'
            {...register("username", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.username ? (
            <S.InputInformation>{errors.username.message}</S.InputInformation>
          ) : (
            <S.InputInformation>{null}</S.InputInformation>
          )}
          <S.SubTitle htmlFor='password'>비밀번호</S.SubTitle>
          <S.InputBox
            id='password'
            type='password'
            placeholder='비밀번호를 입력하세요'
            {...register("password", {
              required: "비밀번호는 필수 입력입니다",
              minLength: {
                value: 8,
                message: "8자 이상입력바랍니다",
              },
              maxLength: {
                value: 16,
                message: "16자 이하로 입력바랍니다",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                message:
                  "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요",
              },
            })}
          ></S.InputBox>
          {errors.password ? (
            <S.InputInformation>{errors.password.message}</S.InputInformation>
          ) : (
            <S.InputInformation>{null}</S.InputInformation>
          )}
          <S.InputInformation>{posterror}</S.InputInformation>
        </S.SubMiniBox>
        <S.Submitbutton type='submit'>로그인</S.Submitbutton>
      </form>
      <GoogleLoginButton />
    </S.Container>
  );
};

export default LoginBox;
