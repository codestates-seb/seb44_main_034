import { atom } from "recoil";
//리팩토링 필요함
//서치바검색
export const SearchValueAtom = atom<string>({
  key: "searchValueAtom",
  default: "",
});
export const SearchValueStateAtom = atom<string>({
  key: "searchValueStateAtom",
  default: "",
});
//지역검색
export const LocationAtom = atom<string>({
  key: "shortAddressAtom",
  default: "",
});
export const LocationStateAtom = atom<string>({
  key: "shortAddressStateAtom",
  default: "",
});
//시설검색
export const FacilitiesAtom = atom<string>({
  key: "facilitiesAtom",
  default: "",
});
export const FacilitiesStateAtom = atom<string>({
  key: "facilitiesStateAtom",
  default: "",
});
//감성검색
export const MoodAtom = atom<string>({
  key: "moodAtom",
  default: "",
});
export const MoodStateAtom = atom<string>({
  key: "moodStateAtom",
  default: "",
});
// //searchBox 눌렀을 때
// export const HandleSearchBoxAtom = atom({
//   key:'handleSearchBox',
//   default:false
// })
//search 눌렀을 때
export const HandleSearchAtom = atom({
  key: "handleSearchClick",
  default: false,
});
