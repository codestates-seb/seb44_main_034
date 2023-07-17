import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/button/button';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_2, FONT_SIZE_1 } from '../../common/common';
import { cafeType } from '../../recoil/recoil';
import { baseURL } from '../../common/baseURL';
const facilityName = [
  '24시간 운영여부',
  '콘센트 유무',
  '주차공간',
  '동물 출입 가능 여부',
  '디저트 판매 여부',
];
const CafeInfo = () => {
  // const [cafes, setCafes] = useRecoilState(AllcafeState);
  const navigate = useNavigate();
  const [CafeData, setCafeData] = useState<cafeType>({
    name: '',
    address: '',
    contact: '',
    latitude: 1234.0,
    longitude: 1234.0,
    notice: '',
    openTime: '',
    closeTime: '',
    isOpenAllTime: false,
    isChargingAvailable: false,
    hasParking: false,
    isPetFriendly: false,
    hasDessert: false,
  });
  // const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const selectedFile = event.target.files?.[0];
    // if (selectedFile) {
    //   setImageFile(selectedFile);
    //   console.log(imageFile);
    // }
  };
  // const handleSaveImg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     if (e.target) {
  //       setCafeImg(e.target.result);
  //     }
  //   };
  //   if (e.target.files) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // const saveCafe = (cafe: CafeType) => {
  //   setCafes((prevCafes) => [...prevCafes, cafe]);
  // };
  const handleCafeInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setCafeData((prevCafeData) => ({
        ...prevCafeData,
        [name]: checked,
      }));
    } else {
      setCafeData((prevCafeData) => ({
        ...prevCafeData,
        [name]: value,
      }));
    }
  };

  /* 이미지를 전송하고 받은 Url로 Cafedata 를 요청보내는게 맞는건지 */
  const handleSaveCafeInfo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = {
      dto: CafeData,
    };

    // if (imageFile) {
    //   console.log(imageFile);
    //   const formData = new FormData();
    //   console.log(formData);
    //   formData.append('image', imageFile);
    // }
    try {
      // const responseImg = await axios.post(
      //   'http://localhost:3001/cafes',
      //   FormData
      // );
      // if (responseImg.status === 201) {
      //   //이미지 업로드 성공일 때
      //   const cafeDataWithImage = {
      //     ...CafeData,
      //     cafeImg: responseImg.data.imageUrl,
      //   };

      const response = await axios.post(`${baseURL}/cafes`, data, {
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token'),
        },
      });
      // const response = await axios.post('http://localhost:3000/add', data);
      // console.log(response.data.imageUrl);
      console.log(response.data);
      const cafeId = response.data.id;
      alert('카페 정보 등록이 완료 되었습니다. 메뉴 등록 페이지로 이동합니다');
      navigate(`/addmenus/${cafeId}`);
      // } else {
      //   throw new Error('Image upload failed');
      // }
      console.log('성공');
    } catch (error) {
      console.error(error);
      // alert('Image upload failed');
    }
    // saveCafe(CafeData);
    // console.log(cafes);
  };

  return (
    <>
      <form onSubmit={handleSaveCafeInfo}>
        <S.MainDiv>
          <S.AddImageDiv>
            <input type='file' onChange={handleFileChange} />
            {/* <input
              type='file'
              accept='image/*'
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={handleSaveImg}
            /> */}
            {/* <S.ImageShow alt='대표 카페 사진' src={cafeImg} /> */}
          </S.AddImageDiv>

          {/* <AddImage onClick={handleButtonClick} /> */}
          <S.AddCafeInfoDiv>
            <S.CafeName
              type='text'
              name='name'
              placeholder='카페명을 입력해주세요'
              value={CafeData.name}
              onChange={handleCafeInfoChange}
              required
            />
            <S.CafeInputLabel>
              OPEN :
              <CafeBusinessHours
                type='text'
                placeholder='9:00'
                value={CafeData.openTime}
                name='openTime'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeInputLabel>
              CLOSE :
              <CafeBusinessHours
                type='text'
                placeholder='22:00'
                value={CafeData.closeTime}
                name='closeTime'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeInputLabel>
              주소 :
              <CafeAddress
                type='text'
                value={CafeData.address}
                name='address'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeInputLabel>
              연락처 :
              <CafeContact
                type='text'
                value={CafeData.contact}
                name='contact'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeNoticeDiv>
              공지사항
              <CafeNotice
                type='text'
                value={CafeData.notice}
                name='notice'
                onChange={handleCafeInfoChange}
              />
            </S.CafeNoticeDiv>
            <S.CafeFacilityDiv>
              <S.CafeFacilitySpan>
                <S.CafeFacility
                  type='checkbox'
                  name='isOpenAllTime'
                  onChange={handleCafeInfoChange}
                />
                {facilityName[0]}
              </S.CafeFacilitySpan>
              <S.CafeFacilitySpan>
                <S.CafeFacility
                  type='checkbox'
                  name='isChargingAvailable'
                  onChange={handleCafeInfoChange}
                />
                {facilityName[1]}
              </S.CafeFacilitySpan>
              <S.CafeFacilitySpan>
                <S.CafeFacility
                  type='checkbox'
                  name='hasParking'
                  onChange={handleCafeInfoChange}
                />
                {facilityName[2]}
              </S.CafeFacilitySpan>
              <S.CafeFacilitySpan>
                <S.CafeFacility
                  type='checkbox'
                  name='isPetFriendly'
                  onChange={handleCafeInfoChange}
                />
                {facilityName[3]}
              </S.CafeFacilitySpan>
              <S.CafeFacilitySpan>
                <S.CafeFacility
                  type='checkbox'
                  name='hasDessert'
                  onChange={handleCafeInfoChange}
                />
                {facilityName[4]}
              </S.CafeFacilitySpan>
            </S.CafeFacilityDiv>
          </S.AddCafeInfoDiv>
        </S.MainDiv>
        <S.ButtonDiv>
          {/* <AddImage onClick={handleButtonClick} /> */}
          <Button type='submit' text='등록' theme='Confirm' />
          <Button
            text='나가기'
            onClick={() => {
              navigate('/ownermy/');
            }}
            theme='Cancel'
          />
        </S.ButtonDiv>
      </form>
    </>
  );
};
const S = {
  MainDiv: styled.div`
    width: 768px;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center;
    flex-direction: row;
    @media screen and (max-width: 767px) {
      width: 100%;
      flex-direction: column;
      justify-content: flex-start;
    }
  `,
  AddImageDiv: styled.div`
    width: 300px;
    height: 300px;
    border: 2px solid ${COLOR_1.black};
    margin-right: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 767px) {
      width: 80%;
      height: 180px;
      margin-top: 10%;
      margin-bottom: 5%;
      margin-left: 2%;
    }
  `,
  ImageShow: styled.img`
    height: 100%;
    width: 100%;
    margin: auto;
  `,
  AddCafeInfoDiv: styled.div`
    width: 350px;
    height: 300px;
    padding: 1%;

    @media screen and (max-width: 767px) {
      width: 80%;
      height: 350px;
    }
  `,
  InputBase: styled.input`
    outline: none;
    border: none;
    font-size: ${FONT_SIZE_2.normal_3};
    &:hover {
      outline: auto;
    }
  `,
  CafeName: styled.input`
    width: 100%;
    height: 50px;
    outline: none;
    border: none;
    margin-bottom: 2%;
    &:hover {
      outline: auto;
    }
    font-size: ${FONT_SIZE_2.big_1};
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_1.big_2};
      height: 10%;
    }
  `,
  CafeInputLabel: styled.div`
    width: 100%;
    height: 10%;
    margin: 1%;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_3};
    text-align: start;
  `,
  CafeNoticeDiv: styled.div`
    width: 95%;
    height: 20%;
    min-height: 20%;
    border: 5px solid ${COLOR_1.dark_sand};
    border-radius: 20px;
    text-align: center;
    @media screen and (max-width: 767px) {
      height: 10%;
    }
  `,
  CafeFacilityDiv: styled.div`
    min-width: 350px;
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
  `,
  CafeFacilitySpan: styled.span`
    padding: 2%;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_2};
    @media screen and (max-width: 767px) {
      display: block;
      text-align: start;
    }
  `,
  CafeFacility: styled.input`
    transform: scale(1.5);
    font-size: ${FONT_SIZE_2.normal_4};
    margin-top: 1%;
    &:hover {
      cursor: pointer;
    }
  `,
  ButtonDiv: styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2%;
    width: 100%;
    @media screen and (max-width: 500px) {
      justify-content: center;
    }
  `,
};
// const AddImage = styled(BiImageAdd)`
//   width: 6vw;
//   height: 6vh;
// `;
const CafeBusinessHours = styled(S.InputBase)`
  width: 20%;
  height: 90%;
  @media screen and (max-width: 767px) {
    width: 30%;
    height: 80%;
  }
`;
const CafeAddress = styled(S.InputBase)`
  width: 80%;
  height: 90%;
  @media screen and (max-width: 767px) {
    width: 80%;
    height: 80%;
  }
`;
const CafeContact = styled(S.InputBase)`
  width: 50%;
  height: 90%;
  @media screen and (max-width: 767px) {
    width: 60%;
    height: 80%;
  }
`;
const CafeNotice = styled(S.InputBase)`
  width: 90%;
  height: 50%;
  margin: 1%;
  display: block;
  margin: auto;
  @media screen and (max-width: 767px) {
    height: 40%;
  }
`;
export default CafeInfo;
