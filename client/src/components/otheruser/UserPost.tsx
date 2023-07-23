import { FONT_SIZE_1 } from "../../common/common";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ListType } from "../users/UserMyPageBox";

const S = {
  PostContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 90vw;
    border: solid 1px black;
    border-radius: 10px;
    box-shadow: 1px 2px 3px 1px gray;
    margin-top: 20px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
      width: 330px;
    }
  `,
  PostImgBox: styled.img`
    height: 140px;
    width: 90vw;
    border-radius: 10px 10px 0px 0px;
    @media screen and (min-width: 768px) {
      width: 330px;
    }
  `,
  PostInformaiton: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 80vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  PostTitleBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 75vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  PostTitle: styled.div`
    width: 80vw;
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  PostWriterBox: styled.div`
    display: flex;
    justify-content: right;
    width: 60vw;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  Writer: styled.div`
    text-align: center;
    width: 70px;
    font-size: ${FONT_SIZE_1.normal_1};
  `,
};

const UserPost = (props: { data: ListType }) => {
  const { data } = props;
  return (
    <Link to={`/postpage/${data?.cafeId}`}>
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

export default UserPost;
