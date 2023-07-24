import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useResetRecoilState } from "recoil";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import PostHead from "../components/post/PostHead";
import PostMood from "../components/post/PostMood";
import { PostItemAtom, PostCafeAtom } from "../recoil/postState";
import { ReqPostData } from "../types/type";
import { PostCafeType } from "../types/type";
import { BiSolidCoffeeBean } from "react-icons/bi";
// import { CiCoffeeBean } from "react-icons/ci";
import { ConfirmBtn } from "../common/button/button";
import styled from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../common/common";
import { baseURL } from "../common/baseURL";
import { useNavigate } from "react-router-dom";

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
  HeadWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 400px;
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
    margin: 10px 0;
  `,
  AddImg: styled.input`
    display: none;
  `,
  BtnWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0 20px 0;
  `,
  ImgPreview: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    height: 30%;
    margin: 10px 0;
    > img {
      width: 100%;
      height: 100%;
      margin: 10px 0;
    }
    label {
    }
  `,
  SunEditorBox: styled.div`
    z-index: 0;
  `,
};

const CreatePostPage = () => {
  const [disabled, setDisabled] = useState(false);
  const [postData, setPostData] = useRecoilState<ReqPostData>(PostItemAtom);
  const postCafe = useRecoilValue<PostCafeType>(PostCafeAtom);
  const [file, setFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState<null | string>(null);
  const [correctValue, setCorrectValue] = useState({
    correctTitle: false,
    correctStarRating: false,
  });
  const resetPostItem = useResetRecoilState(PostItemAtom);
  const navigate = useNavigate();
  // console.log(postCafe);

  //api
  const createPost = (formData: FormData) =>
    axios.post(`${baseURL}/posts/${postCafe.cafeId}`, formData, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
        withCredentials: true,
      },
    });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // console.log(context);
      // console.log(data);
      resetPostItem();
      navigate(`../cafes/${postCafe.cafeId}`);
      //이동 로직 추가 해함(postId 받아와야 함)
    },
    onError: () => {
      alert(
        "일시적인 오류가 발생했습니다. (사장님은 포스트를 작성할 수 없습니다.)"
      );
      setDisabled(false);
    },
  });

  // const { cafeId, cafeName, title, createdAt, updatedAt, authorId, author, image, content, starRating, isBookmarked, tag, comment } = postData;

  const { title, starRating } = postData;

  // const postDataToSand:PostDataProps = {
  //   cafeId, cafeName, title, createdAt, updatedAt, authorId, author, image, content, starRating, isBookmarked, tag, comment
  // }

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    // console.log('clicked');
    e.preventDefault();
    setDisabled(true);
    // setPostData(postData);
    const formData = new FormData();
    const json = JSON.stringify(postData);
    const post = new Blob([json], {
      type: "application/json",
    });
    // console.log(postData);
    formData.append("dto", post);
    if (file) {
      formData.append("postImage", file);
    }
    // for (const entry of formData.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }
    createPostMutation.mutate(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // const previewImgHandler = (e) => {
    const correctForm = /(.*?)\.(jpg|gif|png|jpeg|bmp|tif|heic|)$/;
    const fileReader = new FileReader();
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 1024 * 1024 * 4) {
        alert("4MB 이상의 이미지는 업로드 할 수 없습니다.");
        return;
      }
      if (!file.name.match(correctForm)) {
        alert(
          "이미지 파일만 업로드가 가능합니다. (*.jpg, *.gif, *.png, *.jpeg, *.bmp, *.tif, *heic)"
        );
      } else {
        fileReader.readAsDataURL(file);
        setFile(file);
      }
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPreviewImgUrl(fileReader.result);
        }
      };
    }
  };

  const handleContent = (contentValue: string) => {
    setPostData((current) => ({ ...current, content: contentValue })); //리코일: PostItemAtom에 변경된 내용 담기
  };
  // console.log(postData);
  return (
    <S.Container>
      <form
        onSubmit={() => {
          submitPost;
        }}
      >
        <div>
          <S.HeadWrap>
            <PostHead cafeName={postCafe.cafeName} />
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
                  const rateValue = e?.target.value;
                  if (Number(rateValue) !== parseInt(rateValue)) {
                    alert("1 이상 5 이하의 정수만 입력해주세요.");
                  }
                  if (parseInt(rateValue) > 5 || parseInt(rateValue) < 1) {
                    alert("1 이상 5 이하의 숫자를 입력해주세요.");
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
          </S.HeadWrap>
          {!previewImgUrl && (
            <S.UploadBtn htmlFor='fileUpload'>사진 추가하기</S.UploadBtn>
          )}
          <S.AddImg
            id='fileUpload'
            type='file'
            accept='image/*'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileChange(e)
            }
          ></S.AddImg>
          {previewImgUrl && (
            <S.ImgPreview>
              <img src={previewImgUrl} />
            </S.ImgPreview>
          )}
          {previewImgUrl && (
            <S.UploadBtn htmlFor='fileUpload'>사진 수정하기</S.UploadBtn>
          )}
          <S.SunEditorBox>
            <SunEditor height='300px' onChange={handleContent} />
          </S.SunEditorBox>
          <S.BtnWrap>
            <ConfirmBtn
              type='button'
              disabled={disabled}
              onClick={(e: any) => {
                if (title === "") {
                  alert("제목을 입력해주세요.");
                  return;
                } else {
                  setCorrectValue({ ...correctValue, correctTitle: true });
                }
                if (starRating < 1 || starRating > 5) {
                  alert("별점은 1점 이상 5점 이하의 정수만 넣어주세요.");
                  return;
                } else {
                  setCorrectValue({
                    ...correctValue,
                    correctStarRating: true,
                  });
                }
                if (postData.content.length < 130) {
                  alert("내용을 130자 이상 적어주세요.");
                  return;
                }
                if (!previewImgUrl) {
                  alert("이미지를 첨부해주세요.");
                  return;
                }
                submitPost(e);
              }}
            >
              출간하기
            </ConfirmBtn>
            <ConfirmBtn
              onClick={() => {
                if (
                  confirm(
                    `지금 나가시면 작성된 내용은 저장이 안 됩니다. 정말로 나가시겠습니까?`
                  )
                ) {
                  navigate(`../cafes/${postCafe.cafeId}`);
                }
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
