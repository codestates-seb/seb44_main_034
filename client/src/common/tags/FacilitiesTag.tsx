import { COLOR_1, FONT_SIZE_1 } from "../common";
import styled from 'styled-components';

type FacilitiesTagProps = {
  text: string;
  id: string;
}

const FacilitiesTag = ({text, id}:FacilitiesTagProps) => {

  return (
    <>
  <S.Input type='checkbox' id={id} name='facilities' value={text} />
  <S.Label htmlFor={id}>
    {text}
  </S.Label>
    </>
  )
}

const S = {
  Input: styled.input`
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
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    box-shadow: 0px 5px 6px ${COLOR_1.dark_brown};
  }
  &:hover+ label {
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    box-shadow: 0px 5px 6px ${COLOR_1.dark_brown};
  }
`,
Label: styled.label`
  padding: 6px 8px;
  height: 30px;
  cursor: pointer;
  border: 1px solid ${COLOR_1.black};
  border-radius: 12px;
  box-shadow: 0px 5px 6px ${COLOR_1.brown};
  background-color: ${COLOR_1.white};
  font-size: ${FONT_SIZE_1.normal_2};
  color: ${COLOR_1.brown};
`  
}

export default FacilitiesTag;