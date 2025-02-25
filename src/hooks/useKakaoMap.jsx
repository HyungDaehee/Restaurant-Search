import { useEffect, useRef, useState } from 'react';
import useSearchStore from "../store/KakaoAuthStore.js"

const useKakaoMap = () => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [location, setLocation] = useState(null);
  const { searchResults } = useSearchStore();
  

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

    if (searchResults?.length) {
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

  const searchCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const userLocation = new window.kakao.maps.LatLng(latitude, longitude);
        setLocation(userLocation);

        map.current.setCenter(userLocation);

        const ps = new window.kakao.maps.services.Places();
        const options = {
          location: userLocation,
          radius: 5000,
          sort: window.kakao.maps.services.SortBy.DISTANCE,
        };

        ps.keywordSearch('맛집', (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            markers.current.forEach(marker => marker.setMap(null));
            markers.current = [];

            data.forEach(({ y, x, place_name }) => {
              const marker = createMarker(y, x, place_name);
              markers.current.push(marker);
            });
          }
        }, options);
      },
      error => {
        console.error('error:', error);
      }
    );
  };

  return { mapRef, searchCurrentLocation };
};

export default useKakaoMap;
