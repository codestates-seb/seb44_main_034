import { COLOR_1 } from "../common";
import styled from 'styled-components';

type FacilitiesTagProps = {
  text: string;
}

const FacilitiesTag = ({text}:FacilitiesTagProps) => {

  return (
  <S.FacilitiesTag>
    {text}
  </S.FacilitiesTag>
  )
}

const S = {
  FacilitiesTag: styled.button`
    background-color: ${COLOR_1.white};
    color: ${COLOR_1.brown};
    height: 30px;
    padding: 6px 8px;
    border: 1px solid ${COLOR_1.black};
    border-radius: 12px;
    box-shadow: 0px 5px 6px ${COLOR_1.brown};
  `

}

export default FacilitiesTag;