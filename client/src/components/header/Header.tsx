import { Link } from 'react-router-dom';
import { COLOR_1 } from '../../common/common';
import Logo from '../../assets/Logo.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    width: 100%;
    height: 70px;
    margin: 0;
    display: flex;
    justify-content: center;
    > div {
      display: flex;
      justify-content: center;
      position: fixed;
      width: 100%;
      height: 70px;
      background-color: #ffffff;
      box-shadow: 0px 1px 3px 0px #676767;
      border-top: solid 1px ${COLOR_1.green};
      top: 0;
    }
  `,
  LogoBox: styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      height: 70px;
      width: 200px;
    }
  `,
};

const Header = () => {
  const reloadHandler = () => {
    window.location.reload();
  };
  return (
    <header>
      <S.Container>
        <div>
          <Link to='/' onClick={reloadHandler}>
            <S.LogoBox>
              <img src={Logo} />
            </S.LogoBox>
          </Link>
        </div>
      </S.Container>
    </header>
  );
};

export default Header;
