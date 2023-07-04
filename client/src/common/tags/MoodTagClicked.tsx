import { COLOR_1 } from "../common";
import styled from 'styled-components';

type MoodTagClickedProps = {
  text: string;
}

const MoodTagClicked = ({text}:MoodTagClickedProps) => {

  return (
  <S.MoodTagClicked>
    {text}
  </S.MoodTagClicked>
  )
}

const S = {
  MoodTagClicked: styled.button`
    background-color: ${COLOR_1.green};
    color: ${COLOR_1.brown};
    height: 30px;
    padding: 6px 8px;
    border: 1px solid ${COLOR_1.brown};
    border-radius: 12px;
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
  `

}

export default MoodTagClicked;