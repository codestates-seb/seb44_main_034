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
      <S.Title>{title.length>28 ? `${title.slice(0, 28)}...`: title}</S.Title>
    </S.TitleWrap>
    <S.UserNameWrap>
      <S.UserName>- {userName}</S.UserName>
    </S.UserNameWrap>
  </S.Container>
  )
}

const S = {
  Container: styled.div`
  width:300px;
  height:450px;
  border-radius:20px;
  box-shadow: 0 4px 3px ${COLOR_1.dark_brown};
  `,
  ImgWrap: styled.div`
    
  `,
  Img: styled.img`
  width:300px;
  height:300px;
  max-width:400px;
  max-height:400px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  `,
  TitleWrap: styled.div`
    margin: 4px 8px;
  `,
  Title: styled.span`
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_5};
  `,
  UserNameWrap: styled.div`
    display: flex;
    justify-content: end;
    margin: 20px 16px;
  `,
  UserName: styled.span`
    color: ${COLOR_1.brown};
    font-size: ${FONT_SIZE_2.normal_4};
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