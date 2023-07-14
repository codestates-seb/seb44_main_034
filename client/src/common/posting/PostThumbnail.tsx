import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2 } from '../common';
import styled from 'styled-components';

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
            {title.length > 26 ? `${title.slice(0, 26)}...` : title}
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
    width: 300px;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0 4px 3px ${COLOR_1.dark_brown};
    @media screen and (max-width: 500px) {
      width: 42vw;
      height: 68vw;
      min-height: 243.163px;
      min-width: 150.188px;
    }
  `,
  ImgWrap: styled.div``,
  Img: styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    @media screen and (max-width: 500px) {
      width: 42vw;
      height: 42vw;
      min-height: 150.188px;
      min-width: 150.188px;
    }
  `,
  Div: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto 0;
    padding: 0;
    height: 130px;
    @media screen and (max-width: 500px) {
      height: 24vw;
    }
  `,
  TitleWrap: styled.div`
    margin: 4px auto 0 auto;
  `,
  Title: styled.span`
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_5};
    @media screen and (max-width: 280px) {
      font-size: ${FONT_SIZE_1.small_3};
    }
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.normal_1};
    }
  `,
  AuthorWrap: styled.div`
    display: flex;
    justify-content: end;
    margin: auto 12px 8px auto;
    @media screen and (max-width: 500px) {
      margin: auto 12px 8px auto;
    }
  `,
  Author: styled.span`
    color: ${COLOR_1.brown};
    font-size: ${FONT_SIZE_2.normal_4};
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_2.normal_2};
    }
  `,
  FacilitiesTag: styled.button`
    background-color: ${COLOR_1.white};
    color: ${COLOR_1.brown};
    height: 30px;
    padding: 6px 8px;
    border: 1px solid ${COLOR_1.black};
    border-radius: 12px;
    box-shadow: 0px 5px 6px ${COLOR_1.brown};
  `,
};

export default PostThumbnail;
