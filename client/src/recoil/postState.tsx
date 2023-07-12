import { atom } from 'recoil';
import { PostData } from '../types/type';


export const PostItemAtom = atom<PostData>({
  key:'postItemAtom',
  default:{
    cafeId: '',
    cafeName: '',
    title: '',
    createdAt: '',
    updatedAt: '',
    authorId: '',
    author: '',
    image: '',
    content: '',
    starRating: null,
    isBookmarked: false,
    tag:[],
    comment: []
  }
})
