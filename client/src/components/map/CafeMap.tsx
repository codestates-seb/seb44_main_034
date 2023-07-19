import { useEffect } from 'react';

const CafeMap = () => {
  useEffect(() => {
    // 카카오지도 API 로드 후 실행할 함수
    const initializeMap = () => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 5,
      };
      const map = new kakao.maps.Map(container, options);
    };

    if (window.kakao) {
      // 이미 카카오지도 API 스크립트가 로드된 경우
      initializeMap();
    } else {
      // 카카오지도 API 스크립트가 로드되지 않은 경우, 스크립트 로드 후 실행
      const script = document.createElement('script');
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services';
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    }
  }, []);

  return <div id='map' style={{ width: '100%', height: '400px' }} />;
};

export default CafeMap;
