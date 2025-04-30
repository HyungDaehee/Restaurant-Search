import React, { useEffect } from 'react';
import useKakaoMap from '../../hooks/useKakaoMap';
import { TbCurrentLocation } from 'react-icons/tb';
import '../../styles/KakaoMap.scss';

const KakaoMap = () => {
  const { map, CurrentSearch } = useKakaoMap();

  return (
    <div className="KakaoMap" id="map">
       <button className='current' onClick={CurrentSearch}>
         <TbCurrentLocation />
       </button>
    </div>
  );
};

export default KakaoMap;
