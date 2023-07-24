import { styled } from "styled-components";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { CiCoffeeBean } from "react-icons/ci";

type StarRatingProps = {
  starRating: number;
  size?: string;
  color?: string;
};

const S = {
  Container: styled.div`
    display: inline-block;
    margin-top: 4px;
  `,
};

const StarRating = ({ starRating, size, color }: StarRatingProps) => {
  const rateFull = 5;
  const emptyRate = rateFull - starRating;
  const starRate = Array(starRating);
  const emptyBean = Array(emptyRate);

  return (
    <S.Container>
      {starRate.fill(<BiSolidCoffeeBean size={size} color={color} />)}
      {emptyBean.fill(<CiCoffeeBean size={size} color={color} />)}
    </S.Container>
  );
};

export default StarRating;
