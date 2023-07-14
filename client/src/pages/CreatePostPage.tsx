import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import PostHead from '../components/post/PostHead';
import PostMood from '../components/post/PostMood';
import { PostItemAtom } from '../recoil/postState';
import { PostData } from '../types/type';
import { BiSolidCoffeeBean } from 'react-icons/bi';
// import { CiCoffeeBean } from "react-icons/ci";
import { ConfirmBtn } from '../common/button/button';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../common/common';

// type PostDataProps = {
//   postData: PostData;
// };

const S = {
  Container: styled.div`
    display: flex;
    min-height: 1000px;
    margin: 5%;
    > form {
      min-height: 1000px;
      @media screen and (max-width: 500px) {
        min-height: 1100px;
      }
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-height: 1000px;
        @media screen and (max-width: 500px) {
          min-height: 1100px;
        }
      }
    }
    @media screen and (max-width: 500px) {
      min-height: 1100px;
    }
  `,
  MoodAskWrap: styled.div`
    text-align: left;
  `,
  MoodAsk: styled.span`
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.normal_2};
  `,
  MoodWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  TagWrap: styled.div`
    margin: 8px 4px;
  `,
  RatingWrap: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: ${FONT_SIZE_1.big_2};
  `,
  Rate: styled.input`
    margin: 0 10px;
    text-align: center;
    width: 50px;
    color: ${COLOR_1.black};
    font-size: ${FONT_SIZE_1.big_2};
    border: 1px solid grey;
    &:focus {
      outline: none;
    }
  `,
  UploadBtn: styled.label`
    display: inline-block;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
  `,
  AddImg: styled.input``,
  BtnWrap: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
};

const CreatePostPage = () => {
  return <S.Container></S.Container>;
};

export default CreatePostPage;
