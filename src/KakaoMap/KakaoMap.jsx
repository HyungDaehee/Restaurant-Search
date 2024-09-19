import React, { useEffect, useRef } from 'react';
import './KakaoMap.scss';
import { TbCurrentLocation } from "react-icons/tb";

const KakaoMap = ({ searchResults }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);
    const currentMarker = useRef(null);
    const { kakao } = window;

    useEffect(() => {
        if (!map.current) {
            // 처음 맵 생성
            map.current = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.654527, 127.060551),
                level: 4,
            });
        }

        // 기존 마커 제거
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        // 현재 페이지의 검색 결과로 마커 추가
        if (searchResults && searchResults.length > 0) {
            searchResults.forEach(restaurant => {
                const { y, x } = restaurant;

                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(y, x),
                    map: map.current,
                });

                const content = `
                    <div class='CustomOverlay'>
                        <h4>${restaurant.place_name}</h4>
                    </div>`;

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: content,
                });

                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    infowindow.open(map.current, marker);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });

                markers.current.push(marker);
            });

            // 첫 번째 결과를 지도 중심으로 설정
            const { y, x } = searchResults[0];
            map.current.setCenter(new window.kakao.maps.LatLng(y, x));
        }
    }, [searchResults]);  // searchResults가 변경될 때마다 실행

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
