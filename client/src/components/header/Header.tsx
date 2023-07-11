import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LoginState } from '../../recoil/recoil';
import { useRecoilValue } from 'recoil';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_1 } from '../../common/common';
import { FONT_WEIGHT } from '../../common/common';
import ProfileModal from '../profilemodal/ProfileModal';
import profileimg from '../../assets/profileimg.svg';
import Logo from '../../assets/Logo.svg';
import styled from 'styled-components';

const S = {
  ALlContioner: styled.div`
    justify-content: center;
    height: 90px;
    width: 100vw;

    @media screen and (max-width: 500px) {
      height: 62px;
    }
  `,

  Container: styled.div`
    display: flex;
    position: fixed;
    display: flex;
    height: 80px;
    width: 100vw;
    background-color: white;
    box-shadow: 0px 1px 1px 0px #82c8a0;
    @media screen and (max-width: 500px) {
      height: 60px;
    }
  `,
  LogoBox: styled.div`
    width: 15vw;
  `,
  LogoImg: styled.img`
    height: 80px;
    width: 230px;
    cursor: pointer;
    @media screen and (max-width: 500px) {
      height: 60px;
      width: 60px;
    }
  `,
  MiddleBox: styled.div`
    display: flex;

    width: 65vw;
    @media screen and (max-width: 900px) {
      width: 50vw;
    }
    @media screen and (max-width: 700px) {
      width: 45vw;
    }
  `,
  ListBtn: styled.button`
    height: 80px;
    width: 150px;
    font-size: ${FONT_SIZE_1.big_3};
    font-weight: ${FONT_WEIGHT.weight_800};
    background-color: transparent;
    font-family: 'Climate Crisis', cursive;
    border: none;
    cursor: pointer;
    &:hover {
      color: ${COLOR_1.brown};
    }
    @media screen and (max-width: 900px) {
      font-size: ${FONT_SIZE_1.big_3};
      height: 80px;
      width: 100px;
    }
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.big_1};
      height: 60px;
      width: 80px;
    }
  `,
  UserBox: styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    width: 220px;
    @media screen and (max-width: 800px) {
      width: 200px;
    }
    @media screen and (max-width: 500px) {
      width: 180px;
      height: 65px;
    }
  `,
  UserBtn: styled.div`
    font-size: ${FONT_SIZE_1.normal_3};
    height: 30px;
    width: 100px;
    color: #82c8a0;
    margin: 20px 10px 25px;
    border-radius: 10px;
    border: solid 1px #82c8a0;
    text-align: center;
    &:hover {
      background-color: #80c49d;
      color: white;
    }
    &:active {
      top: 4px;
      box-shadow: 0 0 0 1px #82c8a0 inset,
        0 0 0 2px rgba(255, 255, 255, 0.15) inset, 0 0 0 1px rgba(0, 0, 0, 0.4);
    }
    @media screen and (max-width: 700px) {
      font-size: ${FONT_SIZE_1.normal_1};
      height: 24px;
      width: 70px;
    }
  `,
  ProfileImg: styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
    @media screen and (max-width: 500px) {
      height: 40px;
      width: 40px;
    }
  `,
  Box: styled.div`
    width: 4vw;
  `,
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ModalHandler = (): void => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const login1 = useRecoilValue(LoginState);

  return (
    <header>
      <S.ALlContioner>
        <S.Container>
          <S.LogoBox>
            <Link to='/'>
              <S.LogoImg src={Logo} />
            </Link>
          </S.LogoBox>
          <nav>
            <S.MiddleBox>
              <Link to='/AllPostPage'>
                <S.ListBtn>Post</S.ListBtn>
              </Link>
              <S.ListBtn>Cafe</S.ListBtn>
            </S.MiddleBox>
          </nav>
          <S.UserBox ref={dropdownRef}>
            {!login1 ? (
              <>
                <Link to='/login'>
                  <S.UserBtn>로그인</S.UserBtn>
                </Link>
                <Link to='/SignupSelect'>
                  <S.UserBtn>회원가입</S.UserBtn>
                </Link>
              </>
            ) : (
              <>
                <S.ProfileImg src={profileimg} onClick={ModalHandler} />

                {isOpen ? <ProfileModal></ProfileModal> : null}
              </>
            )}
          </S.UserBox>
          <S.Box></S.Box>
        </S.Container>
      </S.ALlContioner>
    </header>
  );
};

export default Header;
