import { useEffect, useState } from 'react';
import axios from 'axios';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import { baseURL } from '../../common/baseURL';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    min-height: 100vh;
    width: 90vw;
    @media screen and (min-width: 768px) {
      width: 700px;
    }
  `,
  MiddleBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      flex-direction: row;
      width: 700px;
    }
  `,
  MiddleTopBox: styled.div`
    display: flex;
    height: 150px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      width: 350px;
    }
  `,
  BottomBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      width: 700px;
    }
  `,
  EditButtonBox: styled.div`
    display: flex;
    justify-content: right;
    height: 60px;
    width: 90vw;
    border-bottom: solid 1px ${COLOR_1.light_gray};
    @media screen and (min-width: 786px) {
      width: 700px;
    }
  `,
  ProfileImg: styled.img`
    width: 170px;
    @media screen and (min-width: 786px) {
      width: 200px;
    }
  `,
  ProfileImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 90vw;
    @media screen and (min-width: 786px) {
      width: 350px;
    }
  `,
  ProfileListBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 90vw;
    border-radius: 10px;
    background-color: ${COLOR_1.white};
    border: solid 2px ${COLOR_1.green};
    box-shadow: 2px 2px 2px 2px ${COLOR_1.light_green};
    @media screen and (min-width: 786px) {
      width: 350px;
    }
  `,
  TitleInformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30vw;
    @media screen and (min-width: 786px) {
      width: 80px;
    }
  `,
  TitleInformaiton: styled.div`
    width: 30vw;
    margin-top: 5px;
    text-align: center;
    color: ${COLOR_1.brown};
    @media screen and (min-width: 786px) {
      width: 60px;
    }
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vw;
    font-weight: 200;
    @media screen and (min-width: 786px) {
      width: 270px;
    }
  `,
  Informaiton: styled.div`
    text-align: center;
    width: 60vw;
    margin-top: 5px;
    color: black;
    @media screen and (min-width: 786px) {
      width: 270px;
    }
  `,
  SandBtn: styled.button`
    height: 5vh;
    width: 29vw;
    border-radius: 3px;
    border: none;
    background-color: ${COLOR_1.ivory};
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.small_3};
    font-weight: bold;
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
      color: white;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 786px) {
      font-size: ${FONT_SIZE_1.normal_2};
      width: 200px;
    }
  `,
  FollowButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 160px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    color: ${COLOR_1.dark_sand};
    background-color: ${COLOR_1.ivory};
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
      color: white;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
      color: white;
    }
  `,
};

interface UserData {
  displayName?: string;
  grade?: string;
  image?: File;
}
const OtherUserMyPageBox = () => {
  // const replace = useNavigate();
  const [memberInfo, setMemberInfo] = useState<UserData | undefined>();
  const followingHandler = () => {
    axios
      .post(`${baseURL}/members/1/follow`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: localStorage.getItem('access_token'),
        },
      })
      .then((response) => {
        // Handle success.
        console.log('success');
        setMemberInfo(response.data.payload);
      })
      .catch((error) => {
        // Handle error.

        console.log('An error occurred:', error.response);
        // replace('/');
      });
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/api/member/1`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        // Handle success.
        console.log('success');
        setMemberInfo(response.data.payload);
      })
      .catch((error) => {
        // Handle error.

        console.log('An error occurred:', error.response);
        // replace('/');
      });
  }, []);
  return (
    <S.Container>
      <S.MiddleBox>
        <S.ProfileImgBox>
          <S.ProfileImg
            src={
              memberInfo?.image
                ? URL.createObjectURL(memberInfo.image)
                : profileimg
            }
          ></S.ProfileImg>
        </S.ProfileImgBox>
        <S.ProfileListBox>
          <S.MiddleTopBox>
            <S.TitleInformaitonBox>
              <S.TitleInformaiton>닉네임</S.TitleInformaiton>
              <S.TitleInformaiton>회원등급</S.TitleInformaiton>
            </S.TitleInformaitonBox>
            <S.InformaitonBox>
              <S.Informaiton>
                {memberInfo ? memberInfo.displayName : '-'}
              </S.Informaiton>
              <S.Informaiton>
                {memberInfo ? memberInfo.grade : '-'}
              </S.Informaiton>
            </S.InformaitonBox>
          </S.MiddleTopBox>
          <S.FollowButton onClick={followingHandler}>팔로워하기</S.FollowButton>
        </S.ProfileListBox>
      </S.MiddleBox>
      <S.EditButtonBox></S.EditButtonBox>
      <S.BottomBox>
        <S.SandBtn>작성한 포스트</S.SandBtn>
      </S.BottomBox>
    </S.Container>
  );
};

export default OtherUserMyPageBox;
