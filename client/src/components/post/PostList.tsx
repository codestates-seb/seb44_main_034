import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {data as dataAll} from '../../mockData/cafePost.json'
import { PostItemAtom } from '../../recoil/postState';
import { CafePostList } from '../../types/type';
import { PostData } from '../../types/type';
import PostThumbnail from '../../common/posting/PostThumbnail';
import PlusBtn from "../../common/posting/plusBtn";
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';
<<<<<<< HEAD

const PostingList = () => {
  const data= dataAll.post;
  const setPostData = useSetRecoilState<PostData>(PostItemAtom);

  const handleBtnCafeName = ():void => {
    setPostData((prev)=>({...prev, cafeName:'카페이름모름'})); //카페 이름과 id를 추가하여야 함.
  }

=======
import { data as dataAll } from '../../mockData/cafePost.json';
import PostThumbnail from '../../common/posting/PostThumbnail';
import { CafePostList } from '../../types/type';
import PlusBtn from '../../common/posting/plusBtn';

const PostingList = () => {
  const data = dataAll.post;
>>>>>>> 0786aaab0a688de7266f1243da3f9a272caeb1ff
  return (
    <S.Container>
      <S.PostStart>
        <span>POST</span>
<<<<<<< HEAD
        <Link to ='/postpage/create' ><PlusBtn text={'+'} handleEvent={handleBtnCafeName} /></Link>
=======
        <PlusBtn text={'+'} />
>>>>>>> 0786aaab0a688de7266f1243da3f9a272caeb1ff
      </S.PostStart>
      <ul>
        {data.map((el: CafePostList) => (
          <li key={el.postId}>
            <PostThumbnail
              image={el.image}
              title={el.title}
              author={el.author}
            />
          </li>
        ))}
      </ul>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: block;
    > ul {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      > li {
        margin: 20px;
        @media screen and (max-width: 500px) {
          margin: 10px;
        }
      }
    }
  `,
  PostStart: styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    border-bottom: 1px solid ${COLOR_1.dark_brown};
    @media screen and (max-width: 500px) {
      font-size: ${FONT_SIZE_1.big_1};
      margin: 10px;
      padding: 2px;
      height: 45px;
      border-bottom: 1px solid rgba(72, 50, 25, 0.5);
    }
    > span {
      margin-top: 10px;
      color: ${COLOR_1.black};
      font-size: ${FONT_SIZE_1.big_4};
      @media screen and (max-width: 500px) {
        font-size: ${FONT_SIZE_1.big_2};
      }
    }
  `,
};

export default PostingList;
