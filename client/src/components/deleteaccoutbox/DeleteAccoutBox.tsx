import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { COLOR_1, FONT_WEIGHT } from "../../common/common";
import { FONT_SIZE_1 } from "../../common/common";
import styled from "styled-components";
import { baseURL } from "../../common/baseURL";

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 160px;
    width: 90vw;
    border-radius: 20px;
    background-color: #fafafa;
    margin-top: 5px;
    box-shadow: 1px 1px 3px 1px gray;
    @media screen and (min-width: 550px) {
      width: 500px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 150px;
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
  DeleleButton: styled.button`
    height: 50px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: #ff9587;
    color: black;
    font-size: 15px;
    font-weight: ${FONT_WEIGHT.weight_600};
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #ffffff;
    cursor: pointer;

    &:hover {
      background-color: #fd5050;
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
  password: string;
}

const DeleteAccountBox = () => {
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    if (localStorage.getItem("role_token") === "owner") {
      setRole("owners");
    } else if (localStorage.getItem("role_token") === "member") {
      setRole("members");
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const { password } = data;
    console.log(localStorage.getItem("access_token"));
    if (role === "members") {
      axios
        .patch(`${baseURL}/${role}/sign-out`, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
          password: password,
        })
        .then((response) => {
          // Handle success.
          console.log(response);
          localStorage.removeItem("recoil-persist");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert("탈퇴되었습니다!");
          window.location.replace("/");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    } else {
      axios
        .delete(`${baseURL}/${role}/sign-out`, {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
          data: data,
        })
        .then((response) => {
          // Handle success.
          console.log(response);
          localStorage.removeItem("recoil-persist");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert("탈퇴되었습니다!");
          window.location.replace("/");
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    }
  };
  return (
    <S.Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.SubMiniBox>
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
          />
          {errors.password ? (
            <S.InputInformation>{errors.password.message}</S.InputInformation>
          ) : (
            <S.InputInformation>{null}</S.InputInformation>
          )}
          <S.DeleleButton type='submit'>탈퇴하기</S.DeleleButton>
        </S.SubMiniBox>
      </form>
    </S.Container>
  );
};

export default DeleteAccountBox;
