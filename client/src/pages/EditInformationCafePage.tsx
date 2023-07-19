import styled from 'styled-components';
import EditCafeInfo from '../components/cafe/EditCafeInfo';
import { useParams } from 'react-router-dom';
const EditInfomationCafe = () => {
  const { paramsCafeId } = useParams();
  const cafeId: string = paramsCafeId ?? '';
  return (
    <S.Container>
      <EditCafeInfo cafeId={cafeId} />
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
