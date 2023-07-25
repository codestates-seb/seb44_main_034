// import { useEffect } from "react";
// import { IoShareSocial } from "react-icons/io5";

type KakaoProps = {
  title: string;
  image: string;
};

const KakaoShare = ({ title, image }: KakaoProps) => {
  const shareMessage = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        imageUrl: image,
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: "https://cafein34.vercel.app/ ",
          webUrl: "https://cafein34.vercel.app/ ",
        },
      },
      buttons: [
        {
          title: "카페인 방문하기",
          link: {
            mobileWebUrl: "https://cafein34.vercel.app/ ",
            webUrl: "https://cafein34.vercel.app/ ",
          },
        },
      ],
    });
  };
  shareMessage();
};

export default KakaoShare;
