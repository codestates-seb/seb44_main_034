import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_2, FONT_WEIGHT } from '../../common/common';

type AddPostProps = {
  cafeName: string;
};

const PostHead = ({ cafeName }: AddPostProps) => {
  const handleTitle = (event: any) => {
    console.log(event?.target.value);
    event.target.value.length > 30
      ? alert('제목은 30자 이하로 적어주세요.')
      : null;
  };
  return (
    <>
      <S.CafeNameWrap>
        <S.CafeName>{cafeName}</S.CafeName>
      </S.CafeNameWrap>
      <S.TitleWrap>
        <S.Title
          placeholder='제목을 입력해주세요.'
          onChange={(event: any) => {
            handleTitle(event);
          }}
        />
      </S.TitleWrap>
    </>
  );
};

const S = {
  CafeNameWrap: styled.div`
    text-align: left;
  `,
  CafeName: styled.span`
    text-align: left;
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_2.normal_3};
  `,
  TitleWrap: styled.div`
    border-bottom: 1px solid ${COLOR_1.black};
  `,
  Title: styled.input`
    text-align: left;
    width: 95%;
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_2.big_3};
    border: none;
    font-weight: ${FONT_WEIGHT.weight_400};
    &:focus {
      outline: none;
    }
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_2.normal_4};
    }
  `,
};

export default PostHead;
