import axios from 'axios';
// import { PostData } from '../types/type';
import { baseURL } from '../common/baseURL';

// export const postPageList = {};

export const createBaseUrl = axios.create({
  baseURL: `${baseURL}`,
});



export const getCafes = async (pageParam:number, shortAddress:string, facilities:string) => {

  const res = await createBaseUrl.get(`/cafes?${shortAddress}${facilities}&page=${pageParam}&size=8`, {
    headers: {
      // 'ngrok-skip-browser-warning': 'true'
    }
  });
  // const res = await createBaseUrl.get(`/posts/${Id}`);
  return res.data;
};