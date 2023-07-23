import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import GoogleLoginButton from "../googleoauth/GoogleOauth";
import { COLOR_1, FONT_WEIGHT } from "../../common/common";
import { FONT_SIZE_1 } from "../../common/common";
import styled from "styled-components";
import { baseURL } from "../../common/baseURL";
import { useNavigate } from "react-router-dom";

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 560px;
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
    height: 410px;
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
    width: 270px;
    color: ${COLOR_1.light_red};
    font-size: ${FONT_SIZE_1.small_2};
    @media screen and (min-width: 550px) {
      font-size: ${FONT_SIZE_1.small_3};
      width: 300px;
    }
  `,
  SubmitButton: styled.button`
    height: 50px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.green};
    color: black;
    font-size: ${FONT_SIZE_1.normal_3};
    font-weight: ${FONT_WEIGHT.weight_700};
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
    height: 25px;
    width: 75vw;
    padding: 10px;
    border-radius: 15px;
    font-size: ${FONT_SIZE_1.normal_2};
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
      width: 450px;
    }
  `,
};
interface FormValue {
  email: string;
  displayName: string;
  password: string;
  passwordConfirm: string;
}

const OwnerSignupBox = () => {
  const replace = useNavigate();
  const [posterror, setPostError] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const { email, displayName, password } = data;

    axios
      .post(`${baseURL}/members/sign-up`, {
        headers: {
          withCredentials: true,
        },
        email: email,
        displayName: displayName,
        password: password,
        privacy: true,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response);
        alert("가입이 완료되었습니다.");
        replace("/login");
      })
      .catch((error) => {
        // Handle error.
        setPostError(error.response.data.message);
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
            {...register("email", {
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && (
            <S.InputInformation>{errors.email.message}</S.InputInformation>
          )}
          <S.SubTitle htmlFor='displayName'>닉네임</S.SubTitle>
          <S.InputBox
            id='displayName'
            type='text'
            placeholder='닉네임을 입력하세요'
            {...register("displayName", {
              required: "닉네임은 필수 입력입니다",
              minLength: {
                value: 2,
                message: "2자이상 입력바랍니다",
              },
            })}
          ></S.InputBox>
          {errors.displayName && (
            <S.InputInformation>
              {errors.displayName.message}
            </S.InputInformation>
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
          {errors.password && (
            <S.InputInformation>{errors.password.message}</S.InputInformation>
          )}
          <S.SubTitle htmlFor='passwordConfirm'>비밀번호 확인</S.SubTitle>
          <S.InputBox
            id='passwordConfirm'
            type='password'
            placeholder='비밀번호 확인을 입력하세요'
            {...register("passwordConfirm", {
              required: "비밀번호 확인은 필수 입력입니다.",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = watch();
                  return password === value || " 비밀번호가 일치하지 않습니다.";
                },
              },
            })}
          ></S.InputBox>
          {errors.passwordConfirm && (
            <S.InputInformation>
              {errors.passwordConfirm.message}
            </S.InputInformation>
          )}
          <S.InputInformation>{posterror}</S.InputInformation>
        </S.SubMiniBox>
        <S.SubmitButton type='submit'>개인 회원가입</S.SubmitButton>
      </form>
      <GoogleLoginButton />
    </S.Container>
  );
};

export default OwnerSignupBox;
