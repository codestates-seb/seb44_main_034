export interface CafePostList {
  postId: number;
  image: string;
  title: string;
  author: string;
}

export interface PostData {
  postId?:number|string;
  cafeId: number|string;
  cafeName:string;
  title: string;
  createdAt: string;
  updatedAt: string;
  authorId: number|string;
  author: string;
  image: string|File;
  content: string;
  starRating: number|null;
  isBookmarked: boolean;
  tag?:string[];
  comment?: PostComment[];
}

export interface PostComment {
  authorId: number|string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}