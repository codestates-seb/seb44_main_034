import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2, FONT_WEIGHT } from '../../common/common';
import {data as dataAll} from '../../mockData/cafePost.json'
import PostThumbnail from '../../common/posting/PostThumbnail';
import { CafePostList } from '../../types/type';

// interface CafePostListProps {
//       data:CafePostList[];
// }
const PostingList = () => {
      const data= dataAll.post;
      return (
            <S.Container>
                  <S.PostStart><span>POST</span></S.PostStart>
                  <ul>
                        {data.map((el:CafePostList)=> <li key={el.postId}><PostThumbnail image={el.image} title={el.title} author={el.author} /></li>)}
                  </ul>

            </S.Container>
      )
}

const S={
      Container:styled.div`
      display: block;
      >ul{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 0;
      >li{
      margin: 20px;
      }
      }
      `,
      PostStart:styled.div`
      display:flex;
      justify-content: space-between;

      border-bottom: 1px solid ${COLOR_1.dark_brown};
      >span{
      color: ${COLOR_1.black};
      font-size: ${FONT_SIZE_1.big_4};
      }      

      `
}

export default PostingList;