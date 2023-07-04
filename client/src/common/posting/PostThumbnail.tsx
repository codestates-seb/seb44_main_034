import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2, FONT_WEIGHT } from "../common";
import styled from 'styled-components';

type PostThumbnailProps = {
  title: string;
  userName: string;
  url: string;
}

const PostThumbnail = ({title, userName, url}:PostThumbnailProps) => {

  return (
  <S.Container>
    <S.ImgWrap>
      <S.Img src={url} />
    </S.ImgWrap>
    <S.TitleWrap>
      <S.Title>{title}</S.Title>
    </S.TitleWrap>
    <S.UserNameWrap>
      <S.UserName>{userName}</S.UserName>
    </S.UserNameWrap>
  </S.Container>
  )
}

const S = {
  Container: styled.div`
  width:30vw;
  height:80vh;
  max-width:400px;
  max-height:600px;
  border-radius:20px;
  box-shadow: 0 4px 3px ${COLOR_1.dark_brown};
  `,
  ImgWrap: styled.div`
    
  `,
  Img: styled.img`
  width:1em;
  height:1em;
  max-width:400px;
  max-height:400px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  `,
  TitleWrap: styled.div`
  
  `,
  Title: styled.span`
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.big_6};
  `,
  UserNameWrap: styled.div`
  
  `,
  UserName: styled.span`
    color: ${COLOR_1.brown};
    font-size: ${FONT_SIZE_2.big_1};
  `,
  FacilitiesTag: styled.button`
    background-color: ${COLOR_1.white};
    color: ${COLOR_1.brown};
    height: 30px;
    padding: 6px 8px;
    border: 1px solid ${COLOR_1.black};
    border-radius: 12px;
    box-shadow: 0px 5px 6px ${COLOR_1.brown};
  `

}

export default PostThumbnail;