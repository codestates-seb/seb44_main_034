import styled from 'styled-components';
import CafeInfo from '../components/cafe/CafeInfo';
const AddCafeInfoPage = () => {
  return (
    <S.Container>
      <CafeInfo />
    </S.Container>
  );
};
const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
export default AddCafeInfoPage;
