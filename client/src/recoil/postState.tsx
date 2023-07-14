import { atom } from 'recoil';
import { PostData } from '../types/type';


export const PostItemAtom = atom<PostData>({
  key:'postItemAtom',
  default:{
    cafeId: '',
    cafeName: '',
    postId: undefined,
    title: '',
    createdAt: '',
    updatedAt: '',
    authorId: '',
    author: '',
    image: '',
    content: '',
    starRating: 0,
    isBookmarked: false,
    tag:[],
    comment: []
  }
})
