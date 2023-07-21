import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { COLOR_1 } from "../common/common";
import { FONT_SIZE_1 } from "../common/common";

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
    height: 380px;
    width: 80vw;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  Title: styled.label`
    height: 15px;
    margin-top: 10px;
    margin-bottom: 6px;
    font-size: ${FONT_SIZE_1.normal_2};
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  ExplainBox: styled.label`
    height: 180px;
    margin-top: 10px;
    margin-bottom: 6px;
    font-size: ${FONT_SIZE_1.small_2};
    border: solid 1px black;
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  NextButton: styled.button`
    height: 40px;
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

  InactiveButton: styled.button`
    height: 40px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.light_gray};
    color: #999999;
    font-size: ${FONT_SIZE_1.big_1};
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #cfcfcf;
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  ExitButton: styled.button`
    height: 40px;
    width: 80vw;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.light_green};
    color: black;
    font-size: 15px;
    font-weight: 900;
    margin-top: 10px;
    margin-bottom: 10px;
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #b8d2b8;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  Agreementbox: styled.div`
    display: flex;
    justify-content: right;
    width: 80vw;
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
  AgreementCheckBox: styled.input`
    height: 20px;
    width: 20px;
  `,
};

const SignupAgreement = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <S.Container>
      <S.SubMiniBox>
        <S.Title>개인정보 수집 및 이용안내</S.Title>
        <S.ExplainBox>
          회원가입, 고객상담을 위해서 아래와 같이 개인정보를 수집·이용합니다.{" "}
          <br></br>1. 개인정보 수집 목적: 회원관리, 고객상담, 고지사항 전달
          <br></br>2. 개인정보 수집 항목:이메일, 비밀번호
          <br></br>3. 보유 및 이용기간 : 회원 탈퇴시까지
          <br></br>*개인정보 수집 및 이용에 동의하지 않을 권리가 있으며, 동의를
          거부할 경우에는 회원가입이 불가합니다.
        </S.ExplainBox>
        <S.Agreementbox>
          동의함
          <S.AgreementCheckBox
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </S.Agreementbox>
        {!isChecked && <S.InactiveButton>동의 후 가입 가능</S.InactiveButton>}
        {isChecked && (
          <Link to='/signupselect'>
            <S.NextButton>가입계속</S.NextButton>
          </Link>
        )}
        <S.ExitButton>나가기</S.ExitButton>
      </S.SubMiniBox>
    </S.Container>
  );
};

export default SignupAgreement;
