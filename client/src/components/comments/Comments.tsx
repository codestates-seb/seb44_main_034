import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import {data as co} from '../../mockData/comments.json';
import CommentItem from "./CommentItem";
import CommentsPagination from "./CommentsPagination";
import { baseURL } from "../../common/baseURL";
import { PostComments } from "../../types/type";
import { styled } from "styled-components";
import { COLOR_1 } from "../../common/common";
// import { CommentType } from "../../recoil/recoil";

type CommentData = {
  comments: PostComments[];
  postId: number | string | undefined;
};

type InputData = {
  content: string;
};

type WriteComment = {
  content: string;
};

// type EditComment = {
//   content: string;
//   commentId: number;
// }

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
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
const Comments = ({ comments, postId }: CommentData) => {
  // const comments = co.comments;
  // const postId = 1;
  // const Comments = ({comments, postId}:CommentData) => {
  // const [commentsData, setCommentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(10);
  // const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors }
  } = useForm<InputData>();

  // const { data, isLoading, isError } = useQuery(['getcoment'], () => {
  //   return fetch('http://localhost:3001/comment').then(res => res.json());
  // });

  // const writeComment = (comment:WriteComment) => axios.post(`${baseURL}/post-comments/${cafeId}`, comment,
  const writeComment = (comment: WriteComment) =>
    axios.post(`${baseURL}/post-comments/${postId}`, comment, {
      headers: { Authorization: localStorage.getItem("access_token") },
    });
  const writeCommentMutation = useMutation({
    mutationFn: writeComment,
    onSuccess: (data, context) => {
      console.log(context);
      console.log(data);
      reset();
    },
    onError: () => {
      alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  // const showEditComment = (commentId:number) => {
  //   console.log(commentId);
  //   //수정 창 보여주기
  // }

  // // const editComment = (comment:WriteComment) => axios.patch(`${baseURL}/post-comments/${commentId}`, comment,
  // const editComment = (comment:EditComment) => axios.patch(`${baseURL}/post-comments/${comment.commentId}`, comment.content, {
  //   headers: {Authorization:localStorage.getItem('access_token')}
  // });
  // const editCommentMutation = useMutation({
  //   mutationFn: editComment,
  //   onSuccess: (data, context)=>{
  //     console.log(context);
  //     console.log(data);
  //     reset();
  //   }
  // })

  // const deleteComment = (commentId:number) => {
  //   //if user Id와 지금 userId가 일치하면
  //   if (confirm('삭제하신 댓글은 복구되지 않습니다. 정말로 삭제하시겠습니까?')) {
  //     useMutation((commentId) => {
  //       // return axios.delete(`/${commentId}`, {
  //         return axios.delete(`${baseURL}/post-comments/${commentId}`, {
  //         headers: {
  //           Authorization: localStorage.getItem('access_token'),
  //         },
  //         data: { commentId : commentId}
  //       }
  //       ).then((res) => {
  //         console.log(res);
  //         alert('삭제되었습니다.');
  //       });
  //     })
  //   }
  // }

  // const deleteCommentMutation = useMutation((commentId: number) => {
  //   return axios.delete(`${baseURL}/post-comments/${commentId}`, {
  //     headers: {
  //       Authorization: localStorage.getItem('access_token'),
  //     },
  //     data: { commentId: commentId }
  //   }).then((res) => {
  //     console.log(res);
  //     alert('삭제되었습니다.');
  //   });
  // });

  // const deleteCommentMutation = useMutation((commentId: number) => {
  //   return axios.delete(`${baseURL}/post-comments/${commentId}`, {
  //     headers: {
  //       Authorization: localStorage.getItem('access_token'),
  //     },
  //     data: { commentId: commentId }
  //   }).then((res) => {
  //     console.log(res);
  //     alert('삭제되었습니다.');
  //   });
  // });

  const onSubmit = (content: InputData) => {
    const comment = { ...content };
    console.log(comment); // 폼 데이터 콘솔에 출력 (여기서는 댓글 데이터를 처리하는 로직을 추가하면 됩니다.)
    writeCommentMutation.mutate(comment);
  };

  const commentData = comments;

  //페이지네이션
  const lastPostIndex = currentPage * commentsPerPage;
  const firstPostIndex = lastPostIndex - commentsPerPage;
  const currentPosts = commentData.slice(firstPostIndex, lastPostIndex);
  console.log(setCommentsPerPage);

  return (
    <S.Container>
      <S.WriteFrom onSubmit={handleSubmit(onSubmit)}>
        <input type='text' {...register("content", { required: true })} />
        <button type='submit'>댓글 작성</button>
      </S.WriteFrom>

      <S.Comments>
        <ul>
          {currentPosts.map((el, idx) => (
            <CommentItem key={idx} comment={el} />
          ))}
        </ul>
      </S.Comments>
      {/* <CommentItem comment={commentData}/> */}
      <CommentsPagination
        totalComments={comments.length}
        commentsPerPage={commentsPerPage}
        setCurrentPage={setCurrentPage}
        // currentPage={currentPage}
      />
    </S.Container>
  );
};

export default Comments;
