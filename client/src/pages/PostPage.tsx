import { useParams } from 'react-router';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1, FONT_SIZE_2, FONT_WEIGHT } from '../common/common';
import PostItemHead from '../components/post/postItemHead.tsx';
import MoodTagPost from '../common/tags/MoodTagPost.tsx';
import PostItem from '../components/post/postItemHead.tsx';
import { data } from '../mockData/post.json';
import { PostData } from '../types/type.ts';
import StarRating from '../components/starRating.tsx';

const PostPage = () => {
  const postId=useParams();
  const postData= data.post[0];
  const tagData= data.tag;

  return (
    <S.Container>
      <div>
      <PostItemHead postData={postData}/>
      <S.StarRatingWrap>
        <StarRating starRating={postData.starRating} size={FONT_SIZE_2.normal_3} color={COLOR_1.brown} />
        <div>
          <span>
          {` 별점 ${postData.starRating}점`}
          </span>
        </div>
      </S.StarRatingWrap>
      <S.TagWrap>
        <ul>
          {tagData.map((el:string, idx:number)=> <li key={idx}><MoodTagPost text={`# ${el}`} /></li>)}
        </ul>
      </S.TagWrap>
      <S.ImgWrap>
        <img src={postData.image} />
      </S.ImgWrap>
      <S.ContentWrap>
        {postData.content}
      </S.ContentWrap>
      </div>
    </S.Container>
  )
}

const S={
  Container:styled.div`
    display: block;
    >div{
      display: flex;
      flex-direction:column;
      justify-content:space-around;
      padding: 20px;
    }
  `,

  StarRatingWrap:styled.div`
    margin-left: 4px;
    margin-top: 4px;
    height:24px;
    display: flex;
    align-items:center;
    @media screen and (max-width: 767px) {
      height:18px;
    }
    >div {
      margin-left: 10px;
      height:24px;
      @media screen and (max-width: 767px) {
        height:18px;
      }
      >span {
      font-size:${FONT_SIZE_1.normal_1};
      color:${COLOR_1.dark_sand};
    }
    }
  `,
  TagWrap:styled.div`
    display: block;
    margin-top:4px;
    >ul{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 0;
        >li{
          margin: 0 20px;
          @media screen and (max-width: 500px) {
          margin: 0 10px;
          }
        }
      }
  `,
  ImgWrap:styled.div`
    padding: 14px 10px;
    text-align:center;
    >img{
      width: 100%;
    }
  `,
  ContentWrap:styled.div`
    display: block;
    padding: 30px 10px;
    white-space: pre-wrap;
  `,
}

export default PostPage;



