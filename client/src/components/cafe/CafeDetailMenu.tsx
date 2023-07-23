import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { styled } from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
import { MenuDataType } from "../../types/type";
import { baseURL } from "../../common/baseURL";
import "../../menuModal.css";
import { BiCommentX } from "react-icons/bi";
import { decodeToken } from "../../common/token/decodeToken";

interface MenuDetailsInfoProps {
  menu: MenuDataType[][];
}
const menuTypeName = ["시그니처", "커피", "논커피", "디저트"];

const CafeDetailMenu = ({ menu }: MenuDetailsInfoProps) => {
  // const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  // const [modifiedMenu, setModifiedMenu] = useState<MenuDataType[][]>([...menu]);
  const [selectedMenu, setSelectedMenu] = useState<MenuDataType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showComment, setShowComment] = useState([]);
  const [comment, setComment] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editingComments, setEditingComments] = useState<{
    [key: number]: boolean;
  }>({});

  // const [userId, setUserId] = useState([]);
  const modifiedMenu = [...menu];
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decodedPayload = decodeToken(token);
    setUserId(decodedPayload.userId);
  }, []);

  const getComments = async (menuId: number) => {
    try {
      const response = await axios.get(`${baseURL}/menus/${menuId}`);
      const menuDetailData = response.data.payload;
      console.log("처음 모달창 열었을 때:", menuDetailData);
      setShowComment(menuDetailData.comments);

      const editingCommentsInit: { [key: number]: boolean } = {};
      menuDetailData.comments.forEach((comment: any) => {
        editingCommentsInit[comment.id] = false;
      });
      setEditingComments(editingCommentsInit);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = async (menu: MenuDataType) => {
    setSelectedMenu(menu);
    setShowModal(true);
    await getComments(menu.menuId);
  };

  const closeModal = () => {
    setShowModal(false);
    setComment("");
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleEditButtonClick = (commentId: number, content: string) => {
    // 댓글 내용을 상태 변수에 저장합니다.
    setEditedContent(content);
    setEditingComments((prevEditingComments) => ({
      ...prevEditingComments,
      [commentId]: true,
    }));
  };

  const addComment = async () => {
    try {
      const canAddComment = !showComment.some(
        (comment) => comment.memberId === userId
      );
      console.log(canAddComment);
      if (canAddComment) {
        const response = await axios.post(
          `${baseURL}/menu-comments/${selectedMenu.menuId}`,
          {
            content: comment,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
          }
        );

        console.log("댓글전송");
        console.log({ content: comment });
        const menuId = response.data.payload; // 새로운 댓글의 ID

        // 새로운 댓글의 ID를 이용하여 서버에서 댓글 정보를 가져옵니다.
        const commentResponse = await axios.get(`${baseURL}/menus/${menuId}`);
        const newComment = commentResponse.data.payload.comments; // 서버로부터 받은 새로운 댓글 정보
        console.log(
          "post 작성 후 메뉴 get 요청:",
          commentResponse.data.payload
        );
        console.log("post 작성 후 댓글 등록상태 :", newComment[0]);
        // 기존 댓글 상태에 새로운 댓글을 추가합니다.

        setShowComment(newComment);
        //setShowComment((prevComments) => prevComments.concat(comment));
        //setShowComment((prevComments) => prevComments.concat(newComment)); // 이부분도 수정해야함
        // 댓글 추가 후 입력 창 초기화
        setComment("");
      } else {
        alert("1메뉴 1댓글!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveButtonClick = async (commentId: number) => {
    try {
      // 댓글을 업데이트하는 PATCH 요청을 보냅니다.
      await axios.patch(
        `${baseURL}/menu-comments/${commentId}`,
        { content: editedContent }, // 수정된 댓글 내용을 전송합니다.
        {
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );

      // 상태의 댓글을 새로운 내용으로 업데이트합니다.
      setShowComment((prevComments) =>
        prevComments.map((comment: any) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );

      // 댓글의 수정 상태를 false로 변경합니다.
      setEditingComments((prevEditingComments) => ({
        ...prevEditingComments,
        [commentId]: false,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await axios.delete(`${baseURL}/menu-comments/${commentId}`, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      });

      setShowComment((prevComments) =>
        prevComments.filter((comment: any) => comment.id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const isCurrentUserCommentAuthor = (authorId: string) => {
    return userId === authorId;
  };
  return (
    <S.Container>
      <>
        {modifiedMenu.map((menuGroup: any, index: number) => (
          <div key={index}>
            <S.MenuType>{menuTypeName[index]}</S.MenuType>
            <S.MenuDiv>
              {menuGroup.map((menuItem: any, subIndex: number) => (
                <S.Menu key={subIndex} onClick={() => openModal(menuItem)}>
                  {menuItem.name}
                  <span>{menuItem.price}</span>
                </S.Menu>
              ))}
            </S.MenuDiv>
          </div>
        ))}
      </>

      <Modal
        open={showModal}
        onClose={closeModal}
        center
        classNames={{
          modal: "customModal",
        }}
      >
        {selectedMenu && (
          <div>
            <S.ModalTitle>{selectedMenu.name}</S.ModalTitle>
            <S.ModalBody>
              {showComment.length > 0 ? (
                <S.CommentDiv>
                  {showComment.map((comment, index) => (
                    <S.Comment key={index}>
                      {!editingComments[comment.id] ? (
                        <p>{comment.content}</p>
                      ) : (
                        // 수정 중일 때는 입력 필드를 보여줍니다.
                        <S.EditInput
                          type='text'
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                        />
                      )}
                      <div>
                        <span>{comment.author}</span>
                        {isCurrentUserCommentAuthor(comment.memberId) && (
                          <div>
                            {!editingComments[comment.id] ? (
                              <S.Edit
                                onClick={() =>
                                  handleEditButtonClick(
                                    comment.id,
                                    comment.content
                                  )
                                }
                              >
                                수정
                              </S.Edit>
                            ) : (
                              <S.Edit
                                onClick={() =>
                                  handleSaveButtonClick(comment.id)
                                }
                              >
                                저장
                              </S.Edit>
                            )}
                            {/* Delete Button */}
                            <S.Delete
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              삭제
                            </S.Delete>
                          </div>
                        )}
                      </div>
                    </S.Comment>
                  ))}
                </S.CommentDiv>
              ) : (
                <S.NotComment>
                  <S.CommentX />
                  <p> 댓글이 없습니다!</p>
                </S.NotComment>
              )}
            </S.ModalBody>

            <S.CommentInput
              type='text'
              value={comment}
              onChange={handleCommentChange}
              placeholder='댓글을 입력하세요'
            />
            <S.ButtonDiv>
              <S.CommentAddBtn onClick={addComment}>댓글 추가</S.CommentAddBtn>
            </S.ButtonDiv>
          </div>
        )}
      </Modal>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    margin-top: 2%;
    flex-direction: column;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: column;
      justify-content: center;
    }
  `,
  MenuType: styled.div`
    width: 100px;
    margin-bottom: 1%;
    text-align: center;
    font-size: ${FONT_SIZE_1.normal_3};
    border-bottom: 2px solid ${COLOR_1.light_green};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_1};
      margin: auto;
      margin-bottom: 2%;
    }
  `,
  MenuDiv: styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }
  `,
  Menu: styled.div`
    width: 152px;
    height: 30px;
    background-color: ${COLOR_1.ivory};
    font-size: ${FONT_SIZE_1.normal_1};
    border-radius: 5px;
    /* border: 1px dotted ${COLOR_1.brown}; */
    box-shadow: 2px 2px 4px ${COLOR_1.brown};
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
    overflow: hidden;

    > span {
      color: ${COLOR_1.dark_sand};
      text-shadow: 1px 1px 1px ${COLOR_1.dark_brown};
    }

    &:hover {
      color: white;
      background-color: ${COLOR_1.brown};
    }
    &:active {
      transform: translateY(2px);
    }
    @media screen and (max-width: 767px) {
      height: 30px;
      padding: 3px;
      width: 135px;
      font-size: ${FONT_SIZE_1.normal_1};
      margin-bottom: 20px;
      margin-right: 0px;
      margin-left: 15px;
    }
  `,
  ModalTitle: styled.div`
    font-size: 28px;
    text-align: center;
    margin-bottom: 10px;
    @media screen and (max-width: 767px) {
      font-size: 18px;
    }
  `,
  ModalBody: styled.div`
    background-color: ${COLOR_1.white};
    width: 400px;
    height: 440px;
    display: flex;
    flex-direction: column;
    border: 2px solid ${COLOR_1.sand};
    overflow-y: auto;

    border-radius: 5px;
    @media screen and (max-width: 767px) {
      width: 200px;
      height: 190px;
      font-size: 2px;
    }
  `,
  CommentDiv: styled.div`
    padding: 10px;
    font-size: 18px;
    /* border-bottom: 2px solid ${COLOR_1.brown}; */

    @media screen and (max-width: 767px) {
      font-size: 2px;
    }
  `,
  Comment: styled.div`
    border-bottom: 1px solid ${COLOR_1.brown};
    padding: 5px;
    display: flex;

    flex-direction: column;
    justify-content: start;
    > div {
      display: flex;
      justify-content: space-between;
    }
    > p {
      font-size: 16px;
    }
    > span {
      font-size: 12px;
      color: ${COLOR_1.dark_brown};
    }
  `,
  Edit: styled.span`
    font-size: 10px;
    padding: 8px;
    border-radius: 10px;
    margin-right: 2px;
    &:hover {
      background-color: ${COLOR_1.light_green};
      cursor: pointer;
    }
  `,
  Delete: styled.span`
    font-size: 10px;
    padding: 8px;
    border-radius: 10px;
    &:hover {
      background-color: ${COLOR_1.light_red};
      cursor: pointer;
    }
  `,
  EditInput: styled.input`
    height: 30px;
    padding: 5px;
  `,
  CommentInput: styled.input`
    border: none;
    width: 380px;
    height: 30px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    border: 2px solid ${COLOR_1.sand};
    @media screen and (max-width: 767px) {
      width: 190px;
      height: 20px;
      padding: 5px;
      font-size: 4px;
      margin-bottom: 10px;
    }
  `,
  ButtonDiv: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  CommentAddBtn: styled.button`
    border: none;
    width: 120px;
    height: 30px;
    font-family: "TheJamsil5Bold";
    background-color: ${COLOR_1.brown};
    color: white;
    border-radius: 10px;
    box-shadow: 2px 4px 6px gray;
    &:active {
      transform: translateY(2px);
    }
    @media screen and (max-width: 767px) {
      width: 60px;
      height: 20px;
      padding: 5px;
      font-size: 4px;
    }
  `,
  NotComment: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: row;
    font-size: 20px;
    @media screen and (max-width: 767px) {
      padding: 5px;
      font-size: 10px;
    }
  `,

  CommentX: styled(BiCommentX)`
    width: 30px;
    height: 30px;
    @media screen and (max-width: 767px) {
      width: 20px;
      height: 20px;
    }
  `,
};
export default CafeDetailMenu;
