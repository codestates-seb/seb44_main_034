import { useState } from "react";
import { useRecoilState } from "recoil";
import { SearchValueAtom } from "../../recoil/mainState";
import { HandleSearchAtom } from "../../recoil/mainState";
import { COLOR_1, FONT_SIZE_1 } from "../../common/common";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100vw;
    background-color: none;
    box-shadow: 0px 1px 1px 1px gray;
    @media screen and (min-width: 767px) {
      width: 768px;
    }
  `,
  Toggle: styled.div`
    margin-right: 10px;
    > span {
      font-size: ${FONT_SIZE_1.small_3};
      @media screen and (min-width: 767px) {
        width: 768px;
        font-size: ${FONT_SIZE_1.normal_3};
      }
      @media screen and (min-width: 380px) {
        width: 768px;
        font-size: ${FONT_SIZE_1.normal_2};
      }
    }
  `,
  InputBox: styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    > input {
      height: 40px;
      width: 74%;
      padding: 4px;
      border-radius: 15px;
      border: none;
      outline: none;
      background-color: ${COLOR_1.white};
      box-shadow: 0px 2px 2px 1px gray;
      font-size: ${FONT_SIZE_1.normal_3};
      cursor: pointer;
      &:hover {
        background-color: #efefef;
      }
      &:active {
        box-shadow: 0px 0px 1px 5px #e1e1e1;
      }
      @media screen and (min-width: 767px) {
        width: 500px;
      }
    }
  `,
  IconBox: styled.div`
    width: 26px;
    height: 24px;
    margin-left: 10px;
    cursor: pointer;
    @media screen and (min-width: 767px) {
      width: 50px;
    }
  `,
};

const SearchBox = () => {
  const [toggleName, setToggleName] = useState<string>("카페이름");
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useRecoilState<string>(SearchValueAtom);
  const [handleSearch, setHandleSearch] = useRecoilState(HandleSearchAtom);

  console.log(handleSearch);

  const handleToggleName = () => {
    setToggleName(toggleName === "카페이름" ? "메뉴이름" : "카페이름");
  };
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const handleSearchIcon = (toggle: string) => {
    if (toggle === "카페이름") {
      setSearchValue(`/search-cafe/${inputValue}`);
    }
    if (toggle === "메뉴이름") {
      setSearchValue(`/search-menu/${inputValue}`);
    }
    setHandleSearch((prev) => !prev);
  };
  console.log(searchValue);
  return (
    <S.Container>
      <S.InputBox>
        <S.Toggle
          onClick={() => {
            handleToggleName();
          }}
        >
          <span>{toggleName}</span>
        </S.Toggle>
        <input
          type={"text"}
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
      </S.InputBox>
      <S.IconBox>
        <BsSearch
          size='24'
          color='#23ec00'
          onClick={() => handleSearchIcon(toggleName)}
        />
      </S.IconBox>
    </S.Container>
  );
};

export default SearchBox;
