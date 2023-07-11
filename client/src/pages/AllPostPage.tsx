import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../common/common';
import { data as dataAll } from '../mockData/cafePost.json';
import PostThumbnail from '../common/posting/PostThumbnail';
import { CafePostList } from '../types/type';
import PlusBtn from '../common/posting/plusBtn';

const ALlPostPage = () => {
  const data = dataAll.post;
  return (
    <S.Container>
      <S.PostStart>
        <span>POST</span>
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
    padding: 20px;
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

export default ALlPostPage;
