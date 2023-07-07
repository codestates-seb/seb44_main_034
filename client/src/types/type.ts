export interface CafePostList {
  postId: number;
  image: string;
  title: string;
  author: string;
}
export interface Post {
  cafeName:string,
  title:string,
  createdAt:string,
  updatedAt:string,
  authorId:number,
  author:string,
  image:string,
  body:string,
  isBookmarked:boolean
}