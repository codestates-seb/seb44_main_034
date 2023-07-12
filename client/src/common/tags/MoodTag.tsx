import { useState } from "react";
import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type MoodTagProps = {
  text: string;
  onClickEvent: (e:any) => void;
}

const MoodTag = ({text, onClickEvent}:MoodTagProps) => {
const [isClicked, setIsClicked] = useState(false);
const isClickedd =((e:any) => {
  setIsClicked((prev)=>!prev);
  console.log(e);
  console.log(e.target);
  onClickEvent(e);
})
  return (
    <S.Tag className={isClicked? 'isClicked' : ''} onClick={(e:any)=>{isClickedd(e)}} >
    {text}
   </S.Tag>
  ) 
}

const S= {
  Tag:styled.div`
  padding: 6px 6px;
  height: 30px;
  cursor: pointer;
  border: 1px solid ${COLOR_1.brown};
  border-radius: 12px;
  box-shadow: 0px 2px 3px ${COLOR_1.white}, 0px 4px 4px ${COLOR_1.brown};
  background-color: rgba(255, 255, 255, 0.1);
  font-size: ${FONT_SIZE_1.normal_2};
  color: ${COLOR_1.brown};
  &.isClicked {
    background-color: ${COLOR_1.green};
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
  }
  &:focus {
    background-color: ${COLOR_1.green};
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
  }
  &:hover {
    background-color: ${COLOR_1.light_green};
  }
`,
}

export default MoodTag;