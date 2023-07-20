import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type FacilitiesTagProps = {
  text: string;
  address: string;
  selected: string|undefined;
  onClickEvent: (text:string, key:string) => void;
}

const FacilitiesTag = ({text, address, onClickEvent, selected}:FacilitiesTagProps) => {
  const handleIsClicked = (text:string, address:string) => {
    onClickEvent(text, address);
  }
  return (
    <S.Tag className={selected? 'isClicked' : ''} onClick={()=>{handleIsClicked(text, address)}} >
      {text}
    </S.Tag>
  )
}

const S = {
  Tag: styled.div`
  padding: 6px 6px 2px 6px;
  height: 26px;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid ${COLOR_1.black};
  border-radius: 12px;
  box-shadow: 0px 4px 6px ${COLOR_1.brown};
  background-color: ${COLOR_1.white};
  font-size: ${FONT_SIZE_1.normal_1};
  color: ${COLOR_1.brown};
  @media screen and (max-width: 767px) {
    padding: 6px 6px 0 6px;
    height: 24px;
    font-size: ${FONT_SIZE_1.small_3};
  }
  &.isClicked {
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    box-shadow: 0px 5px 6px ${COLOR_1.dark_brown};
    @media screen and (max-width: 767px) {
      padding: 6px 6px 0 6px;
      height: 24px;
      font-size: ${FONT_SIZE_1.small_3};
    }
  }
  &:hover {
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    box-shadow: 0px 4px 6px ${COLOR_1.dark_brown};
  }
`  
}

export default FacilitiesTag;