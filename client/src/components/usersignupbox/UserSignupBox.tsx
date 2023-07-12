import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    margin-top: 20px;
    height: 450px;
    width: 90vw;
    @media screen and (min-width: 768px) {
    }
  `,
  SubBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;
    width: 90vw;
    border-radius: 20px;
    background-color: #fafafa;
    box-shadow: 1px 1px 3px 1px gray;
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 450px;
    width: 250px;
    margin-top: 10px;
  `,
  SubTitle: styled.label`
    height: 20px;
    margin-top: 10px;
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
  SubmitInput: styled.input`
    height: 50px;
    width: 250px;
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.green};
    color: black;
    font-size: 15px;
    margin-bottom: 40px;
    border: solid 1px #cfcfcf;
    cursor: pointer;

    &:hover {
      background-color: #a4c6a4;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
  `,
  InputBox: styled.input`
    height: 30px;
    width: 250px;
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
  `,
};
interface FormValue {
  email: string;
  nickName: string;
  password: string;
  passwordConfirm: string;
}

const UserSignupBox = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Container>
        <S.SubBox>
          <S.SubMiniBox>
            <S.SubTitle htmlFor='email'>이메일</S.SubTitle>
            <S.InputBox
              id='email'
              type='text'
              placeholder='이메일을 입력하세요'
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
            />
            {errors.email && (
              <S.InputInformation>{errors.email.message}</S.InputInformation>
            )}
            <S.SubTitle htmlFor='nickName'>닉네임</S.SubTitle>
            <S.InputBox
              id='nickName'
              type='text'
              placeholder='닉네임을 입력하세요'
              {...register('nickName', {
                required: '닉네임은 필수 입력입니다',
                minLength: {
                  value: 2,
                  message: '2자이상 입력바랍니다',
                },
              })}
            ></S.InputBox>
            {errors.nickName && (
              <S.InputInformation>{errors.nickName.message}</S.InputInformation>
            )}
            <S.SubTitle htmlFor='password'>비밀번호</S.SubTitle>
            <S.InputBox
              id='password'
              type='password'
              placeholder='비밀번호를 입력하세요'
              {...register('password', {
                required: '비밀번호는 필수 입력입니다',
                minLength: {
                  value: 8,
                  message: '8자 이상입력바랍니다',
                },
                maxLength: {
                  value: 16,
                  message: '16자 이하로 입력바랍니다',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                  message:
                    '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요',
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
              placeholder='비밀번호를 입력하세요'
              {...register('passwordConfirm', {
                required: '비밀번호 확인은 필수 입력입니다.',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = watch();
                    return (
                      password === value || ' 비밀번호가 일치하지 않습니다.'
                    );
                  },
                },
              })}
            ></S.InputBox>
            {errors.passwordConfirm && (
              <S.InputInformation>
                {errors.passwordConfirm.message}
              </S.InputInformation>
            )}
          </S.SubMiniBox>

          <S.SubmitInput type='submit' value='개인 회원가입' />
        </S.SubBox>
      </S.Container>
    </form>
  );
};

export default UserSignupBox;
