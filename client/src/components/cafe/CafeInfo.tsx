import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/button/button";
import styled from "styled-components";
import { COLOR_1, FONT_SIZE_2, FONT_SIZE_1 } from "../../common/common";
import { cafeType } from "../../recoil/recoil";
import { baseURL } from "../../common/baseURL";
import { BiImageAdd } from "react-icons/bi";
const facilityName = [
  "24시간 운영여부",
  "콘센트 유무",
  "주차공간",
  "동물 출입 가능 여부",
  "디저트 판매 여부",
];

const CafeInfo = () => {
  // const [cafes, setCafes] = useRecoilState(AllcafeState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [CafeData, setCafeData] = useState<cafeType>({
    name: "",
    address: "",
    contact: "",
    shortAddress: "",
    latitude: 0,
    longitude: 0,
    notice: "",
    openTime: "",
    closeTime: "",
    isOpenAllTime: false,
    isChargingAvailable: false,
    hasParking: false,
    isPetFriendly: false,
    hasDessert: false,
  });
  const [imageFile, setImageFile] = useState<string | Blob>("");
  const [previewImage, setPreviewImage] = useState<string | null>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };
  const handleAddImageButtonClick = () => {
    fileInputRef.current?.click(); // 파일 선택 창 열기
  };
  const handleRemoveImageButtonClick = () => {
    setImageFile("");
    setPreviewImage(null);
  };
  const convertAddressToCoordinates = async (address: string) => {
    try {
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/address.json",
        {
          headers: {
            Authorization: "KakaoAK 39c175a34af51dbed869e39dfcb03014",
          },
          params: {
            query: address,
          },
        }
      );
      console.log("좌표변환");
      const documents = response.data.documents;
      if (documents.length === 0) {
        console.log("검색된 주소가 없습니다.");
        alert("정확한 주소를 기입해주세요 ! "); //이부분은 나중에 경고 문구로 대체 될 예정
        return null;
      }
      // 응답 데이터에서 좌표 정보 추출
      const coordinates = response.data.documents[0].address;
      console.log(coordinates);
      return coordinates;
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  const handleCafeInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
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

  const handleAddressInputBlur = () => {
    convertAddressToCoordinates(CafeData.address).then((coordinates) => {
      if (coordinates) {
        setCafeData((prevCafeData) => ({
          ...prevCafeData,
          address: coordinates.address_name,
          shortAddress: coordinates.region_2depth_name,
          latitude: coordinates.y,
          longitude: coordinates.x,
        }));
      }
    });
  };
  const handleSaveCafeInfo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (imageFile === "") {
      alert("이미지를 등록해주세요! ");
    }
    console.log(imageFile);
    console.log(CafeData.latitude);
    console.log(CafeData.longitude);
    console.log(CafeData.shortAddress);
    const formData = new FormData();

    formData.append("cafeImage", imageFile);

    const json = JSON.stringify(CafeData);
    const info = new Blob([json], { type: "application/json" });
    formData.append("dto", info);

    try {
      for (const entry of formData.entries()) {
        console.log(entry[0] + ": " + entry[1]);
      }
      const response = await axios.post(`${baseURL}/cafes`, formData, {
        // const response = await axios.post(
        //   'http://localhost:3000/cafes',
        //   formData,
        headers: {
          // 'Content-Type': 'application/json;charset=UTF-8',
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "true",
          // 'Content-Type': 'application/json',
          Authorization: localStorage.getItem("access_token"),
        },
      });

      console.log(response.data);
      console.log(response);
      const cafeId = response.data.payload;
      alert("카페 정보 등록이 완료 되었습니다. 메뉴 등록 페이지로 이동합니다");
      navigate(`/menus/${cafeId}/add`);
      // } else {
      //   throw new Error('Image upload failed');
      // }
      console.log("성공");
    } catch (error) {
      console.error(error);
      // alert('Image upload failed');
    }
  };

  return (
    <>
      <form onSubmit={handleSaveCafeInfo}>
        <S.MainDiv>
          <S.AddImageDiv>
            <input
              type='file'
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            {previewImage ? (
              <>
                <RemoveImgButton onClick={handleRemoveImageButtonClick}>
                  사진 수정
                </RemoveImgButton>
                <S.ImageShow src={previewImage} alt='미리보기' />
              </>
            ) : (
              <AddImgButton onClick={handleAddImageButtonClick} />
            )}
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
                onBlur={handleAddressInputBlur}
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
              navigate("/ownermy/");
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
    width: 100%;
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center;
    flex-direction: row;
    position: relative;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      justify-content: flex-start;
    }
  `,
  AddImageDiv: styled.div`
    /* z-index: -1; */
    position: relative;
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
    background-size: cover;
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
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 767px) {
      font-size: ${FONT_SIZE_2.small_1};
    }
  `,
  CafeFacility: styled.input`
    transform: scale(1.5);
    font-size: ${FONT_SIZE_2.normal_4};
    margin-top: 1%;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      transform: scale(1.2);
    }
  `,
  ButtonDiv: styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2%;
    width: 100%;
    @media screen and (max-width: 767px) {
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
const AddImgButton = styled(BiImageAdd)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const RemoveImgButton = styled.button`
  width: 80px;
  height: 20px;
  font-size: ${FONT_SIZE_1.small_3};
  position: absolute;
  top: 310px;
  border: 2px solid ${COLOR_1.green};
  background-color: white;
  border-radius: 10px;
  color: ${COLOR_1.dark_brown};
  &:hover {
    background-color: ${COLOR_1.green};
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    top: 185px;
    width: 70px;
    height: 18px;
    font-size: ${FONT_SIZE_1.small_2};
  }
`;
export default CafeInfo;
