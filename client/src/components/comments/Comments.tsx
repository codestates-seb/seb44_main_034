import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {data as co} from '../../mockData/comments.json'
import CommentsPagination from "./CommentsPagination";
// import { baseURL } from "../../common/baseURL";
import { PostComment } from "../../types/type";
import { styled } from "styled-components";
import { COLOR_1 } from "../../common/common";

type CommentData = {
  comments : PostComment;
}

type InputData = {
  content: string;
}

type WriteComment = {
  content: string;
  cafeId: number;
}

const S = {
  Container:styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `,
  WriteFrom:styled.form`
    height: 140px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >input{
      width: 80%;
      min-height: 80px;
      min-width: 200px;
    }
    >button{
      margin-left:8px;
      width: 18%;
      height: 30px;
      min-width: 70px;
      border-radius: 4px;
      border: 1px solid ${COLOR_1.dark_brown};
      background-color: ${COLOR_1.white};
      &:hover{
        cursor: pointer;
        background-color: ${COLOR_1.green};

      }
    }
  `,
  Comments:styled.div`
    display: block;
    width: 96%;
    min-height: 40px;
    padding: 4px;
  `,
  FlexWrap:styled.div`
    display: flex;
    justify-content: space-between;
    margin: 12px;
  `,
  Author:styled.div`
  display:flex;
    >span{
      font-size: 14px;
      &:hover{
        cursor: pointer;
      }
    }
  `,
  Edit:styled.div`
  display:flex;
    >span{
      margin-right: 12px;
      font-size:12px;
      &:hover{
        cursor: pointer;
      }
    }
  `,
  Content:styled.div`
    font-size: 14px;
  `
}

const Comments = ({comments}) => {
  const [commentsData, setCommentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(10);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InputData>();

  const { data, isLoading, isError } = useQuery(['getcoment'], () => {
    return fetch('http://localhost:3001/comment').then(res => res.json());
  });


  if (isLoading) {
    <p>Loading</p>
  }

// const writeComment = (comment:WriteComment) => axios.post(`${baseURL}/post-comments/${cafeId}`, comment,
const writeComment = (comment:WriteComment) => axios.post('http://localhost:3001/comments', comment,
  // {headers: {Authorization:localStorage.getItem('access_token')}}
  );
const writeCommentMutation = useMutation({
   mutationFn: writeComment,
   onSuccess: (data, context)=>{
     console.log(context);
     console.log(data);
     reset();
   }
 })

  const showEditComment = () => {
    //수정 창 보여주기
  }
 
  // const editComment = (comment:WriteComment) => axios.patch(`${baseURL}/post-comments/${commentId}`, comment,
  const editComment = (comment:WriteComment) => axios.patch(`http://localhost:3001/comments`, comment,
  {headers: {Authorization:localStorage.getItem('access_token')}});
  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: (data, context)=>{
      console.log(context);
      console.log(data);
      reset();
    }
  })

  const deleteComment = () => {
    //if user Id와 지금 userId가 일치하면
    if (confirm('삭제하신 댓글은 복구되지 않습니다. 정말로 삭제하시겠습니까?')) {
      useMutation((commentId) => {
        // return axios.delete(`/${commentId}`, {
          return axios.delete(`http://localhost:3001/comments`, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
          data: { commentId : commentId}
        }
        ).then((res) => {
          console.log(res);
          alert('삭제되었습니다.');
        });
      })
    }
  }

  const onSubmit = (content:InputData) => {
    const comment = {...content, cafeId:123}
    console.log(comment); // 폼 데이터 콘솔에 출력 (여기서는 댓글 데이터를 처리하는 로직을 추가하면 됩니다.)
    writeCommentMutation.mutate(comment);
  };

  const commentData = co.comments;

  //페이지네이션
  const lastPostIndex = currentPage * commentsPerPage;
  const firstPostIndex = lastPostIndex - commentsPerPage;
  const currentPosts = commentData.slice(firstPostIndex, lastPostIndex);

  return (
    <S.Container>
      <S.WriteFrom onSubmit={handleSubmit(onSubmit)}>
          <input type= 'text' {...register('content', { required: true })} />
          <button type='submit'>댓글 작성</button>
        </S.WriteFrom>
      <S.Comments>
        <ul>
          {
            currentPosts.map((el) =>
            <li key={el.commentId}>
              <S.FlexWrap>
              <S.Author><span>{el.author}</span></S.Author>
              <S.Edit><span onClick={showEditComment}>수정</span><span onClick={deleteComment}>삭제</span></S.Edit>
              </S.FlexWrap>
              {el.content}
            </li>)}
        </ul>
      </S.Comments>
      <CommentsPagination
        totalComments={commentsData.length}
        commentsPerPage={commentsPerPage}
        setCurrentPage={setCurrentPage}
        // currentPage={currentPage}
      />
    </S.Container>
  );
}

export default Comments;