import React, { useEffect, useRef } from 'react';
import './KakaoMap.scss';
import { TbCurrentLocation } from "react-icons/tb";

const KakaoMap = ({ searchResults, currentPage }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);
    const currentMarker = useRef(null);
    const { kakao } = window;

    useEffect(() => {
        // 초기 맵 설정
        if (!map.current) {
            map.current = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.654527, 127.060551),
                level: 4,
            });
        }

        // 기존 마커 제거
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        const itemsCountPerPage = 10; 
        const startIndex = (currentPage - 1) * itemsCountPerPage; 
        const currentPageResults = searchResults.slice(startIndex, startIndex + itemsCountPerPage);

        if (currentPageResults && currentPageResults.length > 0) {
            currentPageResults.forEach(restaurant => {
                const { y, x, place_name } = restaurant;

                // 마커 생성
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(y, x),
                    map: map.current,
                });

                const content = 
                    <div class='CustomOverlay'>
                        <h4 style="margin: 0;">${place_name}</h4>
                    </div>;

                const WindowInfo = new window.kakao.maps.InfoWindow({
                    content: content,
                });

                // 마우스 오버 이벤트
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    WindowInfo.open(map.current, marker);
                });

                // 마우스 아웃 이벤트
                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    WindowInfo.close();
                });

                // 마커 배열에 추가
                markers.current.push(marker);
            });

            // 첫 번째 결과를 지도 중심으로 설정
            const { y, x } = currentPageResults[0];
            map.current.setCenter(new window.kakao.maps.LatLng(y, x));
        }
    }, [searchResults, currentPage]); // searchResults와 currentPage 변경 시 마커 업데이트

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