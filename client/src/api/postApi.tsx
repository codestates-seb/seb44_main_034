import axios from 'axios';
// import { PostData } from '../types/type';
import { baseURL } from '../common/baseURL';

export const postPageList = {};

export const createBaseUrl = axios.create({
  baseURL: ` ${baseURL}`,
});

export const getAllPosts = async (pageParam:number) => {
  const res = await createBaseUrl.get(`/posts?page=${pageParam}&size=8`);
  // const res = await createBaseUrl.get(`/posts/${Id}`);
  console.log(res.data);
  return res.data;
};

export const getPostDetailAPI = {
  getPostDetail: async (postId: string) => {
    const res = await createBaseUrl.get(`/posts/${postId}`);
    // const res = await axios.get(`http://localhost:3001/post`);
    const { data } = res.data;
    return data;
},

};