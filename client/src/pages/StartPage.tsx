import { useState, useEffect } from "react";
import styled from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../common/common";
import mainimage from "../assets/mainimage.jpeg";
import postimage from "../assets/postimage.jpeg";
import iphone14 from "../assets/iphone14.png";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

const S = {
  AllContainer: styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    width: 100vw;
    background-color: ${COLOR_1.ivory};
  `,
  Container: styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 600px;
    background-color: ${COLOR_1.ivory};
  `,
  TextBox1: styled.div`
    text-align: center;
    width: 90vw;
    opacity: 0; /* 처음에는 투명도를 0으로 설정하여 흐릿하게 만듭니다. */
    transition: opacity 1s;
    font-size: ${FONT_SIZE_1.big_1};
    @media screen and (min-width: 550px) {
      font-size: ${FONT_SIZE_1.big_3};
    }
  `,
  TextBox2: styled.div`
    text-align: center;
    width: 90vw;
    font-size: ${FONT_SIZE_1.big_1};
    animation: fadeInUp 2s ease;

    @keyframes fadeInUp {
      0% {
        transform: translateY(20px); /* 시작 위치 (20px 아래에서 시작) */
      }
      100% {
        transform: translateY(0); /* 끝 위치 (원래 위치로 올라옴) */
      }
    }
    @media screen and (min-width: 550px) {
      font-size: ${FONT_SIZE_1.big_3};
    }
  `,
  ImageBox: styled.img`
    height: 70vw;
    width: 90vw;
    border-radius: 10px;
    box-shadow: 0px 5px 5px 5px #b0b0b0;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 500px;
      height: 400px;
    }
  `,
  ImageBox2: styled.img`
    height: 70vw;
    width: 90vw;
    border-radius: 10px;
    box-shadow: 0px 5px 5px 5px #b0b0b0;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 500px;
      height: 400px;
    }
  `,
  ImageBox3: styled.img`
    height: 90vw;
    width: 40vw;
    border-radius: 25px;
    margin-top: 10px;
    @media screen and (min-width: 550px) {
      width: 200px;
      height: 400px;
    }
  `,
  StartButton1: styled.button`
    height: 50px;
    width: 200px;
    background-color: ${COLOR_1.light_green};
    border: solid 1px black;
    opacity: 0; /* 처음에는 투명도를 0으로 설정하여 흐릿하게 만듭니다. */
    transition: opacity 1s;
    &:hover {
      background-color: ${COLOR_1.green};
    }
    &:active {
      background-color: #737e3c;
    }
  `,
  StartButton2: styled.button`
    height: 50px;
    width: 200px;
    background-color: ${COLOR_1.light_green};
    border: solid 1px black;
    animation: fadeInUp 2s ease;
    margin-top: 10px;
    &:hover {
      background-color: ${COLOR_1.green};
    }
    &:active {
      background-color: #737e3c;
    }
  `,
};

const StartPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect
  useEffect(() => {
    setIsVisible(true);

    // 3초 후에 isVisible 값을 false로 설정하여 흐려지게 만듭니다.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    // 컴포넌트가 언마운트될 때 타이머를 클리어합니다.
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.AllContainer>
      <S.Container>
        {isVisible ? (
          <>
            <S.TextBox1>내가 원하는 스타일의 카페 찾기! CafeIn</S.TextBox1>
            <S.StartButton1>시작하기!</S.StartButton1>
          </>
        ) : (
          <>
            <S.TextBox2>내가 원하는 스타일의 카페 찾기! CafeIn</S.TextBox2>
            <Link to='/main'>
              <S.StartButton2>시작하기!</S.StartButton2>
            </Link>
          </>
        )}
      </S.Container>
      <S.Container>
        <S.TextBox2>원하는 카페, 메뉴를 검색해봐!</S.TextBox2>
        <S.ImageBox src={mainimage} />
      </S.Container>
      <S.Container>
        <S.TextBox2>카페를 이용하고 포스트를 써 공유해봐!</S.TextBox2>
        <S.ImageBox2 src={postimage} />
      </S.Container>
      <S.Container>
        <S.TextBox2>모바일로 더 편하게 사용해봐!</S.TextBox2>
        <S.ImageBox3 src={iphone14} />
      </S.Container>
      <Footer />
    </S.AllContainer>
  );
};

export default StartPage;
