import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type MoodTagProps = {
  text: string;
  id: number;
  selected: string|undefined;
  onClickEvent: (text:string, id:number) => void;
}

const MoodTag = ({text, id, onClickEvent, selected}:MoodTagProps) => {
const handleIsClicked = (text:string, id:number) => {
  onClickEvent(text, id);
}
  return (
    <S.Tag className={selected? 'isClicked' : ''} onClick={()=>{handleIsClicked(text, id)}} >
    {text}
   </S.Tag>
  ) 
}

const S= {
  Tag:styled.div`
  padding: 6px 6px 2px 6px;
  height: 26px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid ${COLOR_1.brown};
  border-radius: 12px;
  box-shadow: 0px 2px 3px ${COLOR_1.white}, 0px 4px 4px ${COLOR_1.brown};
  background-color: ${COLOR_1.white};
  font-size: ${FONT_SIZE_1.normal_1};
  color: ${COLOR_1.brown};
  @media screen and (max-width: 767px) {
    padding: 6px 6px 0 6px;
    height: 24px;
    font-size: ${FONT_SIZE_1.small_3};
  }
  &.isClicked {
    background-color: ${COLOR_1.green};
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
    @media screen and (max-width: 767px) {
    padding: 6px 6px 0 6px;
    height: 24px;
    font-size: ${FONT_SIZE_1.small_3};
  }
  }
  &:hover {
    background-color: ${COLOR_1.light_green};
  }
`,
}

export default MoodTag;