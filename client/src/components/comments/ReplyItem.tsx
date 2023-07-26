import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
// import { PostComment } from "../../types/type";
import { PostReplies } from "../../types/type";
// import { PostReply } from "../../types/type";
import { decodeToken } from "../../common/token/decodeToken";
import { baseURL } from "../../common/baseURL";
import { GetPostAtom } from "../../recoil/postState";
import { BsArrowReturnRight } from "react-icons/bs";
import { styled } from "styled-components";
import { COLOR_1 } from "../../common/common";

type ReplyItemProps = {
  reply: PostReplies;
  // currentPosts: PostComments[];
};
type InputData = {
  content: string;
};

type EditedReply = {
  content: string;
};

const S = {
  EditForm: styled.form`
    /* display: none;
    &.active {
      display: flex;
    } */
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
      margin-right: 14px;
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
    margin-left: 40px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${COLOR_1.light_gray};
  `,
};

const ReplyItem = ({ reply }: ReplyItemProps) => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState("");
  const setGetItem = useSetRecoilState(GetPostAtom);
  // const [editedText, setEditedText] = useState(comment.content);
  const token = localStorage.getItem("access_token");
  const decodedPayLoad = decodeToken(token);
  useEffect(() => {
    if (token) {
      setUser(decodedPayLoad.userId);
    }
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // formState: { errors }
  } = useForm<InputData>();

  const showEditReply = () => {
    //수정 창 보여주기
    setEditing((cur) => !cur);
  };

  useEffect(() => {
    if (editing) {
      setValue("content", reply.content);
    }
  }, [editing, setValue]);

  const editReply = (editedReply: EditedReply) =>
    axios.patch(`${baseURL}/replys/${reply.replyId}`, editedReply, {
      //replyId
      headers: { Authorization: localStorage.getItem("access_token") },
    });
  const editReplyMutation = useMutation({
    mutationFn: editReply,
    onSuccess: (data, context) => {
      console.log(context);
      console.log(data);
      reset();
      setEditing(false);
      setGetItem((prev) => !prev);
    },
  });
  // console.log(reply);

  const deleteReplyMutation = useMutation(async () => {
    return await axios
      .delete(`${baseURL}/replys/${reply.replyId}`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        // console.log(res);
        alert("삭제되었습니다.");
        setGetItem((prev) => !prev);
      });
  });

  const deleteReply = () => {
    if (
      confirm("삭제하신 댓글은 복구되지 않습니다. 정말로 삭제하시겠습니까?")
    ) {
      deleteReplyMutation.mutate();
    }
  };
  const onSubmitEdit = (content: InputData) => {
    const reply = { ...content };
    // console.log(reply);
    editReplyMutation.mutate(reply);
  };

  return (
    <div>
      <ul>
        {
          <li key={reply.replyId}>
            <S.FlexWrap>
              <S.Author>
                <span>
                  <BsArrowReturnRight />
                </span>
                <Link to={`../otherusermy/${reply.authorId}`}>
                  <span>{reply.author}</span>
                </Link>
              </S.Author>
              {user ? (
                user === reply.authorId ? (
                  <S.Edit>
                    <span
                      onClick={() => {
                        showEditReply();
                      }}
                    >
                      수정
                    </span>
                    <span
                      onClick={() => {
                        deleteReply();
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
                onSubmit={handleSubmit(onSubmitEdit)}
                // className={comment.commentId ? "active" : ""}
              >
                <input
                  type='text'
                  {...register("content", { required: true })}
                />
                <button type='submit'>등록</button>
              </S.EditForm>
            ) : (
              <S.Content>{reply.content}</S.Content>
            )}
          </li>
        }
      </ul>
    </div>
  );
};

export default ReplyItem;
