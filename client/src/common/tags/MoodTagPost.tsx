import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type MoodTagProps = {
  text: string;
  id: string;
}

const MoodTagPost = ({text, id}:MoodTagProps) => {

  return (
    <S.MoodTag id={id}>
      {text}
    </S.MoodTag>
    
  )
}

const S= {
  MoodTag:styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding: 0px 8px 0 8px;
    height: 30px;
    border: 1px solid ${COLOR_1.brown};
    border-radius: 12px;
    box-shadow: 0px 2px 3px ${COLOR_1.white}, 0px 4px 4px ${COLOR_1.brown};
    background-color: rgba(255, 255, 255, 0.1);
    font-size: ${FONT_SIZE_1.normal_2};
    color: ${COLOR_1.brown};
  `
}

export default MoodTagPost;