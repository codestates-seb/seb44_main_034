import { useState, useRef } from 'react';
import axios from 'axios';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: 800px;
    width: 400px;
    @media screen and (max-width: 500px) {
      height: 540px;
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
    justify-content: center;
    align-items: center;
    height: 600px;
    width: 400px;
    border-radius: 20px;
    border: solid 1px #cfcfcf;
    background-color: ${COLOR_1.ivory};
    @media screen and (max-width: 500px) {
      height: 350px;
      width: 300px;
    }
  `,
  SubMiniBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 500px;
    width: 350px;
    margin-top: 10px;
    @media screen and (max-width: 500px) {
      height: 300px;
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
    font-size: ${FONT_SIZE_1.big_2};
    margin-bottom: 40px;
    cursor: pointer;
    border: solid 1px #cfcfcf;
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
      font-size: ${FONT_SIZE_1.normal_2};
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
  ProfileImgBox: styled.div`
    display: flex;
    justify-content: center;
    width: 150px;
    @media screen and (max-width: 500px) {
      width: 260px;
    }
  `,
  AllProfileImgBox: styled.div`
    display: flex;
    justify-content: center;
    width: 350px;
    @media screen and (max-width: 500px) {
      width: 260px;
    }
  `,
  ProfileImg: styled.img`
    height: 150px;
    width: 150px;
    border-radius: 75px;
    border: solid 2px ${COLOR_1.dark_brown};
    @media screen and (max-width: 500px) {
      height: 80px;
    }
  `,
  DeleteBtn: styled.button`
    width: 60px;
    height: 35px;
    margin-top: 55px;
    margin-left: 17px;
    color: gray;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: rgba(49, 114, 220, 0.05);
    }
    &:active {
      box-shadow: 0px 0px 1px 3px #aedcff;
    }
  `,
};

const EditUserMyPageBox = () => {
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [displayNameMessage, setDisplayNameMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  const [isname, setIsName] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [image, setImage] = useState<Blob | MediaSource | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handlerImageClick = () => {
    inputRef.current?.click();
  };
  const handlerImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentName = event.target.value;
    setDisplayName(currentName);

    if (currentName.length < 2 || currentName.length > 10) {
      setDisplayNameMessage('닉네임은 2글자 이상 10글자 이하로 입력해주세요!');
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
    if (isname && isPassword && isPasswordConfirm) {
      axios
        .patch('http://43.201.232.213:8080/members', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            Authorization: localStorage.getItem('access_token'),
          },
          password: password,
          displayName: displayName,
          image: image,
        })
        .then((response) => {
          // Handle success.
          console.log('Well done!');
          console.log('User profile', response);
          alert('정보가 수정되었습니다.');
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });
    } else {
      alert('공백없이 입력바랍니다.');
    }
  };
  const deleteAccout = () => {
    const result = window.confirm('정말 계정을 삭제하시겠습니까?');
    if (result) {
      axios
        .delete(`http://43.201.232.213:8080/members`)
        .then((response) => {
          // Handle success.
          console.log(response);
          localStorage.removeItem('recoil-persist');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.replace('/');
        })
        .catch((error) => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });
    } else {
      // 취소 버튼이 눌렸을 때의 동작
      console.log('Cancelled');
    }
  };
  return (
    <S.Container>
      <S.MainBox>
        <S.MainTitle>개인 회원 정보 수정하기</S.MainTitle>
      </S.MainBox>
      <S.SubBox>
        <S.SubMiniBox>
          <S.AllProfileImgBox>
            <S.ProfileImgBox onClick={handlerImageClick}>
              {image ? (
                <S.ProfileImg src={URL.createObjectURL(image)} alt='' />
              ) : (
                <S.ProfileImg src={profileimg} alt='' />
              )}
              <input
                type='file'
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handlerImageChange}
              />
            </S.ProfileImgBox>
          </S.AllProfileImgBox>
          <S.SubTitle htmlFor='displayName'>닉네임</S.SubTitle>
          <S.InputBox
            id='displayName'
            value={displayName}
            onChange={onChangeName}
          ></S.InputBox>
          <S.InputInformation>{displayNameMessage}</S.InputInformation>
          <S.SubTitle htmlFor='password'>비밀번호 변경</S.SubTitle>
          <S.InputBox
            id='password'
            type='password'
            value={password}
            onChange={onChangePassword}
          ></S.InputBox>
          <S.InputInformation>{passwordMessage}</S.InputInformation>
          <S.SubTitle htmlFor='passwordConfirm'>비밀번호 변경 확인</S.SubTitle>
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
          수정완료
        </S.DarkSandBtn>
      </S.SubBox>
      <S.DeleteBtn onClick={deleteAccout}>탈퇴하기</S.DeleteBtn>
    </S.Container>
  );
};

export default EditUserMyPageBox;
