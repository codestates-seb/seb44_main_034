import axios from 'axios';
import { PostData } from '../types/type';
import { baseURL } from '../common/baseURL';

export const postPageList = {

}

export const createBaseUrl = axios.create({
  baseURL: ` ${baseURL}`
})

export const getAllPosts = async (pageParam = 1) => {
  const res = await createBaseUrl.get(`posts?page=${pageParam}&size=8`);
  // const res = await createBaseUrl.get(`${baseURL}/posts/${Id}`);
 
  return res.data;
}

export const getPostDetailAPI = {

  getPostDetail: async (postId: string) => {
    const res = await axios.get(`${baseURL}/posts/${postId}`);
    const { data } = res.data;
    return data;
  },
};


// export const cafePostList = {
//   get:
//   (cafeId:string|number)=> axios.get(`${baseURL}/${cafeId}`),
// }

// export const postPage = {
//   get:
//     (postId:string)=> axios.get(`${baseURL}/${postId}`),
//   post:
//     (data:PostData)=>axios.post(`${baseURL}/cafeId`, data),
//   put:
//     (data:PostData, postId:string)=>axios.put(`${baseURL}/api/posts/${postId}`, data),
//   delete:
//     (postId:number)=> axios.delete(`${baseURL}/api/posts/${postId}`)
// }