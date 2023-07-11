import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type MoodTagProps = {
  text: string;
  id: string;
  handleEvent: (e:any)=> void;
}

const MoodTag = ({text, id, handleEvent}:MoodTagProps) => {

  return (
    <>
  <S.Input type='checkbox' id={id} name='mood' value={text} onClick={(e:any)=>{handleEvent(e)}} />
  <S.Label htmlFor={id}>
    {text}
  </S.Label>
    </>
  )
}

const S= {
  Input:styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin :-1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  &:checked + label {
    background-color: ${COLOR_1.light_green};
    color: ${COLOR_1.brown};
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
  }
  &:hover+ label {
    background-color: ${COLOR_1.light_green};
    color: ${COLOR_1.brown};
    box-shadow: 0px 4px 4px ${COLOR_1.brown};
  }
`,
  Label: styled.label`
  padding: 6px 8px;
  height: 30px;
  cursor: pointer;
  border: 1px solid ${COLOR_1.brown};
  border-radius: 12px;
  box-shadow: 0px 2px 3px ${COLOR_1.white}, 0px 4px 4px ${COLOR_1.brown};
  background-color: rgba(255, 255, 255, 0.1);
  font-size: ${FONT_SIZE_1.normal_2};
  color: ${COLOR_1.brown};
`
}

export default MoodTag;
