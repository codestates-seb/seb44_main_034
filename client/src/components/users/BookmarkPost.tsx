import { FONT_SIZE_1 } from "../../common/common";
import styled from "styled-components";
import { ListType } from "./UserMyPageBox.tsx";
import { Link } from "react-router-dom";

const S = {
  PostContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 260px;
    border: solid 1px black;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 1px gray;
    margin-bottom: 20px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  PostImgBox: styled.img`
    height: 140px;
    width: 260px;
    border-radius: 10px 10px 0px 0px;
    object-fit: cover;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  PostInformaiton: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 240px;
    @media screen and (min-width: 768px) {
      width: 250px;
    }
  `,
  PostTitleBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 230px;
    @media screen and (min-width: 768px) {
      width: 250px;
    }
  `,
  PostTitle: styled.div`
    width: 200px;
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  PostWriterBox: styled.div`
    display: flex;
    justify-content: right;
    width: 250px;
    @media screen and (min-width: 768px) {
      width: 260px;
    }
  `,
  Writer: styled.div`
    text-align: center;
    width: 130px;
    font-size: ${FONT_SIZE_1.normal_1};
    @media screen and (min-width: 768px) {
      width: 150px;
    }
  `,
};

const BookmarkPost = (props: { data: ListType }) => {
  const { data } = props;
  return (
    <Link to={`/postpage/${data?.postId}`}>
      <S.PostContainer>
        <S.PostImgBox src={data?.image ?? ""} />
        <S.PostInformaiton>
          <S.PostTitleBox>
            <S.PostTitle>{data?.title ?? ""}</S.PostTitle>
          </S.PostTitleBox>
          <S.PostWriterBox>
            <S.Writer>-{data?.author ?? ""}</S.Writer>
          </S.PostWriterBox>
        </S.PostInformaiton>
      </S.PostContainer>
    </Link>
  );
};

export default BookmarkPost;
