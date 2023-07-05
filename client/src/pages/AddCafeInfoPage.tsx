import styled from 'styled-components';
import CafeInfo from '../components/cafe/CafeInfo';
import { ConfirmBtn } from '../common/button/button';
const AddCafeInfoPage = () => {
  return (
    <S.Container>
      <CafeInfo />
      <S.ButtonDiv>
        <ConfirmBtn>확인</ConfirmBtn>
        <ConfirmBtn>나가기</ConfirmBtn>
      </S.ButtonDiv>
    </S.Container>
  );
};
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ButtonDiv: styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2%;

    @media screen and (max-width: 500px) {
      justify-content: center;
    }
  `,
};
export default AddCafeInfoPage;
