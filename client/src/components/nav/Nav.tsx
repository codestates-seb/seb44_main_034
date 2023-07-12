import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginState } from '../../recoil/recoil';
import { useRecoilValue } from 'recoil';
import { COLOR_1 } from '../../common/common';
import { BiHome } from 'react-icons/bi';
import { BsFilePost } from 'react-icons/bs';
import { IoCafeOutline } from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import ProfileModal from '../profilemodal/ProfileModal';

import styled from 'styled-components';

const S = {
  BackContainer: styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100vw;
    background-color: #f9f9f9;
    border-top: solid 1px ${COLOR_1.green};
    bottom: 0;
  `,
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 100vw;
    @media screen and (min-width: 769px) {
      width: 768px;
    }
  `,
  NavBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25vw;
    height: 80px;
    background-color: #f9f9f9;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    &:active {
      background-color: #d6d6d6;
    }
  `,
  Iconbox: styled.div`
    height: 40px;
    width: 40px;
    text-align: center;
  `,
  IconTextBox: styled.div`
    height: 20px;
    width: 50px;
    text-align: center;
  `,
};

const Nav = () => {
  const replace = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const mainHandler = () => {
    replace('/');
  };
  const postHandler = () => {
    replace('/allpostpage');
  };

  const modalHandler = (): void => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);

  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);

  return (
    <nav>
      <S.BackContainer>
        <S.Container>
          <S.NavBox onClick={mainHandler}>
            <S.Iconbox>
              <BiHome size='40' />
            </S.Iconbox>
            <S.IconTextBox>홈</S.IconTextBox>
          </S.NavBox>
          <S.NavBox onClick={postHandler}>
            <S.Iconbox>
              <BsFilePost size='40' />
            </S.Iconbox>

            <S.IconTextBox>포스트</S.IconTextBox>
          </S.NavBox>
          <S.NavBox>
            <S.Iconbox>
              <IoCafeOutline size='40' />
            </S.Iconbox>
            <S.IconTextBox>카페</S.IconTextBox>
          </S.NavBox>
          <S.NavBox onClick={modalHandler}>
            <S.Iconbox>
              <FiUser size='40' />
            </S.Iconbox>
            <S.IconTextBox>마이홈</S.IconTextBox>
            {isOpen ? <ProfileModal /> : null}
          </S.NavBox>
        </S.Container>
      </S.BackContainer>
    </nav>
  );
};

export default Nav;
