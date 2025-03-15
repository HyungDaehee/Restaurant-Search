import { useEffect, useRef } from 'react';
import useSearchStore from "../store/SearchStore.js";
import usePageNationStore from '../store/PaginationStore.js'

const useKakaoMap = () => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const { searchResults } = useSearchStore();
  const {currentPage, itemsPerPage} = usePageNationStore();

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!map.current) {
      initializeMap();
    } else {
      updateMarkers();
    }
  }, [searchResults, currentPage, itemsPerPage]);

  const initializeMap = () => {
    map.current = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.654527, 127.060551),
      level: 4,
    });
  };

  const updateMarkers = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];

    if (paginatedResults?.length) {
      const newMarkers = paginatedResults.map(({ y, x, place_name }) => createMarker(y, x, place_name));
      markers.current = newMarkers;

      const { y, x } = paginatedResults[0];
      map.current.setCenter(new window.kakao.maps.LatLng(y, x));
    }
  };

  const createMarker = (lat, lng, placeName) => {
    const position = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({ position, map: map.current });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div class='custom-overlay'><h4>${placeName}</h4></div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map.current, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

    return marker;
  };

  return { mapRef };
};

export default useKakaoMap;
