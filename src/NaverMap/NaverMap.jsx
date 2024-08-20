import React, { useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './NaverMap.scss'; // CSS 파일을 추가합니다

const NaverMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const { naver } = window;
        if (naver && mapRef.current) {
            const map = new naver.maps.Map(mapRef.current, {
                center: new naver.maps.LatLng(37.654527, 127.060551), // 지도의 중심 좌표
                zoom: 17, // 지도의 줌 레벨
            });

            new naver.maps.Marker({
                position: new naver.maps.LatLng(37.654527, 127.060551),
                map: map,
            });
        }
    }, []);

    return (
    <div className='NaverMap' ref={mapRef}></div>
    );
};

export default NaverMap;
