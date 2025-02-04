import React, { useEffect, useRef, useState } from 'react';
import './KakaoMap.scss';
import { TbCurrentLocation } from 'react-icons/tb';

const KakaoMap = ({ searchResults }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);;
  const currentMarker = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.654527, 127.060551),
        level: 4,
      });
    }

    updateMarkers();
  }, [searchResults]);

  const updateMarkers = () => {
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    if (searchResults && searchResults.length > 0) {
      searchResults.forEach(({ y, x, place_name }) => {
        const marker = createMarker(y, x, place_name);
        markers.current.push(marker);
      });

      const { y, x } = searchResults[0];
      map.current.setCenter(new window.kakao.maps.LatLng(y, x));
    }
  };

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

    /* 현재 위치 찾기 */
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       position => {
  //         const { latitude, longitude } = position.coords;
  //         const newCenter = new window.kakao.maps.LatLng(latitude, longitude);

  //         map.current.setCenter(newCenter);

  //         if (currentMarker.current) {
  //           currentMarker.current.setPosition(newCenter);
  //         } else {
  //           currentMarker.current = new window.kakao.maps.Marker({
  //             position: newCenter,
  //             map: map.current,
  //           });
  //         }
  //       },
  //       error => {
  //         console.error('error:', error);
  //       }
  //     );
  //   }
  // };

  return (
    <>
      <div className='KakaoMap' ref={mapRef}>
        {/* <button className='current' onClick={getCurrentLocation}>
          <TbCurrentLocation />
        </button> */}
      </div>

    </>
  );
};

export default KakaoMap;
