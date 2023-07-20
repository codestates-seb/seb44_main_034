import { useNavigate } from 'react-router-dom';
import { COLOR_1 } from '../../common/common';
import Logo from '../../assets/Logo.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    width: 100vw;
    z-index: 2;
    height: 70px;
    margin: 0;
    display: flex;
    justify-content: center;
    > div {
      display: flex;
      justify-content: center;
      position: fixed;
      width: 100vw;
      height: 70px;
      z-index: 2;
      background-color: #ffffff;
      box-shadow: 0px 1px 3px 0px #676767;
      border-top: solid 1px ${COLOR_1.green};
      top: 0;
    }
  `,
  LogoBox: styled.div`
    max-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > img {
      height: 70px;
      width: 200px;
    }
  `,
};

const Header = () => {
  const replace = useNavigate();
  const reloadHandler = () => {
    replace('/main');
    window.location.reload();
  };
  return (
    <header>
      <S.Container>
        <div>
          <S.LogoBox onClick={reloadHandler}>
            <img src={Logo} />
          </S.LogoBox>
        </div>
      </S.Container>
    </header>
  );
};

export default Header;
