import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import PostHead from '../components/post/PostHead';
import PostMood from '../components/post/PostMood';
import { PostItemAtom } from '../recoil/postState';
import { PostData } from '../types/type';
import { BiSolidCoffeeBean } from 'react-icons/bi';
// import { CiCoffeeBean } from "react-icons/ci";
import { ConfirmBtn } from '../common/button/button';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../common/common';

type PostDataProps = {
  postData: PostData;
};

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

const CreatePostPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [postData, setPostData] = useRecoilState<PostData>(PostItemAtom);

  // const mutation = useMutation(
  //   (postData:PostDataProps) => {
  //     return axios.post('http://localhost3001/cafePost', postData),
  //     {
  //       onSuccess: () => {
  //         // refetch the comments list for our blog post
  //         // queryClient.invalidateQueries(['posts', id, 'comments'])
  //         console.log(mutation.data);
  //       },
  //   }
  // )

//api

  const createPost = (post:PostData) => axios.post('http://localhost:3001/cafepost', post);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data, variables, context)=>{
      console.log(context);
      console.log(data);
    },
    onMutate: variables => {
      return 'success!';
    }
  })

// in the component



  // const {data, isLoading, mutate, mutateAsync } = useMutation(mutationFn, options);


  //api(이미지)
  // const saveImage = async(formData: FormData) => {
  //   return (await axios.post('/api/postId', formData)).data;
  // }

  // const saveImageMutation = useMutation((formData: FormData)=> saveImage(formData), {})
  // const { mutate } = saveImageMutation;

  const { cafeId, cafeName, title, createdAt, updatedAt, authorId, author, image, content, starRating, isBookmarked, tag, comment } = postData;

  // const postDataToSand:PostDataProps = {
  //   cafeId, cafeName, title, createdAt, updatedAt, authorId, author, image, content, starRating, isBookmarked, tag, comment
  // }

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log('clicked');
    e.preventDefault();
    setDisabled(true);
    // setPostData(postData);
    // console.log(postData);
    createPostMutation.mutate(postData);
  }

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

  return (
    <S.Container>
      <form onSubmit={()=>{submitPost}}>
        <div>
          <PostHead cafeName={cafeName} />
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const rateValue = parseInt(e.target.value);
                if (rateValue > 5 || rateValue < 1) {
                  alert('1 이상 5 이하의 숫자를 입력해주세요.');
                }
                if (rateValue>=1 && rateValue<=5) {
                  setPostData((prev)=>({...prev, starRating:rateValue}));
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
          <SunEditor height='300px' />
          <S.BtnWrap>
            <ConfirmBtn type='button' disabled={disabled} onClick={(e:any)=>{submitPost(e)}} >출간하기</ConfirmBtn>
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

export default CreatePostPage;
