import { useEffect } from 'react';
import MoodTag from "../common/tags/MoodTag.tsx";
import { DgText } from "../common/Row.component.tsx";

const Main = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorization = url.searchParams.get('access_token');
    const refresh = url.searchParams.get('refresh_token');
    console.log(authorization);
    console.log(refresh);
  });
  return (<div>
    메ddd인
  <MoodTag
  id={'123123123'}
  text={'123sa'}
  handleEvent={()=> console.log(1)}
  />

    <DgText type={'maximum_30_bold'}>asdasdas</DgText>
  </div>);
};

export default Main;
