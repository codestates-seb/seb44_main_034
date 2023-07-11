import CafeMenuForm, { FormValues } from "../components/cafe/CafeMenuForm";
import { styled } from 'styled-components';
import { FONT_SIZE_2 } from '../common/common';
import { ConfirmBtn } from '../common/button/button';
import { FormProvider, useForm } from "react-hook-form";

type FormData = {
  signature: {
    name: string;
    price: number;
    Mtype: string;
  }[];
  coffee: {
    name: string;
    price: number;
    Mtype: string;
  }[];
  noCoffee: {
    name: string;
    price: number;
    Mtype: string;
  }[];
  desert: {
    name: string;
    price: number;
    Mtype: string;
  }[];
}

const types = [
  { name: '시그니처', value: 'signature' },
  { name: '커피', value: 'coffee' },
  { name: '논커피', value: 'noCoffee' },
  { name: '디저트', value: 'desert' },
];

const defaultValues = {
  signature:[],
  coffee:[],
  noCoffee:[],
  desert:[]
}
const AddCafeMenuPage = () => {

  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
  });
  return (
    <S.Container>
      <FormProvider {...methods}>
      <S.MenuTitle>Menu</S.MenuTitle>
      {types.map((item, index) => (
        <CafeMenuForm key={index} type={item.value} />
      ))}
      <S.ButtonDiv>
        <ConfirmBtn>메뉴등록</ConfirmBtn>
        <ConfirmBtn>나가기</ConfirmBtn>
      </S.ButtonDiv>
      </FormProvider>
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
