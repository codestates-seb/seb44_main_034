import styled from 'styled-components';

const S = {
    CommonLBBtn : styled.button`
        width: 200px;
        height: 50px;
        border-radius: 15px;
        border: none;
        background-color: #CCA57A;
        color : white;
        font-size: 20px;
        cursor: pointer;

        &:hover{
        background-color: #a57d52; 
        }
        &:active{
        box-shadow: 0px 0px 1px 5px #e1e1e1;
        }
    `
    
}

const LightBrownBtn = () => {
    return(
        <S.CommonLBBtn></S.CommonLBBtn>
    )
}

export default LightBrownBtn;