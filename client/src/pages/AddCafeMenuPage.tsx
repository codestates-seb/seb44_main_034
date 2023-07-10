import CafeMenuForm from '../components/cafe/CafeMenuForm';
import { styled } from 'styled-components';
import { FONT_SIZE_2 } from '../common/common';
import { ConfirmBtn } from '../common/button/button';
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
      {types.map((item, index) => (
        <CafeMenuForm key={index} type={item.name} />
      ))}
      <S.ButtonDiv>
        <S.Submitbut>메뉴등록</S.Submitbut>
        <S.Submitbut>나가기</S.Submitbut>
      </S.ButtonDiv>
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
  ButtonDiv: styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2%;

    @media screen and (max-width: 500px) {
      justify-content: center;
    }
  `,
  Submitbut: styled(ConfirmBtn)`
    height: 2vw;
    margin-bottom: 10%;
  `,
};
export default AddCafeMenuPage;
