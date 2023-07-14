import styled from 'styled-components';
import EditCafeInfo from '../components/cafe/EditCafeInfo';
const EditInfomationCafe = () => {
  return (
    <S.Container>
      <EditCafeInfo />
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
export default EditInfomationCafe;
