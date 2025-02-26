import React from 'react';
import useKakaoMap from '../../hooks/useKakaoMap';
import '../../styles/KakaoMap.scss';

const KakaoMap = () => {
  const { mapRef } = useKakaoMap();

  return (
    <div className='KakaoMap' ref={mapRef}>
     
    </div>
  );
};

export default KakaoMap;
