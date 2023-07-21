import axios from "axios";
import { useEffect, useState } from "react";
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
  { name: "논커피", value: "non_Coffee", menuType: "NON_COFFEE" },
  { name: "디저트", value: "dessert", menuType: "DESSERT" },
];
type MenuItem = {
  menuId: number;
  name: string;
  price: number;
  menuType: string;
};
type UpdatedDefaultValues = {
  signature: MenuItem[];
  coffee: MenuItem[];
  non_Coffee: MenuItem[];
  dessert: MenuItem[];
};

// type UpdatedDefaultValues = MenuItem[][];

const defaultValues = {};

const EditMenuCafe = () => {
  //methods에 useForm 리턴값을 넣어줌

  const navigate = useNavigate();
  const { id } = useParams();
  const methods = useForm<FormData>({
    defaultValues,
    mode: "onBlur",
  });
  // const { handleSubmit } = methods;
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `${baseURL}/menus/${menuId}`
          `${baseURL}/menus/${id}/edit`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              // 'Content-Type': 'application/json',
              withCredentials: true,
              Authorization: localStorage.getItem("access_token"),
            },
          }
        );
        const fetchedData = response.data.payload;
        // setCafedata({
        //   signature: fetchedData.filter(
        //     (item: any) => item.menuType === "SIGNATURE"
        //   ),
        //   coffee: fetchedData.filter((item: any) => item.menuType === "COFFEE"),
        //   non_Coffee: fetchedData.filter(
        //     (item: any) => item.menuType === "NON_COFFEE"
        //   ),
        //   dessert: fetchedData.filter(
        //     (item: any) => item.menuType === "DESSERT"
        //   ),
        // });
        setMenuData(fetchedData);
        console.log(response.data.payload);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (menuData.length > 0) {
      // 새로운 defaultValues를 생성
      const updatedDefaultValues: UpdatedDefaultValues = {
        signature: [],
        coffee: [],
        non_Coffee: [],
        dessert: [],
      };

      // 원하는 형태로 defaultValues 설정
      menuData.forEach((itemArray: MenuItem[]) => {
        itemArray.forEach((item: MenuItem) => {
          if (item.menuType === "SIGNATURE") {
            updatedDefaultValues.signature.push(item);
          } else if (item.menuType === "COFFEE") {
            updatedDefaultValues.coffee.push(item);
          } else if (item.menuType === "NON_COFFEE") {
            updatedDefaultValues.non_Coffee.push(item);
          } else if (item.menuType === "DESSERT") {
            updatedDefaultValues.dessert.push(item);
          }
        });
      });

      // methods.reset()을 사용하여 defaultValues를 갱신
      methods.reset(updatedDefaultValues);
      console.log(updatedDefaultValues);
    }
  }, [menuData]);

  return (
    <S.Container>
      <FormProvider {...methods}>
        <S.MenuTitle>Menu</S.MenuTitle>
        {menus.map((item, index) => (
          <EditMenuForm key={index} type={item.value} name={item.name} />
        ))}
        <S.ButtonDiv>
          {/* <Button
            text='메뉴등록'
            type={"button"}
            onClick={() => handleSubmit(Onsubmit)()}
            theme='Confirm'
          /> */}

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
