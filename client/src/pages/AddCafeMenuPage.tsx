import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CafeMenuForm from '../components/cafe/CafeMenuForm';
import { styled } from 'styled-components';
import { FONT_SIZE_2 } from '../common/common';
import Button from '../common/button/button';
import { FormProvider, useForm } from 'react-hook-form';
import { baseURL } from '../common/baseURL';

export type FormData = {
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
  non_Coffee: {
    name: string;
    price: number;
    menuType: string;
  }[];
  dessert: {
    name: string;
    price: number;
    menuType: string;
  }[];
};

const menus = [
  { name: '시그니처', value: 'signature', menuType: 'SIGNATURE' },
  { name: '커피', value: 'coffee', menuType: 'COFFEE' },
  { name: '논커피', value: 'non_Coffee', menuType: 'NON_COFFEE' },
  { name: '디저트', value: 'dessert', menuType: 'DESSERT' },
];

const defaultValues = {
  signature: [
    { name: '아이스 아메리카노', price: 5000, menuType: 'SIGNATURE' },
  ],
  coffee: [{ name: '아이스 아메리카노', price: 5000, menuType: 'COFFEE' }],
  non_Coffee: [{ name: '아이스티', price: 5500, menuType: 'NON_COFFEE' }],
  dessert: [{ name: '빵', price: 10000, menuType: 'DESSERT' }],
};
const AddCafeMenuPage = () => {
  //methods에 useForm 리턴값을 넣어줌
  const { id } = useParams();
  const navigate = useNavigate();
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
  // const cafeId = 1; ${cafeId}

  const Onsubmit = async (data: FormData) => {
    const mergedArray = Object.values(data).flat();

    console.log(mergedArray);
    try {
      const response = await axios.post(`${baseURL}/menus/${id}`, mergedArray, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          // 'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token'),
        },
      });

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
          <Button
            text='메뉴 등록'
            onClick={() => handleSubmit(Onsubmit)()}
            theme='Confirm'
          />

          <Button
            text='나가기'
            onClick={() => {
              navigate('/ownermy/');
            }}
            theme='Cancel'
          />
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
};
export default AddCafeMenuPage;
