import { COLOR_1 } from "../common";
import styled from 'styled-components';

type MoodTagProps = {
  text: string;
}

const MoodTag = ({text}:MoodTagProps) => {

  return (
  <S.MoodTag>
    {text}
  </S.MoodTag>
  )
}

const S = {
  MoodTag: styled.button`
    background-color: rgba(255, 255, 255, 0.1);
    color: ${COLOR_1.brown};
    height: 30px;
    padding: 6px 8px;
    border: 1px solid ${COLOR_1.brown};
    border-radius: 12px;
    box-shadow: 0px 2px 3px ${COLOR_1.white}, 0px 4px 4px ${COLOR_1.brown};
  `

}

export default MoodTag;