import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { COLOR_1 } from "../../common/common";
import { Modal } from "react-responsive-modal";
import { baseURL } from "../../common/baseURL";
import Button from "../../common/button/button";
const DeleteCafe = ({ cafeId }: { cafeId: string | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDeleteCafe = () => {
    // axios를 사용하여 삭제 요청 보내기
    axios
      .delete(`${baseURL}/cafes/${cafeId}`, {
        data: { password },
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        console.log("카페 삭제 요청 성공:", response.data);
      })
      .catch((error) => {
        console.error("카페 삭제 요청 실패:", error);

        // 삭제 요청이 실패했을 때 비밀번호가 틀렸다 안내
      });

    // 모달 닫기
    handleCloseModal();
  };

  return (
    <>
      <CafeDeleteBtn onClick={handleOpenModal}>내 카페 삭제하기</CafeDeleteBtn>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        center
        styles={modalStyles}
      >
        <ModalDiv>
          <ModalHeader>카페를 삭제하시겠습니까?</ModalHeader>
          <ModalContent>카페 삭제를 위해 비밀번호를 입력해주세요</ModalContent>
          <PasswordInput
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </ModalDiv>
        <ButtonDiv>
          <Button
            type='button'
            text='삭제'
            theme='Confirm'
            onClick={handleDeleteCafe}
          />
          <Button
            type='button'
            text='취소'
            theme='Cancel'
            onClick={handleCloseModal}
          />
        </ButtonDiv>
      </Modal>
    </>
  );
};

const modalStyles = {
  modal: {
    // 모달 전체 스타일
    // 예시:
    width: "420px",
    height: "210px",
    borderRadius: "20px",
    padding: "20px",
  },
};
const ModalDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ModalHeader = styled.div`
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_1.dark_brown};
  font-size: 20px;
  font-weight: bold;
  padding: 2px;
  border-bottom: 4px solid ${COLOR_1.dark_sand};
`;
const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`;
const PasswordInput = styled.input`
  width: 200px;
  padding: 8px;
  margin-bottom: 20px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CafeDeleteBtn = styled.button`
  width: 105px;
  height: 32px;
  border-radius: 20px;
  background-color: ${COLOR_1.light_red};
  color: white;
  border: none;
  margin-left: 10px;
  font-family: "TheJamsil5Bold";
  box-shadow: 1px 2px 4px #7c6881;
  & :hover {
    cursor: pointer;
  }
`;
export default DeleteCafe;
