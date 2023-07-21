import axios from "axios";
// import { PostData } from '../types/type';
import { baseURL } from "../common/baseURL";

// export const postPageList = {};

export const createBaseUrl = axios.create({
  baseURL: `${baseURL}`,
});

export const getCafes = async (
  searchValue: string,
  pageParam: number,
  shortAddress: string,
  facilities: string,
  mood: string
) => {
  // if (searchBox) {
  //   const res = await createBaseUrl.get(`/cafes/${searchValue}&page=${pageParam}&size=8`, {
  //     headers: {
  //       // 'ngrok-skip-browser-warning': 'true'
  //         withCredentials: true,
  //     }
  //   });
  //   // const res = await createBaseUrl.get(`/posts/${Id}`);
  //   console.log(res.data);
  //   return res.data;
  // }
  // if (!searchBox) {
  const res = await createBaseUrl.get(
    `/cafes${searchValue}?${shortAddress}${facilities}${mood}&page=${pageParam}&size=8`,
    {
      headers: {
        // 'ngrok-skip-browser-warning': 'true'
        withCredentials: true,
      },
    }
  );
  // const res = await createBaseUrl.get(`/posts/${Id}`);
  console.log(res.data);
  return res.data;
};

// };
