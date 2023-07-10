import { useParams } from 'react-router';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_2 } from '../common/common';
import PostItemHead from '../components/post/postItemHead.tsx';
import MoodTagPost from '../common/tags/MoodTagPost.tsx';
import PostItem from '../components/post/postItemHead.tsx';
import { data } from '../mockData/post.json';
import { Post } from '../types/type.ts';

const PostPage = () => {
  const postId=useParams();
  const postData= data.post[0];
  const tagData= data.tag;
  return (
    <S.Container>
      <div>
      <PostItemHead postData={postData}/>
      <S.TagWrap>
        <ul>
          {tagData.map((el:string, idx:number)=> <li key={idx}><MoodTagPost text={`# ${el}`} id={idx.toString()} /></li>)}
        </ul>
      </S.TagWrap>
      <S.EditWrap>
        <S.Edit>
          수정
        </S.Edit>
        <S.Edit>
          삭제
        </S.Edit>
      </S.EditWrap>

      <S.ImgWrap>
        <img src={postData.image} />
      </S.ImgWrap>
      <S.ContentWrap>
        {postData.body}
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
      width: 80vw;
    }
  `,
  ContentWrap:styled.div`
    display: block;
    padding: 30px 10px;
    white-space: pre-wrap;
  `,
  EditWrap:styled.div`
    color:grey;
    margin:0px 10px;
    display: flex;
    justify-content:flex-end;
    align-items:center;
  `,
  Edit:styled.span`
    margin: 4px 8px;
    font-size:${FONT_SIZE_2.normal_2};
  `,
}
  

  

export default PostPage;



