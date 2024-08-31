import React, { useEffect, useRef } from 'react';
import './KakaoMap.scss';
import { TbCurrentLocation } from "react-icons/tb";

const KakaoMap = ({ searchResults }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);
    const currentMarker = useRef(null);

    useEffect(() => {
        if (!map.current) {
            map.current = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.654527, 127.060551),
                level: 4,
            });
        }

        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        if (searchResults && searchResults.length > 0) {
            searchResults.forEach(restaurant => {
                const { y, x } = restaurant;
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(y, x),
                    map: map.current,
                });
                markers.current.push(marker);
            });

            // 첫 번째 검색 결과의 위치로 지도를 이동
            const { y, x } = searchResults[0];
            map.current.setCenter(new window.kakao.maps.LatLng(y, x));
        }
    }, [searchResults]);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    map.current.setCenter(new window.kakao.maps.LatLng(lat, lon));

                    if (currentMarker.current) {
                        currentMarker.current.setPosition(new window.kakao.maps.LatLng(lat, lon));
                    } else {
                        currentMarker.current = new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(lat, lon),
                            map: map.current,
                        });
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className='KakaoMap' ref={mapRef}>
        <button className='current' onClick={getCurrentLocation}>
        <TbCurrentLocation />
   </button>
   </div>
    );
};

export default KakaoMap;
