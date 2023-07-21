import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { BsFilePost } from "react-icons/bs";
import { BsFilePostFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { BiSolidUser } from "react-icons/bi";
import ProfileModal from "../modal/ProfileModal";

import styled from "styled-components";

const S = {
  BackContainer: styled.div`
    width: 100%;
    height: 70px;
    margin: 0;
    @media screen and (min-width: 769px) {
      width: 768px;
    }
    > div {
      display: flex;
      justify-content: center;
      position: fixed;
      width: 100%;
      background-color: #f9f9f9;
      border-top: solid 1px ${COLOR_1.green};
      bottom: 0;
    }
  `,
  Container: styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
    @media screen and (min-width: 769px) {
      width: 768px;
    }
  `,
  NavButton: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33vw;
    height: 70px;
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
    height: 35px;
    width: 35px;
    text-align: center;
    color: black;
  `,
  IconTextBox: styled.div`
    height: 20px;
    width: 50px;
    text-align: center;
    color: black;
    font-size: ${FONT_SIZE_1.normal_1};
  `,
};

const Nav = () => {
  const replace = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState("home");

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const mainHandler = () => {
    handleButtonClick("home");
    replace("/main");
  };
  const postHandler = () => {
    handleButtonClick("post");
    replace("/allposts");
  };

  const modalHandler = (): void => {
    handleButtonClick("my");
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const dropdownRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <nav>
      <S.BackContainer>
        <div>
          <S.Container>
            <S.NavButton onClick={mainHandler}>
              <S.Iconbox>
                {selectedButton === "home" ? (
                  <GoHomeFill size='30' color='#CED5B2' />
                ) : (
                  <GoHome size='30' />
                )}
              </S.Iconbox>
              <S.IconTextBox>홈</S.IconTextBox>
            </S.NavButton>
            <S.NavButton onClick={postHandler}>
              <S.Iconbox>
                {selectedButton === "post" ? (
                  <BsFilePostFill size='30' color='#CED5B2' />
                ) : (
                  <BsFilePost size='30' />
                )}
              </S.Iconbox>

              <S.IconTextBox>포스트</S.IconTextBox>
            </S.NavButton>
            <S.NavButton onClick={modalHandler} ref={dropdownRef}>
              <S.Iconbox>
                {selectedButton === "my" ? (
                  <BiSolidUser size='30' color='#CED5B2' />
                ) : (
                  <BiUser size='30' />
                )}
              </S.Iconbox>
              <S.IconTextBox>마이</S.IconTextBox>
              {isOpen ? <ProfileModal /> : null}
            </S.NavButton>
          </S.Container>
        </div>
      </S.BackContainer>
    </nav>
  );
};

export default Nav;
