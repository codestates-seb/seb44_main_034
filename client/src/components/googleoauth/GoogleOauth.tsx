import { Link } from "react-router-dom";
import { FONT_SIZE_1 } from "../../common/common";
import { FcGoogle } from "react-icons/fc";
import { styled } from "styled-components";
import { baseURL } from "../../common/baseURL";

const S = {
  Oauthbutton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 80vw;
    border-radius: 15px;
    background-color: #fafafa;
    font-weight: 600;
    font-size: ${FONT_SIZE_1.normal_2};
    margin-bottom: 10px;
    &:hover {
      background-color: #e3e3e3;
    }
    &:active {
      box-shadow: 0px 0px 1px 5px #e1e1e1;
    }
    @media screen and (min-width: 550px) {
      width: 470px;
    }
  `,
};

const GoogleLoginButton: React.FC = () => {
  return (
    <Link to={`${baseURL}/oauth2/authorization/google`}>
      <S.Oauthbutton>
        <FcGoogle size='20' />
        Log in with Google
      </S.Oauthbutton>
    </Link>
  );
};

export default GoogleLoginButton;
