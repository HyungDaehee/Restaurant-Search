import React, { useEffect, useRef, useState } from 'react';
import './KakaoMap.scss';
import { TbCurrentLocation } from 'react-icons/tb';
import Login from '../KakaoLogin/Login.jsx';

const KakaoMap = ({ searchResults }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);;
  const currentMarker = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!map.current) {
      // 맵 생성
      map.current = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.654527, 127.060551),
        level: 4,
      });
    }

    updateMarkers();
  }, [searchResults]);

  const updateMarkers = () => {
    // 기존 마커 제거
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    // 검색 결과 마커 생성
    if (searchResults && searchResults.length > 0) {
      searchResults.forEach(({ y, x, place_name }) => {
        const marker = createMarker(y, x, place_name);
        markers.current.push(marker);
      });

      // 첫 번째 결과를 기준으로 지도 중심 이동
      const { y, x } = searchResults[0];
      map.current.setCenter(new window.kakao.maps.LatLng(y, x));
    }
  };
    // 마커 생성
  const createMarker = (lat, lng, placeName) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map: map.current,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div class='custom-overlay'><h4>${placeName}</h4></div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map.current, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

    return marker;
  };

  // 현재 위치로 지도 이동
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const newCenter = new window.kakao.maps.LatLng(latitude, longitude);

          map.current.setCenter(newCenter);

            // 현재 위치 마커 
          if (currentMarker.current) {
            currentMarker.current.setPosition(newCenter);
          } else {
            currentMarker.current = new window.kakao.maps.Marker({
              position: newCenter,
              map: map.current,
            });
          }
        },
        error => {
          console.error('error:', error);
        }
      );
    }
  };

  // const handleAdress = () => {
  //   if (location && window.kakao) {  // 위치 정보와 Kakao Maps API가 모두 로드된 경우
  //     const newCenter = new window.kakao.maps.LatLng(location.latitude, location.longitude);
  //     map.current.setCenter(newCenter);
  
  //     if (currentMarker.current) {
  //       currentMarker.current.setPosition(newCenter);
  //     } else {
  //       currentMarker.current = new window.kakao.maps.Marker({
  //         position: newCenter,
  //         map: map.current,
  //       });
  //     }
  
  //     const geocoder = new window.kakao.maps.services.Geocoder();
  //     geocoder.coord2Address(location.longitude, location.latitude, (result, status) => {
  //       if (status === window.kakao.maps.service.Status.OK) {
  //         const address = result[0].address.address_name;
  //         console.log("변환 주소:", address);
  //       }
  //     });
  //   }
  // }
  

  return (
    <>
    <div className='KakaoMap' ref={mapRef}>
        <button className='current' onClick={getCurrentLocation}>
            <TbCurrentLocation />
        </button>

        <div>
         <div className='signin'><Login/></div>
    </div>
    </div>
   
    </>
);
};

export default KakaoMap;
