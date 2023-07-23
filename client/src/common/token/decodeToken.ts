import base64 from "base-64";

// JWT 토큰을 디코드하여 payload 객체를 반환하는 함수
export const decodeToken = (token: any) => {
  if (!token) {
    return null;
  }

  const payload = token.split(".")[1];
  const decodedPayload = base64.decode(payload);
  const parsedPayload = JSON.parse(decodedPayload);

  return parsedPayload;
};
