import { useEffect } from 'react';

const Main = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorization = url.searchParams.get('access_token');
    const refresh = url.searchParams.get('refresh_token');
    console.log(authorization);
    console.log(refresh);
  });
  return <>메인</>;
};

export default Main;
