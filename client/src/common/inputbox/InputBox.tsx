import styled from 'styled-components';

const S = {
    CommonInput : styled.input`
        width: 250px;
        height: 50px;
        border-radius: 15px;
        border: solid 1px #a5a5a5;
        background-color: #CED5B2;
        cursor: pointer;

        &:hover{
        background-color: #c6cbb2; 
        }
        &:active{
        box-shadow: 0px 0px 1px 5px #e1e1e1;
        }
    `
    
}

const InputBox = () => {
    return(
        <S.CommonInput></S.CommonInput>
    )
}

export default InputBox;