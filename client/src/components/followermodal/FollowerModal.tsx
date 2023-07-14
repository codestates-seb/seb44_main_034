import { COLOR_1 } from '../../common/common';
import profileimg from '../../assets/profileimg.svg';
import styled from 'styled-components';
const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 180px;
    z-index: 1;
    position: absolute;
    border-radius: 10px;
    margin-top: 340px;
    border: solid 1px ${COLOR_1.light_gray};
    background-color: ${COLOR_1.ivory};
  `,
  SubContainer: styled.div`
    width: 170px;
    height: 250px;
  `,
  UserBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 160px;
    margin-top: 10px;
    border: solid 1px ${COLOR_1.light_gray};
    border-radius: 30px;
    background-color: ${COLOR_1.white};
  `,
  UserImg: styled.img`
    height: 50px;
    width: 50px;
    margin-left: 5px;
    border-radius: 25px;
  `,
  UserName: styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    width: 70px;
  `,
};

const FollowerModal = () => {
  return (
    <S.Container>
      <S.SubContainer>
        <S.UserBox>
          <S.UserImg src={profileimg}></S.UserImg>
          <S.UserName>나나</S.UserName>
        </S.UserBox>
      </S.SubContainer>
    </S.Container>
  );
};

export default FollowerModal;
