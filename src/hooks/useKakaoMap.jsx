import { useEffect, useState } from 'react';
import useSearchStore from "../store/SearchStore.js";
import usePageNationStore from '../store/PaginationStore.js';
import useCurResStore from '../store/CurResStors.js';

const useKakaoMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); 
  const { searchResults } = useSearchStore();
  const { currentPage, itemsPerPage } = usePageNationStore();

  const [location, setLocation] = useState(null);
  const { CurResults, setCurResults } = useCurResStore();



  useEffect(() => {
    if (typeof window.kakao === 'undefined') {
      console.error("카카오 맵 API 로드되지 않음");
      return;
    }
  
    if (!map) {
      initializeMap();
    } else {
      updateMarkers();
    }
  }, [searchResults, CurResults, currentPage, itemsPerPage, map]);

  
  const initializeMap = () => {
    const newMap = new window.kakao.maps.Map(document.getElementById("map"), {
      center: new window.kakao.maps.LatLng(37.654527, 127.060551),
      level: 4,
    });
    setMap(newMap);
  };



  const updateMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]); 
  
    const TotalResults = CurResults.length > 0 ? CurResults : searchResults;
    const paginated = TotalResults.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    if (paginated.length) {
      const newMarkers = paginated.map(({ y, x, place_name }) =>
        createMarker(y, x, place_name)
      );
      setMarkers(newMarkers);
  
      const { y, x } = paginated[0];
      map.setCenter(new window.kakao.maps.LatLng(y, x));
    } 
  };



  const createMarker = (lat, lng, placeName) => {
    const position = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({ position, map });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div class='custom-overlay'><h4>${placeName}</h4></div>`,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
    window.kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());

    return marker;
  };




  const CurrentSearch = () => {
    if (!navigator.geolocation) return;
  
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const userLocation = new window.kakao.maps.LatLng(latitude, longitude);
        setLocation(userLocation);
  
        if (map) {
          map.setCenter(userLocation);
        }
  
        const ps = new window.kakao.maps.services.Places();
        const options = {
          location: userLocation,
          radius: 5000,
          sort: window.kakao.maps.services.SortBy.DISTANCE,
        };
  
        ps.keywordSearch('음식점', (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log(data);
            setCurResults(data); 
          }
        }, options);
      },
      error => {
        console.error('error:', error);
      }
    );
  };

  const handleUnload = () => {
    setMarkers([]); 
    setCurResults([]); 
  };

  return { map, CurrentSearch };
};

export default useKakaoMap;
