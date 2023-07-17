import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { COLOR_1, FONT_SIZE_1 } from '../../common/common';
import { MenuDataType } from '../../types/type';
import Loading from '../Loading';
interface MenuDetailsInfoProps {
  menu: MenuDataType[][];
}
const menuTypeName = ['시그니처', '커피', '논커피', '디저트'];

const CafeDetailMenu = ({ menu }: MenuDetailsInfoProps) => {
  const [isLoading, setLoading] = useState(true);
  const [modifiedMenu, setModifiedMenu] = useState<MenuDataType[][]>([...menu]);

  useEffect(() => {
    const lastMenu = modifiedMenu.pop();
    if (lastMenu) {
      modifiedMenu.unshift(lastMenu);
    }
    console.log(modifiedMenu);
    setLoading(false);
  }, [modifiedMenu]);

  return (
    <S.Container>
      {isLoading ? (
        <Loading /> // 로딩 페이지 표시)
      ) : (
        <>
          {modifiedMenu.map((menuGroup: any, index: number) => (
            <div key={index}>
              <S.MenuType>{menuTypeName[index]}</S.MenuType>
              <S.MenuDiv>
                {menuGroup.map((menuItem: any, subIndex: number) => (
                  <S.Menu key={subIndex}>
                    {menuItem.name}
                    <span>{menuItem.price}</span>
                  </S.Menu>
                ))}
              </S.MenuDiv>
            </div>
          ))}{' '}
        </>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    margin-top: 2%;
    flex-direction: column;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: column;
      justify-content: center;
    }
  `,
  MenuType: styled.div`
    width: 100px;
    margin-bottom: 1%;
    text-align: center;
    font-size: ${FONT_SIZE_1.normal_3};
    border-bottom: 2px solid ${COLOR_1.light_green};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.normal_1};
    }
  `,
  MenuDiv: styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  `,
  Menu: styled.div`
    width: 140px;
    height: 30px;
    background-color: ${COLOR_1.ivory};
    font-size: ${FONT_SIZE_1.normal_1};
    border-radius: 5px;
    border: 1px dotted ${COLOR_1.brown};
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;

    > span {
      color: ${COLOR_1.dark_sand};
    }

    &:hover {
      color: white;
      background-color: ${COLOR_1.brown};
    }
    @media screen and (max-width: 767px) {
      width: 130px;
      font-size: ${FONT_SIZE_1.normal_1};
      margin-bottom: 10px;
      margin-left: 10px;
    }
  `,
};
export default CafeDetailMenu;
