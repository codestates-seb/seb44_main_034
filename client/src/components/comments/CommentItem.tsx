import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { PostComment } from "../../types/type";
import { PostComments } from "../../types/type";
import { GetPostAtom } from "../../recoil/postState";
import { baseURL } from "../../common/baseURL";
import Replies from "./Replies";
import { decodeToken } from "../../common/token/decodeToken";
import { styled } from "styled-components";
import { COLOR_1 } from "../../common/common";

type CommentItemProps = {
  comment: PostComments;
  // currentPosts: PostComments[];
};
type InputData = {
  content: string;
};

type EditComment = {
  content: string;
};

const S = {
  EditForm: styled.form`
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
    margin-left: 20px;
    padding: 20px 4px;
    margin-bottom: 20px;
  `,
};

const CommentItem = ({ comment }: CommentItemProps) => {
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // formState: { errors }
  } = useForm<InputData>();
  const setGetItem = useSetRecoilState(GetPostAtom);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("access_token");
  const decodedPayLoad = decodeToken(token);
  useEffect(() => {
    if (token) {
      setUser(decodedPayLoad.userId);
    }
  }, []);

  const showEditComment = () => {
    //수정 창 보여주기
    setEditing((cur) => !cur);
  };

  useEffect(() => {
    if (editing) {
      setValue("content", comment.content);
    }
  }, [editing, setValue]);

  const editComment = (editedContent: EditComment) =>
    axios.patch(
      `${baseURL}/post-comments/${comment.commentId}`,
      editedContent,
      {
        headers: { Authorization: localStorage.getItem("access_token") },
      }
    );
  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: (data, context) => {
      console.log(context);
      console.log(data);
      console.log(comment.commentId);
      reset();
      setEditing(false);
      setGetItem((prev) => !prev);
    },
  });

  const deleteCommentMutation = useMutation(() => {
    return axios
      .delete(`${baseURL}/post-comments/${comment.commentId}`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res);
        alert("삭제되었습니다.");
      });
  });

  const deleteComment = () => {
    if (
      confirm("삭제하신 댓글은 복구되지 않습니다. 정말로 삭제하시겠습니까?")
    ) {
      deleteCommentMutation.mutate();
    }
  };
  const onSubmit = (content: InputData) => {
    console.log(content);
    const comment = { ...content };
    console.log(comment);
    editCommentMutation.mutate(comment);
  };

  return (
    <div>
      {/* {editing ? ( */}
      <ul>
        <li key={comment.commentId}>
          <S.FlexWrap>
            <S.Author>
              <Link to={`../otherusermy/${comment.authorId}`}>
                <span>{comment.author}</span>{" "}
              </Link>
            </S.Author>
            {user ? (
              user === comment.authorId ? (
                <S.Edit>
                  <span
                    onClick={() => {
                      showEditComment();
                    }}
                  >
                    수정
                  </span>
                  <span
                    onClick={() => {
                      deleteComment();
                    }}
                  >
                    삭제
                  </span>
                </S.Edit>
              ) : null
            ) : null}
          </S.FlexWrap>
          {editing ? (
            <S.EditForm
              onSubmit={handleSubmit(onSubmit)}
              // className={comment.commentId ? "active" : ""}
            >
              <input type='text' {...register("content", { required: true })} />
              <button type='submit'>등록</button>
            </S.EditForm>
          ) : (
            <S.Content>{comment.content}</S.Content>
          )}
          <Replies replies={comment?.replies} commentId={comment?.commentId} />
        </li>
      </ul>
    </div>
  );
};

export default CommentItem;
