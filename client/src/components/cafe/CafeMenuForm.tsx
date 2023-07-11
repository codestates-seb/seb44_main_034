import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { styled } from 'styled-components';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_2 } from '../../common/common';
import { FaSquareMinus, FaSquarePlus } from 'react-icons/fa6';



export type FormValues = {
  menu: {
    name: string;
    price: number;
    Mtype: string;
  }[];
};


function CafeMenuForm({ type }: { type: string }) {
const {control} = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'signature',
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <S.MainDiv>
        <S.CafeTypeName>{type}</S.CafeTypeName>

        {/* <form> */}
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <S.FormDiv>
                메뉴
                <S.MenuInput
                  placeholder='메뉴이름'
                  {...register(`menu.${index}.name` as const, {
                    required: true,
                  })}
                  className={errors?.menu?.[index]?.name ? 'error' : ''}
                />
                가격
                <S.MenuInput
                  placeholder='메뉴가격'
                  type='number'
                  {...register(`menu.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.menu?.[index]?.price ? 'error' : ''}
                />
                <S.RemoveBtn
                  type='button'
                  onClick={() => remove(index)}
                ></S.RemoveBtn>
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
                name: '',
                price: 0,
                Mtype: type,
              })
            }
          ></S.AppendBtn>
          <S.SaveBtn type='submit' onClick={handleSubmit(onSubmit)}>
            저장
          </S.SaveBtn>
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
    font-size: ${FONT_SIZE_2.normal_3};
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_2.normal_2};
    }
  `,
  FormDiv: styled.div`
    padding: 1%;
    font-size: ${FONT_SIZE_2.normal_2};
    border-bottom: 2px dotted ${COLOR_1.green};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_2.normal_1};
    }
  `,
  MenuInput: styled.input`
    width: 15vw;
    height: 4vh;
    margin: 1%;
    outline: none;
    border: 2px solid ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_2};
    &:hover {
      outline: auto;
      outline-color: ${COLOR_1.dark_sand};
    }
    @media screen and (max-width: 500px) {
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
    @media screen and (max-width: 500px) {
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
    @media screen and (max-width: 500px) {
      width: 15px;
      height: 15px;
    }
  `,
  SaveBtn: styled.button`
    min-width: 40px;
    width: 5vw;
    height: 3vh;
    font-size: ${FONT_SIZE_2.small_1};
    border-radius: 15px;
    border: none;
    background-color: ${COLOR_1.sand};
    box-shadow: 2px 2px 4px ${COLOR_1.dark_brown};
    &:active {
      transform: translateY(2px);
    }
    &:hover {
      cursor: pointer;
      background-color: ${COLOR_1.brown};
      color: white;
    }
  `,
  BtnDiv: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
export default CafeMenuForm;
