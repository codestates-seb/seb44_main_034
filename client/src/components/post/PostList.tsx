import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {data as dataAll} from '../../mockData/cafePost.json'
import { PostCafeAtom } from '../../recoil/postState';
import { CafePostList } from '../../types/type';
import { PostCafeType } from '../../types/type';
import PostThumbnail from '../../common/post/PostThumbnail';
import PlusButton from '../../common/post/plusButton';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';

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
}

const PostingList = () => {
  const data= dataAll.post;
  const setPostData = useSetRecoilState<PostCafeType>(PostCafeAtom);

  const handleBtnCafeName = ():void => {
    setPostData((prev)=>({...prev, cafeName:'카페이름모름'})); //카페 이름과 id를 추가하여야 함.
  }
  return (
    <S.Container>
      <S.PostStart>
        <span>POST</span>
        <Link to ='/postpage/create'><PlusButton text={'+'} handleEvent={handleBtnCafeName} /></Link>
      </S.PostStart>
      <ul>
        {data.map((el: CafePostList) => (
          <li key={el.postId}>
            <Link to={`postpage/${el.postId}`} >
            <PostThumbnail
              image={el.image}
              title={el.title}
              author={el.author}
            />
            </Link>
          </li>
        ))}
      </ul>
    </S.Container>
  );
}

export default PostingList;
