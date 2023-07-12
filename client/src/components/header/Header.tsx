import { Link } from 'react-router-dom';
import { COLOR_1 } from '../../common/common';
import Logo from '../../assets/Logo.svg';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 70px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px 0px #676767;
    border-top: solid 1px ${COLOR_1.green};
    top: 0;
  `,
  LogoBox: styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 200px;
  `,
};

const Header = () => {
  return (
    <header>
      <S.Container>
        <Link to='/'>
          <S.LogoBox src={Logo} />
        </Link>
      </S.Container>
    </header>
  );
};

export default Header;
