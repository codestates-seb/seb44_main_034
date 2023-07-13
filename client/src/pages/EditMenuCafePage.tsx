import axios from 'axios';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import { FONT_SIZE_2 } from '../common/common';
import { ConfirmBtn, CancelButton } from '../common/button/button';
import { FormProvider, useForm } from 'react-hook-form';
import EditMenuForm from '../components/cafe/EditMenuForm';
import { FormData } from './AddCafeMenuPage';

const menus = [
  { name: '시그니처', value: 'signature', menuType: 'SIGNATURE' },
  { name: '커피', value: 'coffee', menuType: 'COFFEE' },
  { name: '논커피', value: 'nonCoffee', menuType: 'NONCOFFEE' },
  { name: '디저트', value: 'desert', menuType: 'DESERT' },
];

const defaultValues = {};
const convertedData: FormData = {
  signature: [],
  coffee: [],
  nonCoffee: [],
  desert: [],
};
//cafeid를 받아서 불러야됨
const cafeId = 1;
const EditMenuCafe = () => {
  //methods에 useForm 리턴값을 넣어줌
  const methods = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/menus/${cafeId}`
        );
        const fetchedData = response.data;
        fetchedData.forEach((item: any, index: number) => {
          const menuId = index; // menuId 할당
          item.menuId = menuId; // 각 데이터 항목에 menuId 속성 추가
          if (item.menuType === 'SIGNATURE') {
            convertedData.signature.push(item);
          } else if (item.menuType === 'COFFEE') {
            convertedData.coffee.push(item);
          } else if (item.menuType === 'NONCOFFEE') {
            convertedData.nonCoffee.push(item);
          } else if (item.menuType === 'DESERT') {
            convertedData.desert.push(item);
          }
        });
        // 데이터를 가져와서 defaultValues에 할당
        console.log(convertedData);
        methods.reset(convertedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const Onsubmit = async (data: FormData) => {
    const mergedMenus = Object.values(data).flat();

    try {
      const response = await axios.post(
        `http://localhost:3001/menus/`,
        mergedMenus
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
          <EditMenuForm key={index} type={item.value} name={item.name} />
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
export default EditMenuCafe;
