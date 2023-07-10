export interface CafePostList {
  postId: number;
  image: string;
  title: string;
  author: string;
}

export interface PostData {
  cafeId: number|string;
  title: string;
  createdAt: string;
  updatedAt: string;
  authorId: number|string;
  author: string;
  image: string|File;
  body: string;
  isBookmarked: boolean;
  tag?:[];
  comment: PostComment[];
}

export interface PostComment {
  authorId: number|string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}