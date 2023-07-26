import { styled } from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
import { BiSolidParking } from "react-icons/bi";
import { Ri24HoursLine } from "react-icons/ri";
import { FaDog } from "react-icons/fa";
import { GiCupcake } from "react-icons/gi";
import { ImPowerCord } from "react-icons/im";
import { BiPhoneCall, BiSolidCoffeeBean } from "react-icons/bi";
import { CafeDetailType } from "../../types/type";

interface CafeDetailsInfoProps {
  cafeDetail: CafeDetailType;
}
const CafeDetailsInfo = ({ cafeDetail }: CafeDetailsInfoProps) => {
  return (
    <S.Container>
      <S.ImageDiv>
        <S.CafeImg src={`${cafeDetail.image}`} />
      </S.ImageDiv>
      <S.CafeInfoDiv>
        <S.CafeTitle>{cafeDetail.name}</S.CafeTitle>
        <S.ContectDiv>
          <S.Contect></S.Contect>
          <span>{cafeDetail.contact}</span>
          <S.RatingText>
            {cafeDetail.rating}
            <S.Rating />
          </S.RatingText>
        </S.ContectDiv>
        <S.ContentBase>
          OPEN:
          <span>{cafeDetail.openTime}</span>
        </S.ContentBase>
        <S.ContentBase>
          CLOSE:
          <span>{cafeDetail.closeTime}</span>
        </S.ContentBase>
        <S.ContentBase>
          주소:
          <span>{cafeDetail.address}</span>
        </S.ContentBase>
        <S.NoticeDiv>
          <div>공지사항</div>
          <div>{cafeDetail.notice}</div>
        </S.NoticeDiv>
        <S.FacilityDiv>
          <Parking istrue={cafeDetail.hasParking} />
          <AllTime istrue={cafeDetail.openAllTime ? true : false} />
          <Pet istrue={cafeDetail.petFriendly} />
          <Cake istrue={cafeDetail.hasDessert} />
          <PowerCord istrue={cafeDetail.chargingAvailable} />
        </S.FacilityDiv>
      </S.CafeInfoDiv>
    </S.Container>
  );
};
const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    margin-top: 2%;
    flex-direction: row;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
    }
  `,
  ImageDiv: styled.div`
    width: 380px;
    height: 300px;
    margin-right: 20px;
    border-radius: 10px;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 200px;
    }
  `,
  CafeImg: styled.img`
    width: 380px;
    height: 300px;
    object-fit: cover;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 200px;
    }
  `,
  CafeInfoDiv: styled.div`
    width: 380px;
    height: 300px;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 50%;
    }
  `,
  ContectDiv: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  CafeTitle: styled.div`
    font-size: ${FONT_SIZE_1.big_4};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.big_2};
    }
  `,
  Contect: styled(BiPhoneCall)`
    cursor: pointer;
    width: 40px;
    height: 40px;
    @media screen and (max-width: 767px) {
      width: 25px;
      height: 25px;
    }
    > span {
      font-size: ${FONT_SIZE_1.normal_1};
    }
  `,
  RatingText: styled.span`
    font-size: ${FONT_SIZE_1.big_4};
    color: ${COLOR_1.brown};
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.big_1};
    }
  `,
  Rating: styled(BiSolidCoffeeBean)`
    color: ${COLOR_1.brown};
    width: 40px;
    height: 40px;
    @media screen and (max-width: 767px) {
      width: 25px;
      height: 25px;
    }
  `,
  ContentBase: styled.div`
    margin: 1%;
    font-size: ${FONT_SIZE_1.normal_3};
    color: ${COLOR_1.dark_brown};
    > span {
      margin-left: 2%;
      color: ${COLOR_1.brown};
    }
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_2};
    }
  `,
  NoticeDiv: styled.div`
    margin: auto;
    width: 90%;
    border-radius: 10px;
    margin-bottom: 2%;
    padding: 2%;
    border: 2px solid ${COLOR_1.dark_sand};
    > div {
      text-align: center;
      font-size: ${FONT_SIZE_1.normal_1};
    }
    @media screen and (max-width: 767px) {
      > div {
        text-align: center;
        font-size: ${FONT_SIZE_1.small_1};
      }
    }
  `,
  FacilityDiv: styled.div`
    display: flex;
    justify-content: space-evenly;
  `,
};
const iconStyle = `
  width: 40px;
  height: 40px;
  
`;

const StyledIcon = styled.div<{ istrue: boolean }>`
  ${iconStyle}
  color: ${({ istrue }) => (istrue ? "black" : "gainsboro")};
`;

const Parking = styled(StyledIcon).attrs({ as: BiSolidParking })`
  @media screen and (max-width: 767px) {
    width: 25px;
    height: 25px;
  }
`;
const AllTime = styled(StyledIcon).attrs({ as: Ri24HoursLine })`
  @media screen and (max-width: 767px) {
    width: 25px;
    height: 25px;
  }
`;
const Pet = styled(StyledIcon).attrs({ as: FaDog })`
  @media screen and (max-width: 767px) {
    width: 25px;
    height: 25px;
  }
`;
const Cake = styled(StyledIcon).attrs({ as: GiCupcake })`
  @media screen and (max-width: 767px) {
    width: 25px;
    height: 25px;
  }
`;
const PowerCord = styled(StyledIcon).attrs({ as: ImPowerCord })`
  @media screen and (max-width: 767px) {
    width: 25px;
    height: 25px;
  }
`;
export default CafeDetailsInfo;
