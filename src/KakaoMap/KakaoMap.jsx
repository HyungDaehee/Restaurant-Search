import React, { useEffect, useRef } from 'react';
import './KakaoMap.scss'; // CSS 파일을 추가합니다

const KakaoMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const { kakao } = window;
        if (kakao && mapRef.current) {
            const map = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(37.654527, 127.060551), // 지도의 중심 좌표
                zoom: 17, // 지도의 줌 레벨
            });

            new kakao.maps.Marker({
                position: new kakao.maps.LatLng(37.654527, 127.060551),
                map: map,
            });
        }
    }, []);

    return (
    <div className='NaverMap' ref={mapRef}></div>
    );
};

export default KakaoMap;
