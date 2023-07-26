import { styled } from "styled-components";
import { FONT_SIZE_1, FONT_SIZE_2, FONT_WEIGHT } from "../../common/common";

type PostDateProps = {
  postDate: string;
};

const S = {
  Date: styled.span`
    color: rgba(108, 87, 78, 0.8);
    font-size: ${FONT_SIZE_1.normal_1};
    font-weight: ${FONT_WEIGHT.weight_200};
    @media screen and (max-width: 767px) {
      display: block;
      font-size: ${FONT_SIZE_2.normal_2};
    }
  `,
};

const PostDate = ({ postDate }: PostDateProps) => {
  // console.log(postDate);
  // const dateValue = new Date(postDate);
  const dateValue = new Date(postDate);
  const timeDifferenceHours = 9;
  // const currentDate = new Date();
  const modifiedDate = new Date(
    dateValue.getTime() + timeDifferenceHours * 60 * 60 * 1000
  );
  const year = modifiedDate.getFullYear();
  const month =
    modifiedDate.getMonth() < 9
      ? `0${modifiedDate.getMonth() + 1}`
      : modifiedDate.getMonth() + 1;
  const date =
    modifiedDate.getDate() < 10
      ? `0${modifiedDate.getDate()}`
      : modifiedDate.getDate();
  const hours =
    modifiedDate.getHours() < 10
      ? `0${modifiedDate.getHours()}`
      : modifiedDate.getHours();
  const minutes =
    modifiedDate.getMinutes() < 10
      ? `0${modifiedDate.getMinutes()}`
      : modifiedDate.getMinutes();
  // console.log(modifiedDate);
  // console.log(date);
  // console.log(dateValue.getMonth());
  // console.log(hours);
  // console.log(minutes);
  return (
    <S.Date>
      {year}. {month}. {date}. {hours} : {minutes}
    </S.Date>
  );
};
export default PostDate;
