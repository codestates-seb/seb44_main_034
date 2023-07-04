import styled from 'styled-components';
import LightBrownBtn from '../../common/lightbrownbtn/LightBrownBtn';
import clienticon from '../../assets/clienticon.svg'
import ownericon from '../../assets/ownericon.svg'

const S = {
    Container : styled.div`
    height: 600px;
    width: 500px;
    display: flex;
    flex-direction: column;
    `,

    MainTitleBox : styled.div`
    width: 500px;
    height: 100px;
    `,

    SubBox : styled.div`
    display: flex;
    width: 500px;
    height: 500px;
    `,
    MainTitle : styled.div`
    height: 30px;
    `,
    SubTitle : styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    `,
    
    UserSubContainer : styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        width: 250px;
        border-radius: 20px 0px 0px 20px;
        background-color: #FDFAE3;
    `,
    OwnerSubContainer : styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        width: 250px;
        border-radius: 0px 20px 20px 0px;
        background-color: #EAEDCC;
    `,
    SubExplain : styled.div`
    height: 100px;
    width: 150px;
    `,
    ImgBox : styled.div`
    display: flex;
    justify-content: center;
        width: 250px;
        height: 200px;
    `,
    TextBox: styled.a`
        color: white;
    `
}

const SignupSelect = (props: string) => {
    return(
    <S.Container>
        <S.MainTitleBox>
            <S.MainTitle>회원가입</S.MainTitle>
        </S.MainTitleBox>
        <S.SubBox>
            <S.UserSubContainer>
                <S.SubTitle>개인회원</S.SubTitle>
                <S.ImgBox>
                <img width={150}src={clienticon}/>
                </S.ImgBox>
                <S.SubExplain>개인회원 가입하고,카페에 대한 포스트를 발행해보세요!</S.SubExplain>
                <LightBrownBtn>asdf</LightBrownBtn>
            </S.UserSubContainer>
            <S.OwnerSubContainer>
                <S.SubTitle>사업자</S.SubTitle>
                <S.ImgBox>
                <img width={150} src={ownericon}/>
                </S.ImgBox>
                <S.SubExplain>사업자 회원 가입하고, 내 카페를 등록해보세요!</S.SubExplain>
                <LightBrownBtn></LightBrownBtn>
            </S.OwnerSubContainer>    
        </S.SubBox>
    </S.Container>
    )
}

export default SignupSelect;