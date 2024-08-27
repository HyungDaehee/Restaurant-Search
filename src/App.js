import React, { useState } from 'react';
import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './Sidebar/Search';

function App() {
  const [location, setLocation] = useState(null);

  const handleLocationChange = (loc) => {
    setLocation(loc);
  };

  return (
    <div className='Main-container'>
      <Search handleLocationChange={handleLocationChange}/>
      <KakaoMap location={location} />
     
    </div>
  );
}

export default App;
