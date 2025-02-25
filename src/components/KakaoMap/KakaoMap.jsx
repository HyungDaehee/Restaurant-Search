import React from 'react';
import { TbCurrentLocation } from 'react-icons/tb';
import useKakaoMap from '../../hooks/useKakaoMap';
import '../../styles/KakaoMap.scss';

const KakaoMap = () => {
  const { mapRef, searchCurrentLocation } = useKakaoMap();

  return (
    <div className='KakaoMap' ref={mapRef}>
      <button className='current' onClick={searchCurrentLocation}>
        <TbCurrentLocation />
      </button>
    </div>
  );
};

export default KakaoMap;
