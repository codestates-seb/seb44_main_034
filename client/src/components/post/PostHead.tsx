import { useSetRecoilState } from 'recoil';
import { PostItemAtom } from '../../recoil/postState';
import { ReqPostData } from '../../types/type';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_2, FONT_WEIGHT } from '../../common/common';

type AddPostProps = {
  cafeName?: string;
};

const S ={
  CafeNameWrap:styled.div`
  text-align: left;
  `,
  CafeName:styled.span`
  text-align: left;
  color: ${COLOR_1.black};
  font-size: ${FONT_SIZE_2.normal_3};
  `,
  TitleWrap:styled.div`
  border-bottom: 1px solid ${COLOR_1.black};
  `,
  Title:styled.input`
  text-align: left;
  width:95%;
  color: ${COLOR_1.black};
  font-size: ${FONT_SIZE_2.big_3};
  border: none;
  font-weight: ${FONT_WEIGHT.weight_400};
  &:focus{
    outline: none;
  }
  @media screen and (max-width: 500px) {
    font-size: ${FONT_SIZE_2.normal_4};
  }
  `
}

const PostHead = ({cafeName}:AddPostProps) => {
  const setPostData = useSetRecoilState<ReqPostData>(PostItemAtom);

  const handleTitle =(event:any) => {
    let title:string = event?.target.value;
    title.length>30? alert('제목은 30자 이하로 적어주세요.'): null;

    setPostData((current)=>({...current, title:title})) //리코일: PostItemAtom에 변경된 제목 담기
  }
  return(
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

export default PostHead;
