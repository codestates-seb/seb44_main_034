import axios from 'axios';
// import { PostData } from '../types/type';
import { baseURL } from '../common/baseURL';

export const postPageList = {};

export const createBaseUrl = axios.create({
  baseURL: ` ${baseURL}`,
});

export const getAllPosts = async (pageParam:number) => {
  const res = await createBaseUrl.get(`/posts?page=${pageParam}&size=8`, {
    headers: {
      'ngrok-skip-browser-warning': 'true'
    }
  });
  // const res = await createBaseUrl.get(`/posts/${Id}`);
  return res.data;
};

export const getPostDetailAPI = {
  getPostDetail: async (postId: string|undefined) => {
    const res = await createBaseUrl.get(`/posts/${postId}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    // const res = await axios.get(`http://localhost:3001/post`);
    const { data } = res.data;
    return data;
  },
};