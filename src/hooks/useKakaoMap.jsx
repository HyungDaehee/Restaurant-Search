import { useEffect, useRef, useState } from 'react';
import useSearchStore from '../store/SearchStore.js';
import usePaginationStore from '../store/PaginationStore.js';
import useMapStore from '../store/KakaoMapStore.js';

const useKakaoMap = () => {
  const mapRef = useRef(null);
  const { map, markers, setMap, setMarkers } = useMapStore();
  const [location, setLocation] = useState(null);

  const { searchResults } = useSearchStore();
  const { currentPage, itemsPerPage } = usePaginationStore();

  useEffect(() => {
    if (!map) {
      const newMap = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.654527, 127.060551),
        level: 4,
      });
      setMap(newMap);
    }
    updateMarkers();
  }, [searchResults, currentPage, map, setMap]);

  const updateMarkers = () => {
    if (!map) return;

    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const paginatedResults = searchResults.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    if (paginatedResults.length) {
      const newMarkers = paginatedResults.map(({ y, x, place_name }) => {
        const marker = createMarker(y, x, place_name);
        return marker;
      });

      setMarkers(newMarkers);

      const { y, x } = paginatedResults[0];
      map.setCenter(new window.kakao.maps.LatLng(y, x));
    }
  };

  const createMarker = (lat, lng, placeName) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
      map: map,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div class='custom-overlay'><h4>${placeName}</h4></div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
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

        if (map) {
          map.setCenter(userLocation);

          const ps = new window.kakao.maps.services.Places();
          const options = {
            location: userLocation,
            radius: 5000,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          };

          ps.keywordSearch('맛집', (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              markers.forEach(marker => marker.setMap(null));
              setMarkers([]);

              data.forEach(({ y, x, place_name }) => {
                const marker = createMarker(y, x, place_name);
                markers.push(marker);
              });
            }
          }, options);
        }
      },
      error => {
        console.error('error:', error);
      }
    );
  };

  return { mapRef, searchCurrentLocation };
};

export default useKakaoMap;
