import { useFieldArray, useFormContext } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
import { FONT_SIZE_2 } from "../../common/common";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { baseURL } from "../../common/baseURL";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

export type FormValues = {
  menu: {
    menuId?: number;
    name: string;
    price: number;
    menuType: string;
  }[];
};

/* useFormContext -> 자식 컴포넌트에서 부모컴포넌트 값을 사용할 수 있음 */
/* type = signature , name = '시그니처' */
function EditMenuForm({ type, name }: { type: string; name: string }) {
  const { id } = useParams();
  const {
    control,
    register,
    setValue,
    getValues,
    // formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: type,
    control,
  });
  const onUpdateMenu = async (menuId: number) => {
    try {
      const copiedMenu = getValues();
      console.log(copiedMenu);
      const response = await axios.patch(
        `${baseURL}/menus/${menuId}`,
        copiedMenu,
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
      console.log(menuId);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onDeleteMenu = async (menuId: any) => {
    try {
      const response = await axios.delete(`${baseURL}/menus/${menuId}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          // 'Content-Type': 'application/json',
          withCredentials: true,
          Authorization: localStorage.getItem("access_token"),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onAddMenu = async (menu: any) => {
    try {
      const response = await axios.post(`${baseURL}/menus/${id}`, menu);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <S.MainDiv>
        <S.CafeTypeName>{name}</S.CafeTypeName>

        {/* <form> */}
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <S.FormDiv>
                메뉴
                <S.MenuInput
                  placeholder='메뉴이름'
                  {...register(`${type}.${index}.name` as const, {
                    // `name. ~~ 로 작성되어있던거 ${type} 수정하니 defaultValues 잘 나옴
                    required: true,
                  })}
                  // className={errors?.menu?.[index]?.name ? 'error' : ''}
                  onChange={(e: any) => {
                    // 입력한 값을 변경하고 싶은 경우 setValue를 사용한다
                    setValue(`${type}.${index}.name`, e.target.value);
                  }}
                />
                가격
                <S.MenuInput
                  placeholder='메뉴가격'
                  type='number'
                  {...register(`${type}.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  onChange={(e: any) => {
                    // 입력한 값을 변경하고 싶은 경우 setValue를 사용한다
                    setValue(`${type}.${index}.price`, e.target.value);
                  }}
                  // className={errors?.menu?.[index]?.price ? 'error' : ''}
                />
                {getValues(`${type}[${index}].menuId`) !== undefined ? (
                  <>
                    <S.EditBtn
                      type='button'
                      onClick={() =>
                        onUpdateMenu(getValues(`${type}[${index}].menuId`))
                      }
                      // fields[index].menuId 였는데 저걸로 바꿨음 내일 아침에 서버켜지면 해보기
                    />
                    <S.RemoveBtn
                      type='button'
                      onClick={() => {
                        remove(index);
                        onDeleteMenu(getValues(`${type}[${index}].menuId`));
                      }}
                    />
                  </>
                ) : (
                  <>
                    <S.AddBtn
                      type='button'
                      onClick={() => onAddMenu(fields[index])}
                    />
                    <S.RemoveBtn
                      type='button'
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  </>
                )}
              </S.FormDiv>
            </div>
          );
        })}
        {/* </form> */}
        <S.BtnDiv>
          <S.AppendBtn
            type='button'
            onClick={() =>
              append({
                name: "",
                price: 0,
                menuType: type.toUpperCase(),
              })
            }
          ></S.AppendBtn>
        </S.BtnDiv>
      </S.MainDiv>
    </div>
  );
}
const S = {
  MainDiv: styled.div`
    border: 2px solid ${COLOR_1.brown};
    border-radius: 0;
    padding: 2%;
    margin: 1%;
  `,
  CafeTypeName: styled.div`
    display: inline-block;
    padding: 0% 3%;
    border-radius: 15px;
    background-color: ${COLOR_1.light_green};
    font-size: ${FONT_SIZE_1.normal_2};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_1};
    }
  `,
  FormDiv: styled.div`
    padding: 1%;
    font-size: ${FONT_SIZE_1.normal_1};
    border-bottom: 2px dotted ${COLOR_1.green};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_2.normal_2};
    }
  `,
  MenuInput: styled.input`
    width: 150px;
    height: 30px;
    margin: 1%;
    outline: none;
    border: 2px solid ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_1.normal_1};
    &:hover {
      outline: auto;
      outline-color: ${COLOR_1.dark_sand};
    }
    @media screen and (max-width: 767px) {
      width: 30%;
      font-size: ${FONT_SIZE_2.normal_1};
    }
  `,
  RemoveBtn: styled(FaSquareMinus)`
    width: 20px;
    height: 20px;
    color: red;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 15px;
      height: 15px;
    }
  `,
  AppendBtn: styled(FaSquarePlus)`
    width: 20px;
    height: 20px;
    color: green;
    padding: 1%;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 15px;
      height: 15px;
    }
  `,
  EditBtn: styled(FiEdit)`
    width: 20px;
    height: 20px;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 15px;
      height: 15px;
    }
  `,
  AddBtn: styled(BsPlusCircleFill)`
    width: 20px;
    height: 20px;
    color: orange;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 15px;
      height: 15px;
    }
  `,
  BtnDiv: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
export default EditMenuForm;
