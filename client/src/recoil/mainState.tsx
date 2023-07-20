import { atom } from 'recoil';

export const LocationAtom = atom<string>({
  key:'shortAddressAtom',
  default:''
})

export const FacilitiesAtom = atom<string>({
    key:'facilitiesAtom',
    default:''
})

export const HandleSearchAtom = atom({
    key:'handleSearchClick',
    default:false
})