import { useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { styled } from "styled-components";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
import { MenuDataType } from "../../types/type";
import { baseURL } from "../../common/baseURL";
interface MenuDetailsInfoProps {
  menu: MenuDataType[][];
}
const menuTypeName = ["시그니처", "커피", "논커피", "디저트"];

const CafeDetailMenu = ({ menu }: MenuDetailsInfoProps) => {
  // const [isLoading, setLoading] = useState(true);
  const [modifiedMenu, setModifiedMenu] = useState<MenuDataType[][]>([...menu]);
  const [selectedMenu, setSelectedMenu] = useState<MenuDataType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  const openModal = (menu: MenuDataType) => {
    setSelectedMenu(menu);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    try {
      const response = await axios.post(`${baseURL}/menu-comments/1`, {
        comment,
      });
      console.log(response.data);
      // const menuId = response.data.payload;
      // 화면에 반영
      console.log(setModifiedMenu);
    } catch (error) {
      console.error(error);
    }
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

      <Modal open={showModal} onClose={closeModal} center>
        {selectedMenu && (
          <div>
            <h3>{selectedMenu.name}</h3>
            <input
              type='text'
              value={comment}
              onChange={handleCommentChange}
              placeholder='댓글을 입력하세요'
            />
            <button onClick={addComment}>댓글 추가</button>
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
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  `,
  Menu: styled.div`
    width: 180px;
    height: 30px;
    background-color: ${COLOR_1.ivory};
    font-size: ${FONT_SIZE_1.normal_1};
    border-radius: 5px;
    border: 1px dotted ${COLOR_1.brown};
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;

    > span {
      color: ${COLOR_1.dark_sand};
    }

    &:hover {
      color: white;
      background-color: ${COLOR_1.brown};
    }
    @media screen and (max-width: 767px) {
      width: 150px;
      font-size: ${FONT_SIZE_1.normal_1};
      margin-bottom: 10px;
      margin-left: 10px;
    }
  `,
};
export default CafeDetailMenu;
