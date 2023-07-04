import styled from 'styled-components';

const S = {
    CommonBeigeBtn : styled.button`
        width: 250px;
        height: 50px;
        border-radius: 15px;
        border: none;
        background-color: #F8EDD0;
        color : white;
        font-size: 20px;
        cursor: pointer;

        &:hover{
        background-color: #dfd1a3; 
        }
        &:active{
        box-shadow: 0px 0px 1px 5px #e1e1e1;
        }
    `
    
}

const BeigeBtn = () => {
    return(
        <S.CommonBeigeBtn></S.CommonBeigeBtn>
    )
}

export default BeigeBtn;