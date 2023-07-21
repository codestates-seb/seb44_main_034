import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from "styled-components";

type MoodTagProps = {
  text: string;
  id: string;
};

const MoodTagClicked = ({ text, id }: MoodTagProps) => {
  return <S.MoodTag id={id}>{text}</S.MoodTag>;
};

const S = {
  MoodTag: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px 0 8px;
    height: 30px;
    background-color: ${COLOR_1.light_green};
    font-size: ${FONT_SIZE_1.normal_2};
    color: ${COLOR_1.brown};
    border: 1px solid ${COLOR_1.brown};
    border-radius: 12px;
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
  `,
};

export default MoodTagClicked;
