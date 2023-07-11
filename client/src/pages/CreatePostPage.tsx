import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../common/common';
import { BiSolidCoffeeBean } from 'react-icons/bi';
// import { CiCoffeeBean } from "react-icons/ci";
import Button, { ConfirmBtn } from '../common/button/button';
import PostHead from '../components/post/PostHead';
import PostMood from '../components/post/PostMood';

const CreatePostPage = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      // 파일 처리 로직을 여기에 추가하세요
      console.log(fileList);
    }
  };

  return (
    <S.Container>
      <form>
        <div>
          <PostHead cafeName='카페 이름' />
          <PostMood />
          <S.RatingWrap>
            <BiSolidCoffeeBean
              size={FONT_SIZE_1.big_5}
              color={COLOR_1.dark_brown}
            />
            <S.Rate
              type='number'
              max='5'
              min='1'
              onChange={(e: any) => {
                if (e.target.value > 5 || e.target.value < 1) {
                  alert('1 이상 5 이하의 숫자를 입력해주세요.');
                }
              }}
            />
            {/*<CiCoffeeBean size={FONT_SIZE_1.big_5} color={COLOR_1.dark_brown}/> */}
            {` / 5`}
          </S.RatingWrap>
          <S.AddImg
            id='file-upload'
            type='file'
            onChange={handleFileChange}
          ></S.AddImg>
          {/* <S.UploadBtn htmlFor="file-upload">사진 추가하기</S.UploadBtn> */}
          <S.TextInput type='text'></S.TextInput>
          <S.BtnWrap>
            <Button
              theme={'main'}
              onClick={()=>console.log(1)}
              text={'출간하기'}
            />
            <ConfirmBtn
              type={'button'}
              onClick={() => {
                confirm(
                  '지금 나가시면 작성된 내용은 저장이 안 됩니다. 정말로 나가시겠습니까?'
                );
              }}
            >
              나가기
            </ConfirmBtn>
          </S.BtnWrap>
        </div>
      </form>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    height: 1000px;
    margin: 10%;
    > form {
      height: 1000px;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 1000px;
      }
    }
  `,
  MoodAskWrap: styled.div`
    text-align: left;
  `,
  MoodAsk: styled.span`
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  MoodWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  TagWrap: styled.div`
    margin: 8px 4px;
  `,
  RatingWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: ${FONT_SIZE_1.big_2};
  `,
  Rate: styled.input`
    margin: 0 10px;
    text-align: center;
    width: 50px;
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.big_2};
    border: 1px solid grey;
    &:focus {
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
  AddImg: styled.input``,
  TextInput: styled.input`
    height: 300px;
  `,
  BtnWrap: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
};

export default CreatePostPage;
