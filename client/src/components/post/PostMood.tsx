import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import MoodTag from '../../common/tags/MoodTag';
import { tagName } from '../../common/tagName';
import { PostItemAtom } from '../../recoil/postState';
import { PostData } from '../../types/type';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';

const S ={
  MoodAskWrap:styled.div`
  text-align: left;  
`,
MoodAsk:styled.span`
  color: ${COLOR_1.black};
  font-size: ${FONT_SIZE_1.normal_2};
`,
MoodWrap:styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  flex-wrap:wrap;
`,
TagWrap:styled.div`
  margin: 8px 4px;
`,
}

const PostMood = () => {
  const [tag, setTag] = useState<string[]>([]);
  // const [tagCount, setTagCount] = useState(0);

  const [postData, setPostData] = useRecoilState<PostData>(PostItemAtom);

  const saveTag = () => {
    setPostData((current)=>({...current, tag:tag})); //리코일: PostItemAtom에 선택된 태그 담기
    //삭제
    setTag(tag)
  }
  const onClickEvent = (e:any):void => {
    // if (e.target.checked && tagCount >= 3) {
    //   e.preventDefault();
    //   alert('태그를 3개 이하로 선택하세요!');
    //   return;
    // }
    // if (e.target.checked && tagCount<3) {
    //   setTagCount((prev)=>prev+1); //선택한 태그 갯수
    //   setTag((prev)=>[...prev, e.target.value]); //선택한 태그

    // } else { //선택한 태그를 클릭하여 선택 해제 될 때
    //   setTagCount((prev)=>prev-1); //선택한 태그 갯수-1
    //   setTag(tag.filter(el=>el !== e.target.value)); //선택한 태그-선택해제한 태그
    // }
    console.log(e.target.textContent);
  }

  useEffect(() => {
    saveTag();
  }, [tag]);
  console.log(tag);
  console.log(postData);
  return(
    <>
    <S.MoodAskWrap>
    <S.MoodAsk>
      카페 분위기는 어떠셨나요?
    </S.MoodAsk>
    </S.MoodAskWrap>
    <S.MoodWrap>
    {tagName.map((el, id)=>(<S.TagWrap key={id}><MoodTag text={el} onClickEvent={onClickEvent}></MoodTag></S.TagWrap>))}
    </S.MoodWrap>
    </>
  )
 }

export default PostMood;