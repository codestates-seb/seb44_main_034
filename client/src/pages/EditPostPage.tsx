import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useResetRecoilState } from "recoil";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { PostCafeAtom, PostItemAtom, PostImgAtom } from "../recoil/postState";
import { ReqPostData } from "../types/type";
import { PostCafeType } from "../types/type";
import { MoodTagNames } from "../common/tagNames";
import MoodTag from "../common/tags/MoodTag";
import { BiSolidCoffeeBean } from "react-icons/bi";
// import { CiCoffeeBean } from "react-icons/ci";
import { ConfirmBtn } from "../common/button/button";
import styled from "styled-components";
import {
  COLOR_1,
  FONT_SIZE_1,
  FONT_SIZE_2,
  FONT_WEIGHT,
} from "../common/common";
import { baseURL } from "../common/baseURL";

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
    margin: 10px 0 20px 0;
  `,
  AddImg: styled.input`
    display: none;
  `,
  BtnWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
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

const EditPostPage = () => {
  const postId = useParams();
  const [disabled, setDisabled] = useState(false);
  const [postData, setPostData] = useRecoilState<ReqPostData>(PostItemAtom);
  const postImg = useRecoilValue<string | null>(PostImgAtom);
  const postCafe = useRecoilValue<PostCafeType>(PostCafeAtom);
  const [file, setFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState<null | string>(postImg);
  const [isResImg, setIsResImg] = useState(true);
  // const [tags, setTags] = useState<string[]>([]);
  const resetPostItem = useResetRecoilState(PostItemAtom);
  const navigate = useNavigate();
  // console.log(postId.postId);
  // console.log(previewImgUrl);
  console.log(isResImg);
  //카페 아이디를 새로고침 해도 저장할 수  있게 객체 새로 복사
  //게시글 수정 시  이미지 업로드
  //이미지가 업로드 되어 있을 때  보내지 않고
  //이미지가 업로드 되어 있지 않을 때  보냄

  //api
  const editPost = (formData: FormData) =>
    axios.patch(`${baseURL}/posts/${postId.postId}`, formData, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
        withCredentials: true,
      },
    });

  const editPostMutation = useMutation({
    mutationFn: editPost,
    onSuccess: (data, context) => {
      console.log(context);
      console.log(data);
      console.log(postId.postId);
      resetPostItem();
      navigate(`../postpage/${postId.postId}`);
    },
    onError: () => {
      alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setDisabled(false);
    },
  });
  //리코일 데이터: cafeId, cafeName, title, createdAt, updatedAt, authorId, author, image, content, starRating, isBookmarked, tag, comment

  const { title, starRating, content } = postData; //리코일에서 불러온 데이터

  //수정하기 눌렀을 때
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    // setPostData((prev) => prev);
    const formData = new FormData();
    const json = JSON.stringify(postData);
    const post = new Blob([json], {
      type: "application/json",
    });
    // console.log(postData);
    formData.append("dto", post);
    if (file) {
      formData.append("postImage", file);
    } else {
      formData.append("postImage", null);
    }
    // for (const entry of formData.entries()) {
    //   console.log(entry[0] + ": " + entry[1]);
    // }
    editPostMutation.mutate(formData);
  };

  //제목
  const handleTitle = (event: any) => {
    const titleValue: string = event?.target.value;
    titleValue.length > 30 ? alert("제목은 30자 이하로 적어주세요.") : null;
    setPostData((current) => ({ ...current, title: titleValue })); //리코일: PostItemAtom에 변경된 제목 담기
  };

  //태그
  // const saveTag = () => {
  //   setTags(tags);
  //   setPostData((current) => ({ ...current, tag: tags })); //리코일: PostItemAtom에 선택된 태그 담기
  // };
  // const onClickEvent = (e: any): void => {
  //   if (tags.length >= 3) {
  //     e.preventDefault();
  //     alert('태그를 3개 이하로 선택하세요!');
  //     saveTag();
  //     return;
  //   }
  //   if (tags.length < 3) {
  //     setTags((prev) => [...prev, e.target.textContent]); //선택한 태그
  //     saveTag();
  //   } else {
  //     //선택한 태그를 클릭하여 선택 해제 될 때
  //     setTags(tags.filter((el) => el !== e.target.textContent)); //선택한 태그-선택해제한 태그
  //     saveTag();
  //   }
  // };

  const onClickEvent = (tagName: string): void => {
    // console.log(tagName);
    const tags = postData?.tags ?? [];
    const findTag = tags.find((el) => el === tagName);
    const filterTag = tags.filter((el) => el !== tagName);

    if (findTag) {
      setPostData((prevState) => ({ ...prevState, tags: [...filterTag] }));
    }
    if (tags.length >= 3) {
      alert("태그는 3개까지만 선택해주세요.");
      return;
    }
    if (!findTag) {
      setPostData((prevState) => ({ ...prevState, tags: [...tags, tagName] }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // const previewImgHandler = (e) => {
    // const correctForm = /(.*?)\.(jpg|gif|png|jpeg|bmp|tif|heic|)$/;
    const fileReader = new FileReader();
    if (files && files.length > 0) {
      const file = files[0];
      setIsResImg(false);
      if (file.size > 1024 * 1024 * 4) {
        alert("4MB 이상의 이미지는 업로드 할 수 없습니다.");
        return;
      }
      // if (!file.name.match(correctForm)) {
      // alert(
      // "이미지 파일만 업로드가 가능합니다. (*.jpg, *.gif, *.png, *.jpeg, *.bmp, *.tif, *heic)"
      // );
      // } else {
      fileReader.readAsDataURL(file);
      setFile(file);
      // }
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setPreviewImgUrl(fileReader.result);
        }
      };
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
          <S.HeadWrap>
            <S.CafeNameWrap>
              <S.CafeName>{postCafe?.cafeName}</S.CafeName>
            </S.CafeNameWrap>
            <S.TitleWrap>
              <S.Title
                placeholder='제목을 입력해주세요.'
                value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleTitle(event);
                }}
              />
            </S.TitleWrap>
            <S.MoodAskWrap>
              <S.MoodAsk>카페 분위기는 어떠셨나요?</S.MoodAsk>
            </S.MoodAskWrap>
            <S.MoodWrap>
              {MoodTagNames.map((el, id) => (
                <S.TagWrap key={id}>
                  <MoodTag
                    key={id}
                    id={id}
                    text={el}
                    onClickEvent={onClickEvent}
                    selected={postData?.tags.find((ele) => ele === el)}
                  ></MoodTag>
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
            <SunEditor
              height='300px'
              onChange={handleContent}
              setContents={content}
            />
          </S.SunEditorBox>
          <S.BtnWrap>
            <ConfirmBtn
              type='button'
              disabled={disabled}
              onClick={(e: any) => {
                if (title === "") {
                  alert("제목을 입력해주세요.");
                  return;
                }
                if (starRating < 1 || starRating > 5) {
                  alert("별점은 1점 이상 5점 이하의 정수만 넣어주세요.");
                  return;
                }
                if (content.length < 130) {
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
              수정하기
            </ConfirmBtn>
            <ConfirmBtn
              onClick={() => {
                const exit = confirm(
                  `지금 나가시면 작성된 내용은 저장이 안 됩니다. 정말로 나가시겠습니까?`
                );
                if (exit) {
                  navigate(`../postpage/${postId.postId}`);
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

export default EditPostPage;
