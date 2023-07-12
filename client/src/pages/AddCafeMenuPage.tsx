import axios from 'axios';
import CafeMenuForm from '../components/cafe/CafeMenuForm';
import { styled } from 'styled-components';
import { FONT_SIZE_2 } from '../common/common';
import { ConfirmBtn, CancelButton } from '../common/button/button';
import { FormProvider, useForm } from 'react-hook-form';

type FormData = {
  signature: {
    name: string;
    price: number;
    menuType: string;
  }[];
  coffee: {
    name: string;
    price: number;
    menuType: string;
  }[];
  noCoffee: {
    name: string;
    price: number;
    menuType: string;
  }[];
  desert: {
    name: string;
    price: number;
    menuType: string;
  }[];
};

const menus = [
  { name: '시그니처', value: 'signature', menuType: 'SIGNATURE' },
  { name: '커피', value: 'coffee', menuType: 'COFFEE' },
  { name: '논커피', value: 'nonCoffee', menuType: 'NONCOFFEE' },
  { name: '디저트', value: 'desert', menuType: 'DESERT' },
];

const defaultValues = {
  signature: [
    { name: '아이스 아메리카노', price: 5000, menuType: 'SIGNATURE' },
  ],
  coffee: [{ name: '아이스 아메리카노', price: 5000, menuType: 'COFFEE' }],
  nonCoffee: [{ name: '아이스티', price: 5500, menuType: 'NONCOFFEE' }],
  desert: [{ name: '빵', price: 10000, menuType: 'DESERT' }],
};
const AddCafeMenuPage = () => {
  //methods에 useForm 리턴값을 넣어줌
  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
  });
  const { handleSubmit } = methods;

  // const onSubmit = async () => {
  //   // async request which may result error
  //   try {
  //     // await fetch()
  //   } catch (e) {
  //     // handle your error
  //   }
  // }

  const Onsubmit = async (data: FormData) => {
    const mergedArray = Object.values(data).flat();

    console.log(mergedArray);
    try {
      const response = await axios.post(
        'http://localhost:3001/menu',
        mergedArray
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <S.Container>
      <FormProvider {...methods}>
        <S.MenuTitle>Menu</S.MenuTitle>
        {menus.map((item, index) => (
          <CafeMenuForm key={index} type={item.value} name={item.name} />
        ))}
        <S.ButtonDiv>
          <S.Submitbut type={'button'} onClick={() => handleSubmit(Onsubmit)()}>
            메뉴등록
          </S.Submitbut>

          <CancelButton>나가기</CancelButton>
        </S.ButtonDiv>
      </FormProvider>
    </S.Container>
  );
};
const S = {
  Container: styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
    @media screen and (max-width: 767px) {
      justify-content: center;
      width: 80%;
    }
  `,
  MenuTitle: styled.div`
    text-align: center;
    font-size: ${FONT_SIZE_2.big_2};
    padding: 2%;
  `,
  ButtonDiv: styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2%;

    @media screen and (max-width: 767px) {
      justify-content: center;
    }
  `,
  Submitbut: styled(ConfirmBtn)`
    margin-bottom: 10%;
  `,
};
export default AddCafeMenuPage;
