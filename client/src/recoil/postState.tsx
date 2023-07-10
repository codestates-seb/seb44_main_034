import { atom } from 'recoil';
import { PostData } from '../types/type';


export const postItemAtom = atom<PostData>({
  key:'',
  default:{
    cafeId: '',
    title: '',
    createdAt: '',
    updatedAt: '',
    authorId: '',
    author: '',
    image: '',
    body: '',
    isBookmarked: false,
    tag:[],
    comment: []
  }
})
