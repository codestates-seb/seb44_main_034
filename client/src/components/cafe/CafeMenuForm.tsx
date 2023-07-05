import { useForm, useFieldArray } from 'react-hook-form';
import { styled } from 'styled-components';
import { COLOR_1 } from '../../common/common';
import { FONT_SIZE_2 } from '../../common/common';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/FI';
type FormValues = {
  menu: {
    name: string;
    price: number;
  }[];
};

function CafeMenuForm({ type }: { type: string }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      menu: [{ name: '아메리카노', price: 3000 }],
    },
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'menu',
    control,
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div>
      <S.MainDiv>
        <S.CafeTypeName>{type}</S.CafeTypeName>

        <form>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                {/* <section className={'section'} key={field.id}> */}
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
        </form>
        <S.AppendBtn
          type='button'
          onClick={() =>
            append({
              name: '',
              price: 0,
            })
          }
        >
          +
        </S.AppendBtn>
      </S.MainDiv>
      <input type='submit' onClick={handleSubmit(onSubmit)} />
      {/* // input 태그 하나만 만들기  */}
    </div>
  );
}
const S = {
  MainDiv: styled.div`
    border: 2px solid ${COLOR_1.brown};
    border-radius: 20px;
    padding: 2%;
  `,
  CafeTypeName: styled.div`
    display: inline-block;
    padding: 0% 3%;
    border-radius: 15px;
    background-color: ${COLOR_1.light_green};
    text-align: start;
    font-size: ${FONT_SIZE_2.normal_3};
  `,
  FormDiv: styled.div`
    padding: 1%;
    font-size: ${FONT_SIZE_2.normal_2};
    border-bottom: 2px dotted ${COLOR_1.green};
    display: flex;
    justify-content: start;
    align-items: center;
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
  `,
  RemoveBtn: styled(FiMinusSquare)`
    width: 3vw;
    height: 3vw;
    color: ${COLOR_1.brown};
    font-size: ${FONT_SIZE_2.normal_6};
    &:hover {
      color: ${COLOR_1.dark_sand};
      cursor: pointer;
    }
  `,
  AppendBtn: styled(FiPlusSquare)`
    width: 3vw;
    height: 3vw;
    color: ${COLOR_1.brown};
    font-size: ${FONT_SIZE_2.normal_6};
    padding: 1%;
    &:hover {
      color: ${COLOR_1.dark_sand};
      cursor: pointer;
    }
  `,
};
export default CafeMenuForm;
