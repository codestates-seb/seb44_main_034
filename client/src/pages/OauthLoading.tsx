import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginState } from "../recoil/recoil";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import SyncLoader from "react-spinners/SyncLoader";

const Loading = styled.div`
  width: 90vw;
  text-align: center;
`;
const OauthLoading = () => {
  const replace = useNavigate();
  //Oauth로그인시
  const [login, setLogin] = useRecoilState(LoginState);
  const [authorization, setAuthorization] = useState<string | null>("");
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlAccessToken = url.searchParams.get("access_token");
    setAuthorization(urlAccessToken);
    if (urlAccessToken !== null && urlAccessToken.length >= 10) {
      localStorage.setItem("access_token", "Bearer " + authorization);
      localStorage.setItem("role_token", "member");
      setTimeout(() => {
        setLogin(true);
      }, 1000);
    }
  });
  if (login) {
    replace("/main");
  }
  return (
    <Loading>
      <SyncLoader color='#36d759'></SyncLoader>
    </Loading>
  );
};

export default OauthLoading;
