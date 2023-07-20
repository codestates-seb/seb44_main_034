import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import CafeFollowerModal from '../modal/CafeFollowerModal';
import coffeeshop2 from '../../assets/coffeeshop2.jpeg';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../../common/baseURL';

const S = {
  Container: styled.div`
    width: 90vw;
    margin-bottom: 10px;
    @media screen and (min-width: 500px) {
      width: 480px;
    }
    @media screen and (min-width: 786px) {
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
    @media screen and (min-width: 500px) {
      width: 480px;
    }
    @media screen and (min-width: 786px) {
      flex-direction: row;
      width: 700px;
    }
  `,
  BottomBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 90vw;
    @media screen and (min-width: 500px) {
      width: 480px;
    }
    @media screen and (min-width: 786px) {
      width: 700px;
    }
  `,
  EditButtonBox: styled.div`
    display: flex;
    justify-content: right;
    height: 60px;
    width: 90vw;
    @media screen and (min-width: 500px) {
      width: 480px;
    }
    border-bottom: solid 1px ${COLOR_1.light_gray};
    @media screen and (min-width: 786px) {
      width: 700px;
    }
  `,
  EditButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 140px;
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
  ProfileImg: styled.img`
    width: 90vw;
    height: 180px;
    border: solid 2px black;
    border-radius: 10px;
    box-shadow: 0px 2px 2px 2px gray;
    @media screen and (min-width: 500px) {
      width: 480px;
    }
    @media screen and (min-width: 786px) {
      width: 300px;
      height: 200px;
    }
  `,
  ProfileImgBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 90vw;
    margin-top: 10px;
    @media screen and (min-width: 786px) {
      width: 350px;
    }
  `,
  ProfileListBox: styled.div`
    display: flex;
    height: 200px;
    width: 90vw;
    border-radius: 10px;
    background-color: ${COLOR_1.white};
    border: solid 2px ${COLOR_1.green};
    box-shadow: 2px 2px 2px 2px ${COLOR_1.light_green};
    @media screen and (min-width: 500px) {
      width: 480px;
    }
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
    @media screen and (min-width: 500px) {
      width: 480px;
    }
    @media screen and (min-width: 786px) {
      width: 80px;
    }
  `,
  TitleInformaiton: styled.div`
    width: 30vw;
    margin-top: 5px;
    text-align: center;
    color: ${COLOR_1.brown};
    @media screen and (min-width: 500px) {
      width: 100px;
    }
    @media screen and (min-width: 786px) {
      width: 800px;
    }
  `,
  FollowerInformaiton: styled.div`
    width: 60vw;
    margin-top: 5px;
    text-align: center;
    cursor: pointer;
    color: ${COLOR_1.black};
    &:hover {
      color: ${COLOR_1.light_red};
    }
    @media screen and (min-width: 500px) {
      width: 200px;
    }
    @media screen and (min-width: 786px) {
      width: 270px;
    }
  `,
  InformaitonBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
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
  SandButton: styled.button`
    height: 5vh;
    width: 290px;
    border-radius: 15px;
    border: none;
    margin-top: 10px;
    background-color: ${COLOR_1.ivory};
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.normal_2};
    font-weight: bold;
    border: solid 1px ${COLOR_1.dark_brown};
    cursor: pointer;
    &:hover {
      background-color: #a57d52;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
  `,
};
interface OwnerData {
  email: string;
  displayName: string;
}

interface CafeData {
  cafeId?: string;
  cafeName: string;
  countBookmarked: number;
  image: File;
}
const UserMyPageBox = () => {
  const [isFollowerOpen, setFollowerIsOpen] = useState<boolean>(false);
  const [ownerInfo, setOwnerInfo] = useState<OwnerData | undefined>();
  const [cafeInfo, setCafeInfo] = useState<CafeData | undefined>();
  const navigate = useNavigate();
  const openFollowerModal = () => {
    if (!isFollowerOpen) {
      setFollowerIsOpen(true);
    } else {
      setFollowerIsOpen(false);
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const followModalhandler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFollowerIsOpen(false);
      }
    };
    document.addEventListener('mousedown', followModalhandler);

    return () => {
      document.removeEventListener('mousedown', followModalhandler);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`${baseURL}/owners/my-page`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          withCredentials: true,
          Authorization: localStorage.getItem('access_token'),
        },
      })
      .then((response) => {
        // Handle success.
        console.log('success');
        console.log(response.data);
        setOwnerInfo(response.data.payload.ownerResponse);
        setCafeInfo(response.data.payload.cafe);
        console.log(cafeInfo?.cafeId);
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
              cafeInfo?.image
                ? URL.createObjectURL(cafeInfo.image)
                : coffeeshop2
            }
          ></S.ProfileImg>
        </S.ProfileImgBox>
        <S.ProfileListBox>
          <S.TitleInformaitonBox>
            <S.TitleInformaiton>이메일</S.TitleInformaiton>
            <S.TitleInformaiton>닉네임</S.TitleInformaiton>
            <S.TitleInformaiton>카페이름</S.TitleInformaiton>
            <S.TitleInformaiton>카페팔로워</S.TitleInformaiton>
          </S.TitleInformaitonBox>
          <S.InformaitonBox ref={dropdownRef}>
            <S.Informaiton>{ownerInfo ? ownerInfo.email : '-'}</S.Informaiton>
            <S.Informaiton>
              {ownerInfo ? ownerInfo.displayName : '-'}
            </S.Informaiton>
            <S.Informaiton>{cafeInfo ? cafeInfo.cafeName : '-'}</S.Informaiton>
            <S.FollowerInformaiton onClick={openFollowerModal}>
              {cafeInfo ? cafeInfo.countBookmarked : '0'}
            </S.FollowerInformaiton>
            {isFollowerOpen ? <CafeFollowerModal /> : null}
          </S.InformaitonBox>
        </S.ProfileListBox>
      </S.MiddleBox>
      <S.EditButtonBox>
        <Link to='/ownermy/edit/:id'>
          <S.EditButton>내 정보 수정하기</S.EditButton>
        </Link>
      </S.EditButtonBox>
      <S.BottomBox>
        <S.SandButton onClick={() => navigate(`/cafes/${cafeInfo?.cafeId}`)}>
          내 카페 보기
        </S.SandButton>
        <S.SandButton onClick={() => navigate('/cafes/add')}>
          내 카페 등록하기
        </S.SandButton>
        <S.SandButton
          onClick={() => navigate(`/cafe/edit/information/${cafeInfo?.cafeId}`)}
        >
          내 카페 수정하기
        </S.SandButton>
        <S.SandButton
          onClick={() => navigate(`/menus/${cafeInfo?.cafeId}/add`)}
        >
          카페 메뉴 등록하기
        </S.SandButton>
        <S.SandButton
          onClick={() => navigate(`/cafe/edit/menu/${cafeInfo?.cafeId}`)}
        >
          카페 메뉴 수정하기
        </S.SandButton>
      </S.BottomBox>
    </S.Container>
  );
};
export default UserMyPageBox;
