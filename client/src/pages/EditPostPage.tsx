import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useResetRecoilState } from 'recoil';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { PostItemAtom } from '../recoil/postState';
import { PostData } from '../types/type';
import { tagName } from '../common/tagName';
import MoodTag from '../common/tags/MoodTag';
import { BiSolidCoffeeBean } from 'react-icons/bi';
// import { CiCoffeeBean } from "react-icons/ci";
import { ConfirmBtn } from '../common/button/button';
import styled from 'styled-components';
import {
  COLOR_1,
  FONT_SIZE_1,
  FONT_SIZE_2,
  FONT_WEIGHT,
} from '../common/common';
import { baseURL } from '../common/baseURL';

// type PostDataProps = {
//   postData: PostData;
// };

const S = {
  Container: styled.div`
    display: flex;
    min-height: 1000px;
    margin: 5%;
    > form {
      min-height: 1000px;
      @media screen and (max-width: 500px) {
        min-height: 1100px;
      }
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-height: 1000px;
        @media screen and (max-width: 500px) {
          min-height: 1100px;
        }
      }
    }
    @media screen and (max-width: 500px) {
      min-height: 1100px;
    }
  `,
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
  BtnWrap: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
};

const EditPostPage = () => {
  const postId = useParams();
  const [disabled, setDisabled] = useState(false);
  const [postData, setPostData] = useRecoilState<PostData>(PostItemAtom);
  const [tags, setTags] = useState<string[]>([]);
  const resetPostItem = useResetRecoilState(PostItemAtom);

  // const mutation = useMutation(
  //   (postData:PostDataProps) => {
  //     return axios.patch('http://localhost3001/cafePost', postData),
  //     {
  //       onSuccess: () => {
  //         // refetch the comments list for our blog post
  //         // queryClient.invalidateQueries(['posts', id, 'comments'])
  //         console.log(mutation.data);
  //       },
  //   }
  // )

  //api
  const editPost = (post: PostData) =>
    axios.patch(`${baseURL}/posts/${postId}`, post, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
        withCredentials: true,
      },
    });

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: (data, context) => {
      console.log(context);
      console.log(data);
      resetPostItem();
    },
  });
  //리코일 데이터: cafeId, cafeName, title, createdAt, updatedAt, authorId, author, image, content, starRating, isBookmarked, tag, comment
  const { cafeName, title, starRating, content } = postData; //리코일에서 불러온 데이터

  //수정하기 눌렀을 때
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    // setPostData(postData);
    // console.log(postData);
    editPostMutation.mutate(postData);
  };

  //제목
  const handleTitle = (event: any) => {
    const titleValue: string = event?.target.value;
    titleValue.length > 30 ? alert('제목은 30자 이하로 적어주세요.') : null;
    setPostData((current) => ({ ...current, title: titleValue })); //리코일: PostItemAtom에 변경된 제목 담기
  };

  //태그

  const saveTag = () => {
    setTags(tags);
    setPostData((current) => ({ ...current, tag: tags })); //리코일: PostItemAtom에 선택된 태그 담기
  };
  const onClickEvent = (e: any): void => {
    if (tags.length >= 3) {
      e.preventDefault();
      alert('태그를 3개 이하로 선택하세요!');
      saveTag();
      return;
    }
    if (tags.length < 3) {
      setTags((prev) => [...prev, e.target.textContent]); //선택한 태그
      saveTag();
    } else {
      //선택한 태그를 클릭하여 선택 해제 될 때
      setTags(tags.filter((el) => el !== e.target.textContent)); //선택한 태그-선택해제한 태그
      saveTag();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      // 파일 처리 로직
      // const formData = new FormData();
      // console.log(fileList);
      // mutate(formData, {
      //   onSuccess: (data) => {
      //     console.log(data);
      //   }
      // })
    }
  };

  const handleContent = (contentValue: string) => {
    // let contentValue = e.target.value;
    setPostData((current) => ({ ...current, content: contentValue })); //리코일: PostItemAtom에 변경된 내용 담기
  };

  return (
    <S.Container>
      <form
        onSubmit={() => {
          submitPost;
        }}
      >
        <div>
          <S.CafeNameWrap>
            <S.CafeName>{cafeName}</S.CafeName>
          </S.CafeNameWrap>
          <S.TitleWrap>
            <S.Title
              placeholder='제목을 입력해주세요.'
              value={title}
              onChange={(event: any) => {
                handleTitle(event);
              }}
            />
          </S.TitleWrap>
          <S.MoodAskWrap>
            <S.MoodAsk>카페 분위기는 어떠셨나요?</S.MoodAsk>
          </S.MoodAskWrap>
          <S.MoodWrap>
            {tagName.map((el, id) => (
              <S.TagWrap key={id}>
                <MoodTag text={el} onClickEvent={onClickEvent}></MoodTag>
              </S.TagWrap>
            ))}
          </S.MoodWrap>
          <S.RatingWrap>
            <BiSolidCoffeeBean
              size={FONT_SIZE_1.big_5}
              color={COLOR_1.dark_brown}
            />
            <S.Rate
              type='number'
              max='5'
              min='1'
              value={starRating}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const rateValue = e?.target.value;
                if (Number(rateValue) !== parseInt(rateValue)) {
                  alert('1 이상 5 이하의 정수만 입력해주세요.');
                }
                if (parseInt(rateValue) > 5 || parseInt(rateValue) < 1) {
                  alert('1 이상 5 이하의 숫자를 입력해주세요.');
                }
                if (parseInt(rateValue) >= 1 && parseInt(rateValue) <= 5) {
                  setPostData((current) => ({
                    ...current,
                    starRating: parseInt(rateValue),
                  }));
                }
              }}
            />
            {/*<CiCoffeeBean size={FONT_SIZE_1.big_5} color={COLOR_1.dark_brown}/> */}
            {` / 5`}
          </S.RatingWrap>
          <S.AddImg
            id='file-upload'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          ></S.AddImg>
          {/* <S.UploadBtn htmlFor="file-upload">사진 추가하기</S.UploadBtn> */}
          <SunEditor
            height='300px'
            onChange={handleContent}
            setContents={content}
          />
          <S.BtnWrap>
            <ConfirmBtn
              type='button'
              disabled={disabled}
              onClick={(e: any) => {
                submitPost(e);
              }}
            >
              수정하기
            </ConfirmBtn>
            <ConfirmBtn
              onClick={() => {
                confirm(
                  `지금 나가시면 작성된 내용은 저장이 안 됩니다. 정말로 나가시겠습니까?`
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

export default EditPostPage;
