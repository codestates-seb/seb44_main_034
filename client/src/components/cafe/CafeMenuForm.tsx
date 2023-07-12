import { useFieldArray, useFormContext } from 'react-hook-form';
import { styled } from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';
import { FONT_SIZE_2 } from '../../common/common';
import { FaSquareMinus, FaSquarePlus } from 'react-icons/fa6';
export type FormValues = {
  menu: {
    name: string;
    price: number;
    menuType: string;
  }[];
};

/* useFormContext -> 자식 컴포넌트에서 부모컴포넌트 값을 사용할 수 있음 */
/* type = signature , name = '시그니처' */
function CafeMenuForm({ type, name }: { type: string; name: string }) {
  const {
    control,
    register,
    // formState: { errors },
  } = useFormContext();
  /* register는 먼가?
  register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })
  입력을 등록하거나 요소를 선택하고 유효성 검사 규칙을 React Hook Form에 적용할 수 있음
  name 은 등록되는 입력의 이름 ! -> 식별할 수 있는것임 
  현재 내가 사용하고 있는건 아래와같은 방식 
  register("name.firstName.0")	{name: { firstName: [ 'value' ] }}
  필드 배열을 생성하려면 입력 이름 뒤에 점과 숫자가 와야하기때문. 예를 들어:test.0.data
 
*/

  const { fields, append, remove } = useFieldArray({
    name: type,
    control,
  });

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
                />
                가격
                <S.MenuInput
                  placeholder='메뉴가격'
                  type='number'
                  {...register(`${type}.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  // className={errors?.menu?.[index]?.price ? 'error' : ''}
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

  BtnDiv: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
export default CafeMenuForm;
