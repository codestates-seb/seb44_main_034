import { useRecoilState } from 'recoil';
import MoodTag from '../../common/tags/MoodTag';
import { MoodTagNames } from '../../common/tagNames';
import { PostItemAtom } from '../../recoil/postState';
import { ReqPostData } from '../../types/type';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';

const S = {
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
  // const [tag, setTag] = useState<string[]>([]);
  // const [tagCount, setTagCount] = useState(0);

  const [postData, setPostData] = useRecoilState<ReqPostData>(PostItemAtom);

  // const saveTag = () => {
  //   setPostData((current) => ({...current, tags:tag})); //리코일: PostItemAtom에 선택된 태그 담기

  // }
  const onClickEvent = (tagName:string):void => {

    console.log(tagName);
    const tags = postData?.tags ?? [];
    const findTag = tags.find((el) => el === tagName);
    const filterTag = tags.filter((el) => el !== tagName);

    if (findTag) {
      setPostData((prevState) => ({ ...prevState, tags: [...filterTag]}))
    }
    if (tags.length >= 3) {
      alert('태그는 3개까지만 선택해주세요.');
      return;
    }
    if (!findTag) {
      setPostData((prevState) => ({ ...prevState, tags: [...tags, tagName]}))
    }
  }

  // useEffect(() => {
  //   saveTag();
  // }, [tag]);
  // console.log(tag);
  console.log(postData);
  return(
    <>
      <S.MoodAskWrap>
      <S.MoodAsk>
        카페 분위기는 어떠셨나요?
      </S.MoodAsk>
      </S.MoodAskWrap>
      <S.MoodWrap>
      {MoodTagNames.map((el, id)=>(<S.TagWrap key={id}><MoodTag text={el} id={id} onClickEvent={onClickEvent} selected={postData.tags.find(ele=>ele===el)}></MoodTag></S.TagWrap>))}
      </S.MoodWrap>
    </>
  )
 }

export default PostMood;