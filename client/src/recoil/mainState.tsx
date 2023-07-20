import { atom } from 'recoil';

//서치바검색
export const SearchBoxAtom = atom<string>({
  key:'searchBoxAtom',
  default:''
})
//지역검색
export const LocationAtom = atom<string>({
  key:'shortAddressAtom',
  default:''
})
//시설검색
export const FacilitiesAtom = atom<string>({
    key:'facilitiesAtom',
    default:''
})
//searchBox 눌렀을 때
export const HandleSearchBoxAtom = atom({
  key:'handleSearchBox',
  default:false
})
//search 눌렀을 때
export const HandleSearchAtom = atom({
    key:'handleSearchClick',
    default:false
})