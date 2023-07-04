import { COLOR_1 } from "../common";
import styled from 'styled-components';

type FacilitiesTagClickedProps = {
  text: string;
}

const FacilitiesTagClicked = ({text}:FacilitiesTagClickedProps) => {

  return (
  <S.FacilitiesTagClicked>
    {text}
  </S.FacilitiesTagClicked>
  )
}

const S = {
  FacilitiesTagClicked: styled.button`
    background-color: ${COLOR_1.dark_brown};
    color: ${COLOR_1.white};
    height: 30px;
    padding: 6px 8px;
    border: 1px solid ${COLOR_1.black};
    border-radius: 12px;
    box-shadow: 0px 5px 6px ${COLOR_1.dark_brown};
  `

}

export default FacilitiesTagClicked;