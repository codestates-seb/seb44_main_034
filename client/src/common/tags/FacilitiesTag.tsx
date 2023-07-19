import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type FacilitiesTagProps = {
  text: string;
  selected: string|undefined;
  onClickEvent: (text:string) => void;
}

const FacilitiesTag = ({text, onClickEvent, selected}:FacilitiesTagProps) => {
  const handleIsClicked = (text:string) => {
    onClickEvent(text);
  }
  return (
    <S.Tag className={selected? 'isClicked' : ''} onClick={()=>{handleIsClicked(text)}} >
      {text}
    </S.Tag>
  )
}

const S = {
  Tag: styled.div`
  padding: 6px 6px 2px 6px;
  height: 28px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid ${COLOR_1.black};
  border-radius: 12px;
  box-shadow: 0px 5px 6px ${COLOR_1.brown};
  background-color: ${COLOR_1.white};
  font-size: ${FONT_SIZE_1.normal_2};
  color: ${COLOR_1.brown};
  &.isClicked {
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    box-shadow: 0px 5px 6px ${COLOR_1.dark_brown};
  }
  &:hover {
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    box-shadow: 0px 5px 6px ${COLOR_1.dark_brown};
  }
`  
}

export default FacilitiesTag;