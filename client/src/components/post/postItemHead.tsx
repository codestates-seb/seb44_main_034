import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2, FONT_WEIGHT } from '../../common/common';
import { PostData } from '../../types/type';
import PostDate from './postDate';
import { IoShareSocial } from "react-icons/io5";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

type PostItemProps = {
  postData: PostData;
}
const PostItemHead = ({postData}:PostItemProps) => {

  return(
    <>
      <S.CafeNameWrap>
        <S.CafeName>
          {postData.cafeName}
        </S.CafeName>
      </S.CafeNameWrap>
      <S.TitleWrap>
        <S.Title>
          {postData.title}
        </S.Title>
      </S.TitleWrap>
      <S.FlexDiv>
        <S.InfoWrap>
          <S.Autor>
            {postData.author}
          </S.Autor>
         </S.InfoWrap>
        <S.CircleWrap>
          <S.Circle>
          <IoShareSocial size='30' />
          </S.Circle>
          <S.Circle>
            {postData.isBookmarked?<GoBookmarkFill size='30' />:<GoBookmark size='30' />}
            {/* 북마크 로직 추가해야 함 */}
          </S.Circle>
        </S.CircleWrap>
      </S.FlexDiv>
      <S.FlexDiv>
        <S.DateWrap>
          <div>
          <PostDate postDate={postData.createdAt} />
          </div>
        </S.DateWrap>
        <S.EditWrap>
        <S.Edit>
          수정
        </S.Edit>
        <S.Edit>
          삭제
        </S.Edit>
      </S.EditWrap>
      </S.FlexDiv>
    </>
  )

}

const S ={
CafeNameWrap:styled.div`
text-align: left;
margin: 30px 5px 8px -5px;
@media screen and (max-width: 767px) {
  margin: 10px 5px 8px -5px;
}
`,
CafeName:styled.span`
text-align: left;
color: ${COLOR_1.dark_brown};
font-size: ${FONT_SIZE_2.normal_4};
cursor:pointer;
&:hover{
  color:${COLOR_1.brown};
}
@media screen and (max-width: 767px) {
  font-size: ${FONT_SIZE_2.normal_3};
  font-weight: ${FONT_WEIGHT.weight_300};
}
`,
TitleWrap:styled.div`
text-align: left;
`,
Title:styled.span`
width:95%;
color: ${COLOR_1.black};
font-size: ${FONT_SIZE_2.big_3};
font-weight: ${FONT_WEIGHT.weight_400};
@media screen and (max-width: 767px) {
  font-size: ${FONT_SIZE_2.normal_5};
  font-weight: ${FONT_WEIGHT.weight_300};
}
`,
FlexDiv:styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,
InfoWrap:styled.div`
  margin: 20px -5px 5px 0px;
  display:flex;
  justify-content: space-around;
  align-items:center;
`,
Autor:styled.span`
  margin: 0 14px;
  color:${COLOR_1.dark_brown};
  font-size:${FONT_SIZE_2.normal_4};
  @media screen and (max-width: 767px) {
    font-size:${FONT_SIZE_2.normal_3};
  }
  &:hover{
    color:${COLOR_1.brown};
    cursor: pointer;
  }
`,
CircleWrap:styled.div`
  display:flex;
`,
Circle:styled.div`
  margin: 0 5px 0 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  width: 40px;
  height: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`,
DateWrap:styled.div`
  display: flex;
  justify-content: flex;
  align-items: center;
  margin: 8px 14px;
  >div{
  display:block;
  }
`,
EditWrap:styled.div`
  color:grey;
  margin:0px 10px;
  display: flex;
  justify-content:flex-end;
  align-items:center;
`,
Edit:styled.span`
  color:rgba(108, 87, 78, 0.8);
  font-size:${FONT_SIZE_2.normal_2};
  margin-left: 18px;
  margin-right: 4px;
  text-align:center;
  &:hover{
    color:${COLOR_1.brown};
    cursor:pointer;
  }
  @media screen and (max-width: 767px) {
    text-align:center;
  }
`,
}

export default PostItemHead;