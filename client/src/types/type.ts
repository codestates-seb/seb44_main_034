export interface CafePostList {
  postId: number;
  image: string;
  title: string;
  author: string;
}

export interface PostData {
  postId?: number;
  cafeId: number | string;
  cafeName: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  authorId: number | string;
  author: string;
  image: string | File;
  content: string;
  starRating: number | undefined;
  isBookmarked: boolean;
  tag?: string[];
  comment?: PostComment[];
}

export interface PostComment {
  authorId: number | string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export type CafeDetailType = {
  ownerId: number;
  cafeId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  contact: string;
  notice: string;
  image: string | null;
  rating: number;
  openTime: string;
  closeTime: string;
  hasParking: boolean;
  hasDessert: boolean;
  openAllTime: boolean;
  chargingAvailable: boolean;
  petFriendly: boolean;
};

export type MenuDataType = {
  menuId: number;
  name: string;
  price: number;
  menuType: string;
};
