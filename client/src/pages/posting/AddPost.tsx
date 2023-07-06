import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2, FONT_WEIGHT } from '../../common/common';
import {data as dataAll} from '../../mockData/cafePost.json'
import { BiSolidCoffeeBean } from "react-icons/bi";
import { CiCoffeeBean } from "react-icons/ci";
import MoodTag from '../../common/tags/MoodTag';
import { tagName } from '../../common/tagName';
import { ConfirmBtn } from '../../common/button/button';

type AddPostProps = {
  cafeName: string;
}

const AddPost = ({cafeName}:AddPostProps) => {
  const [tag, setTag] = useState<string[]>([]);
  const [tagCount, setTagCount] = useState(0);
  const handleEvent = (e:any):void => {
    if (e.target.checked && tagCount >= 3) {
      e.preventDefault();
      alert('태그를 3개 이하로 선택하세요!');
      return;
    }
    if (e.target.checked && tagCount<3) {
      setTagCount((prev)=>prev+1);
      setTag((prev)=>[...prev, e.target.value]);
      console.log(e);
    } else {
      setTagCount((prev)=>prev-1);

      setTag(tag.filter(el=>el !== e.target.value));
    }
  }
  useEffect(() => {
    if (tagCount >= 4) {
      alert('태그를 3개 이하로 선택하세요!');
    }
  }, [tagCount]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      // 파일 처리 로직을 여기에 추가하세요
      console.log(fileList);
    }
  }
  const handleTitle =(event:any) => {
    console.log(event?.target.value);
    event.target.value.length>30? alert('제목은 30자 이하로 적어주세요.'): null;
  }

  const data= dataAll.post;
  return (
    <form>
      <S.Container>
      <S.CafeNameWrap>
        <S.CafeName>
          {cafeName}
        </S.CafeName>
      </S.CafeNameWrap>
      <S.TitleWrap>
        <S.Title placeholder='제목을 입력해주세요.' onChange={(event:any)=>{handleTitle(event)}} />
      </S.TitleWrap>
      <S.MoodAskWrap>
        <S.MoodAsk>
          카페 분위기는 어떠셨나요?
        </S.MoodAsk>
      </S.MoodAskWrap>
      <S.MoodWrap>
        {tagName.map((el, id)=>(<S.TagWrap key={id}><MoodTag text={el} id={id.toString()} handleEvent={handleEvent}></MoodTag></S.TagWrap>))}
      </S.MoodWrap>
      <S.RatingWrap>
      <BiSolidCoffeeBean size={FONT_SIZE_1.big_5} color={COLOR_1.dark_brown}/>
        <S.Rate type='number' max='5' min ='1'
        onChange={(e:any)=>{if (e.target.value>5||e.target.value<1) {
          alert('1 이상 5 이하의 숫자를 입력해주세요.')}}}/>
      {/*<CiCoffeeBean size={FONT_SIZE_1.big_5} color={COLOR_1.dark_brown}/> */}
      {` / 5`}
      </S.RatingWrap>
      <S.AddImg id="file-upload" type="file" onChange={handleFileChange}></S.AddImg>
      {/* <S.UploadBtn htmlFor="file-upload">사진 추가하기</S.UploadBtn> */}
      <S.TextInput type='text'></S.TextInput>
      <S.BtnWrap>
        <ConfirmBtn>출간하기</ConfirmBtn>
        <ConfirmBtn onClick={()=> {
          confirm('지금 나가시면 작성된 내용은 저장이 안 됩니다. 정말로 나가시겠습니까?');
        }}>나가기</ConfirmBtn>
      </S.BtnWrap>
      </S.Container>
    </form>

  )
}

const S={
  Container:styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 1000px;
    margin: 10%;
  `,
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
  `,
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
  RatingWrap:styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    font-size:${FONT_SIZE_1.big_2};
  `,
  Rate:styled.input`
    margin: 0 10px;
    text-align: center;
    width:50px;
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.big_2};
    border: 1px solid grey;
    &:focus{
      outline: none;
    }
  `,
  UploadBtn: styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  `,
  AddImg:styled.input`
  
  `,
  TextInput:styled.input`
  height: 300px;
  `,
  BtnWrap:styled.div`
    display:flex;
    justify-content:flex-start;
  `,
}

export default AddPost;