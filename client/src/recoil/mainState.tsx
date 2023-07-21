import { atom } from "recoil";

//서치바검색
export const SearchValueAtom = atom<string>({
  key: "searchValueAtom",
  default: "",
});
//지역검색
export const LocationAtom = atom<string>({
  key: "shortAddressAtom",
  default: "",
});
//시설검색
export const FacilitiesAtom = atom<string>({
  key: "facilitiesAtom",
  default: "",
});
//감성검색
export const MoodAtom = atom<string>({
  key: "moodAtom",
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
