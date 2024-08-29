import React, { useEffect, useRef } from 'react';
import './KakaoMap.scss';

const KakaoMap = ({ searchResults }) => {
    const mapRef = useRef(null);
    const { kakao } = window;
    const map = useRef(null); 
    const markers = useRef([]);  

    useEffect(() => {
        if (!map.current) {
            map.current = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(37.654527, 127.060551),
                level: 3,
            });
        }

        
        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];

        if (searchResults) {
            searchResults.forEach(restaurant => {
                const { y, x } = restaurant;
                const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(y, x),
                    map: map.current,
                });
                markers.current.push(marker); 
            });

            if (searchResults.length > 0) {
                const { y, x } = searchResults[0];
                map.current.setCenter(new kakao.maps.LatLng(y, x));
            }
        }
    }, [searchResults, kakao]);

    return (
        <div className='KakaoMap' ref={mapRef}></div>
    );
};

export default KakaoMap;
