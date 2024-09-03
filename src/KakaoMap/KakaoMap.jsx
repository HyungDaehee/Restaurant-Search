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

                const content = `
                    <div class='CustomOverlay'>
                        <h4>${restaurant.place_name}</h4>
                    </div>`;

                // 커스텀 오버레이 생성
                const WindowInfo = new window.kakao.maps.InfoWindow({
                    content: content,
                });

                const infowindow = new window.kakao.maps.InfoWindow({
                    content: content,
                });

                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    infowindow.open(map.current, marker);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });
                markers.current.push(marker, WindowInfo);
            });
            
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
