import CafeMenuForm from '../components/cafe/CafeMenuForm';
import { styled } from 'styled-components';
import { COLOR_1 } from '../common/common';
import { FONT_SIZE_2 } from '../common/common';
const AddCafeMenuPage = () => {
  const types = [
    { name: '시그니처' },
    { name: '커피' },
    { name: '논커피' },
    { name: '디저트' },
  ];
  return (
    <S.Container>
      <S.MenuTitle>Menu</S.MenuTitle>
      {types.map((item) => (
        <CafeMenuForm type={item.name} />
      ))}
    </S.Container>
  );
};
const S = {
  Container: styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
  `,
  MenuTitle: styled.div`
    font-size: ${FONT_SIZE_2.big_2};
    padding: 2%;
  `,
};
export default AddCafeMenuPage;
