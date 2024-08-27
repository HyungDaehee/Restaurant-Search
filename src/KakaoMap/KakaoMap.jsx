import React, { useEffect, useRef } from 'react';
import './KakaoMap.scss';
import { CurrentLocation } from '../Sidebar/CurrentLoaction';

const KakaoMap = ({ location}) => {
    const mapRef = useRef(null);
    const { kakao } = window;

    useEffect(() => {
        console.log('Current Location:', location); 
        if (mapRef.current && kakao) {
            const map = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(37.654527, 127.060551),                level: 3,
            });
    
            if (location) {
                const { lat, lon } = location;
                map.setCenter(new kakao.maps.LatLng(lat, lon));
    
                const marker = new kakao.maps.Marker({
                    map: map,
                    position: new kakao.maps.LatLng(lat, lon),
                });
            }
        }
    }, [location, kakao]);
    return (
        <div className='KakaoMap' ref={mapRef}></div>
    );
};

export default KakaoMap;
