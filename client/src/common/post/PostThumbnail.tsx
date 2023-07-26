import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2 } from "../common";
import styled from "styled-components";

type PostThumbnailProps = {
  image: string;
  title: string;
  author: string;
};

const PostThumbnail = ({ image, title, author }: PostThumbnailProps) => {
  return (
    <S.Container>
      <S.ImgWrap>
        <S.Img src={image} />
      </S.ImgWrap>
      <S.Div>
        <S.TitleWrap>
          <S.Title>
            {title.length > 21 ? `${title.slice(0, 21)}...` : title}
          </S.Title>
        </S.TitleWrap>
        <S.AuthorWrap>
          <S.Author>- {author}</S.Author>
        </S.AuthorWrap>
      </S.Div>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 240px;
    border-radius: 20px;
    box-shadow: 0 4px 3px ${COLOR_1.dark_brown};
    color: ${COLOR_1.dark_brown};
    @media screen and (max-width: 767px) {
      min-width: 300px;
      min-height: 240px;
    }
    &:hover {
      color: ${COLOR_1.dark_sand};
    }
  `,
  ImgWrap: styled.div`
    width: 100%;
    height: 180px;
  `,
  Img: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 100%;
      /* min-width: 100%; */
      /* min-height: 100%; */
    }
  `,
  Div: styled.div`
    height: 50px;
    /* display: block; */
    /* flex-direction: column; */
    /* justify-content: space-between; */
    margin: 0;
    padding: 4px;
    /* height: 30%; */
    @media screen and (max-width: 767px) {
      /* height: 30%; */
      /* min-height:20px; */
    }
  `,
  TitleWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16px;
    margin: 4px 0 14px 0;
  `,
  Title: styled.span`
    font-size: ${FONT_SIZE_2.normal_3};
    @media screen and (max-width: 280px) {
      font-size: ${FONT_SIZE_1.small_3};
    }
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_2};
    }
  `,
  AuthorWrap: styled.div`
    display: flex;
    justify-content: end;
    height: 16px;
    margin: 0 12px 6px auto;
    text-align: right;
    @media screen and (max-width: 767px) {
      margin: 0px 12px 6px 0;
    }
  `,
  Author: styled.span`
    font-size: ${FONT_SIZE_1.normal_1};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_1};
    }
  `,
};
export default PostThumbnail;
