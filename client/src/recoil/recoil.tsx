import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type CafeType = {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  contact: string;
  notice?: string;
  cafeImg: File | string;
  rating: number;
  openTime: string;
  closeTime: string;
  facility: FacilityType[];
  post?: PostType[];
  menu?: MenuType[];
};
export type cafeType = {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  contact: string;
  notice?: string;
  cafeImg: File | string;
  rating: number;
  openTime: string;
  closeTime: string;
  isOpenAllTime: boolean;
  isChargingAvailable: boolean;
  hasParking: boolean;
  isPetFriendly: boolean;
  hasDessert: boolean;
  post?: PostType[];
  menu?: MenuType[];
};
export type FacilityType = {
  name: string;
  checked: boolean;
};

export type PostType = {
  //포스트 타입에 관해 작성
  postId: string;
  image: File | string;
  title: string;
  author: string;
};

export type MenuType = {
  id?: string;
  type: string;
  name: string;
  price: string;
  comment?: CommentType[];
};
export type CommentType = {
  id: string;
  memberId: string;
  content: string;
};
// 카페 정보를 담는 atom
export const AllcafeState = atom<CafeType[]>({
  key: 'AllcafeState',
  default: [],
});

export const cafeState = atom<CafeType>({
  key: 'cafeState',
  default: {
    id: 0,
    ownerId: 0,
    name: '',
    address: '',
    contact: '',
    notice: '',
    cafeImg: '',
    rating: 0,
    openTime: '',
    closeTime: '',
    facility: [],
    post: [],
    menu: [],
  },
});
const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
  converter: JSON,
});

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
