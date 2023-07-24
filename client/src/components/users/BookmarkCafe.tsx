import { FONT_SIZE_1 } from "../../common/common";
import { BiSolidCoffeeBean } from "react-icons/bi";
import styled from "styled-components";
import { ListType } from "./UserMyPageBox.tsx";
import { Link } from "react-router-dom";

const S = {
  GradeImg: styled.img`
    height: 20px;
    width: 20px;
    border-radius: 10px;
  `,
  CafeContainer: styled.div`
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
  CafeImgBox: styled.img`
    height: 140px;
    width: 260px;
    border-radius: 10px 10px 0px 0px;
    object-fit: cover;
    @media screen and (min-width: 768px) {
      width: 270px;
    }
  `,
  CafeInformaiton: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 80vw;
    @media screen and (min-width: 768px) {
      width: 250px;
    }
  `,
  CafeTitleBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 220px;
    @media screen and (min-width: 768px) {
      width: 250px;
    }
  `,
  CafeTitle: styled.div`
    width: 220px;
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  CafeRating: styled.div`
    display: flex;
    width: 50px;
    font-size: ${FONT_SIZE_1.normal_1};
  `,
  CafeAddressBox: styled.div`
    width: 220px;
    font-size: 10px;
    @media screen and (min-width: 768px) {
      width: 250px;
    }
  `,
  CafeTagBox: styled.div`
    display: flex;
    justify-content: space-between;
    width: 60vw;
    @media screen and (min-width: 500px) {
      width: 270px;
    }
  `,
  CafeTag: styled.div`
    text-align: center;
    width: 70px;
    border: solid 1px black;
    border-radius: 10px;
    font-size: 10px;
  `,
};

const BookmarkCafe = (props: { data: ListType }) => {
  const { data } = props;
  return (
    <Link to={`/cafes/${data?.cafeId}`}>
      <S.CafeContainer>
        <S.CafeImgBox src={data?.image ?? ""} />
        <S.CafeInformaiton>
          <S.CafeTitleBox>
            <S.CafeTitle>{data?.cafeName ?? ""}</S.CafeTitle>
            <S.CafeRating>
              {data?.rating ?? 0}
              <BiSolidCoffeeBean size='18' />
            </S.CafeRating>
          </S.CafeTitleBox>
          <S.CafeAddressBox>{data?.address ?? ""}</S.CafeAddressBox>
        </S.CafeInformaiton>
      </S.CafeContainer>
    </Link>
  );
};

export default BookmarkCafe;
