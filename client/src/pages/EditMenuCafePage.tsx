import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { FONT_SIZE_2 } from "../common/common";
import Button from "../common/button/button";
import { FormProvider, useForm } from "react-hook-form";
import EditMenuForm from "../components/cafe/EditMenuForm";
import { FormData } from "./AddCafeMenuPage";
import { baseURL } from "../common/baseURL";
const menus = [
  { name: "시그니처", value: "signature", menuType: "SIGNATURE" },
  { name: "커피", value: "coffee", menuType: "COFFEE" },
  { name: "논커피", value: "nonCoffee", menuType: "NON_COFFEE" },
  { name: "디저트", value: "desert", menuType: "DESSERT" },
];

const defaultValues = {};
const convertedData: FormData = {
  signature: [],
  coffee: [],
  non_Coffee: [],
  dessert: [],
};
//cafeid를 받아서 불러야됨

const EditMenuCafe = () => {
  //methods에 useForm 리턴값을 넣어줌
  const navigate = useNavigate();
  const { cafeId } = useParams();
  const methods = useForm<FormData>({
    defaultValues,
    mode: "onBlur",
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `${baseURL}/menus/${menuId}`
          `${baseURL}/menus/${cafeId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              // 'Content-Type': 'application/json',
              withCredentials: true,
              Authorization: localStorage.getItem("access_token"),
            },
          } // edit 추가해야함
        );
        // const fetchedData = response.data;
        // fetchedData.forEach((item: any, index: number) => {
        //   const menuId = index; // menuId 할당
        //   item.menuId = menuId; // 각 데이터 항목에 menuId 속성 추가
        //   if (item.menuType === 'SIGNATURE') {
        //     convertedData.signature.push(item);
        //   } else if (item.menuType === 'COFFEE') {
        //     convertedData.coffee.push(item);
        //   } else if (item.menuType === 'NON_COFFEE') {
        //     convertedData.non_Coffee.push(item);
        //   } else if (item.menuType === 'DESSERT') {
        //     convertedData.dessert.push(item);
        //   }
        // });
        // 데이터를 가져와서 defaultValues에 할당
        // console.log(convertedData);
        console.log(response.data.payload);
        methods.reset(response.data.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  //확인 버튼이 사라지면 아래 함수도 사라질 예정
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
          <Button
            text='메뉴등록'
            type={"button"}
            onClick={() => handleSubmit(Onsubmit)()}
            theme='Confirm'
          />

          <Button
            text='나가기'
            onClick={() => {
              navigate("/ownermy");
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
export default EditMenuCafe;
