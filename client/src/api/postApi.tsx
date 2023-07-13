import axios from 'axios';
import { PostData } from '../types/type';
import { baseURL } from '../common/baseURL';

export const postPageList = {

}

export const cafePostList = {
  get:
  (cafeId:string|number)=> axios.get(`${baseURL}/${cafeId}`),
}

export const postPage = {
  get:
    (postId:string)=> axios.get(`${baseURL}/${postId}`),
  post:
    (data:PostData)=>axios.post(`${baseURL}/cafeId`, data),

}