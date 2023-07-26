import styled from "styled-components";
import { COLOR_1, FONT_SIZE_1, FONT_WEIGHT } from "../common";

type PlusBtnProps = {
  text: string;
  handleClick: () => void;
};

const PlusButton = ({ text, handleClick }: PlusBtnProps) => {
  return (
    <S.PlusBtn
      onClick={() => {
        handleClick();
      }}
    >
      {text}
    </S.PlusBtn>
  );
};

const S = {
  PlusBtn: styled.button`
    background-color: ${COLOR_1.ivory};
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.big_4};
    font-weight: ${FONT_WEIGHT.weight_600};
    height: 44px;
    width: 44px;
    margin: 2px 2px 8px 16px;
    border: none;
    border-radius: 50%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 500px) {
      width: 40px;
      height: 40px;
      font-size: ${FONT_SIZE_1.big_2};
    }
  `,
};

export default PlusButton;
