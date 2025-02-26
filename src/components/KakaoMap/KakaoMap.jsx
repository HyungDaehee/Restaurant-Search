import React from 'react';
import { TbCurrentLocation } from 'react-icons/tb';
import useKakaoMap from '../../hooks/useKakaoMap.jsx';
import '../../styles/KakaoMap.scss';

const KakaoMap = () => {
  const { mapRef, CurrentPlace } = useKakaoMap();

  return (
    <div className='KakaoMap' ref={mapRef}>
      <button className='current' onClick={CurrentPlace}>
        <TbCurrentLocation />
      </button>
    </div>
  );
};

export default KakaoMap;
