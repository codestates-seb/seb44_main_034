import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
// import { data as co } from "../../mockData/comments.json";
import ReplyItem from "./ReplyItem";
// import CommentsPagination from "./CommentsPagination";
import { GetPostAtom } from "../../recoil/postState";
import { baseURL } from "../../common/baseURL";
import { PostReplies } from "../../types/type";
import { styled } from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
// import { CommentType } from "../../recoil/recoil";

type ReplyItemProps = {
  replies: PostReplies[];
  commentId: number | undefined;
  // currentPosts: PostComments[];
};
type InputData = {
  content: string;
};

type WriteComment = {
  content: string;
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  Toggle: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96%;
    height: 40px;
    padding-bottom: 14px;
    border-bottom: 1px solid ${COLOR_1.light_gray};
    > span {
      text-align: center;
      width: 80px;
      border: 1px solid ${COLOR_1.light_gray};
      border-radius: 4px;
      padding: 2px;
      padding-top: 4px;
      font-size: ${FONT_SIZE_1.normal_1};
      &:hover {
        cursor: pointer;
        background-color: ${COLOR_1.green};
      }
    }
  `,
  WriteFrom: styled.form`
    height: 140px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > input {
      width: 80%;
      min-height: 80px;
      min-width: 200px;
    }
    > button {
      margin-left: 8px;
      width: 18%;
      height: 30px;
      min-width: 70px;
      border-radius: 4px;
      border: 1px solid ${COLOR_1.dark_brown};
      background-color: ${COLOR_1.white};
      &:hover {
        cursor: pointer;
        background-color: ${COLOR_1.green};
      }
    }
  `,
  EditForm: styled.form`
    display: none;
    &.active {
      display: flex;
    }
    height: 140px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    > input {
      width: 80%;
      min-height: 80px;
      min-width: 200px;
    }
    > button {
      margin-left: 8px;
      width: 18%;
      height: 30px;
      min-width: 70px;
      border-radius: 4px;
      border: 1px solid ${COLOR_1.dark_brown};
      background-color: ${COLOR_1.white};
      &:hover {
        cursor: pointer;
        background-color: ${COLOR_1.green};
      }
    }
  `,
  Comments: styled.div`
    display: block;
    width: 96%;
    min-height: 40px;
    padding: 4px;
  `,
  FlexWrap: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 12px;
  `,
  Author: styled.div`
    display: flex;
    > span {
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
  `,
  Edit: styled.div`
    display: flex;
    > span {
      margin-right: 12px;
      font-size: 12px;
      &:hover {
        cursor: pointer;
      }
    }
  `,
  Content: styled.div`
    font-size: 14px;
  `,
};
const Replies = ({ replies, commentId }: ReplyItemProps) => {
  // const comments = co.comments;
  // const Comments = ({comments, postId}:CommentData) => {
  // const [commentsData, setCommentsData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [commentsPerPage, setCommentsPerPage] = useState(10);
  const setGetItem = useSetRecoilState(GetPostAtom);
  const token = localStorage.getItem("access_token");
  const [isEditing, setIsEditing] = useState(false);
  // console.log(currentPage);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors }
  } = useForm<InputData>();

  const writeReply = (reply: WriteComment) =>
    axios.post(`${baseURL}/replys/${commentId}`, reply, {
      headers: { Authorization: localStorage.getItem("access_token") },
    });
  const writeCommentMutation = useMutation({
    mutationFn: writeReply,
    onSuccess: () => {
      // console.log(context);
      // console.log(data);
      reset();
      setIsEditing(false);
      setGetItem((prev) => !prev);
    },
    onError: () => {
      if (token) {
        alert(
          "일시적인 오류가 발생했습니다. (사장님은 포스트를 작성할 수 없습니다.)"
        );
      } else {
        alert("로그인 사용자만 이용이 가능합니다.");
      }
    },
  });

  const onSubmit = (content: InputData) => {
    const reply = { ...content };
    // console.log(reply);
    writeCommentMutation.mutate(reply);
  };

  // const replyData = co.comments; //대댓글데이터

  //페이지네이션
  // const lastPostIndex = currentPage * commentsPerPage;
  // const firstPostIndex = lastPostIndex - commentsPerPage;
  // const currentPosts = replyData.slice(firstPostIndex, lastPostIndex);
  // console.log(setCommentsPerPage);
  console.log(replies);
  return (
    <S.Container>
      <S.Toggle>
        <span
          onClick={() => {
            setIsEditing((cur) => !cur);
          }}
        >
          답글 작성
        </span>
      </S.Toggle>
      {isEditing && (
        <S.WriteFrom onSubmit={handleSubmit(onSubmit)}>
          <input type='text' {...register("content", { required: true })} />
          <button type='submit'>등록</button>
        </S.WriteFrom>
      )}
      <S.Comments>
        <ul>
          {replies.map((el, idx) => (
            <ReplyItem key={idx} reply={el} />
          ))}
        </ul>
      </S.Comments>
      {/* <CommentItem comment={commentData}/> */}
      {/* <CommentsPagination
        totalComments={replies.length}
        commentsPerPage={commentsPerPage}
        setCurrentPage={setCurrentPage}
        // currentPage={currentPage}
      /> */}
    </S.Container>
  );
};

export default Replies;
