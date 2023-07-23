import { atom } from "recoil";
import { ReqPostData } from "../types/type";
import { PostCafeType } from "../types/type";

export const PostItemAtom = atom<ReqPostData>({
  key: "postItemAtom",
  default: {
    title: "",
    content: "",
    starRating: 0,
    tags: [],
  },
});

export const PostImgAtom = atom<string | null>({
  key: "postImgAtom",
  default: "",
});

export const PostCafeAtom = atom<PostCafeType>({
  key: "editPostAtom",
  default: {
    cafeName: "",
    cafeId: "",
  },
});

export const GetPostAtom = atom({
  key: "getPostAtom",
  default: false,
});
