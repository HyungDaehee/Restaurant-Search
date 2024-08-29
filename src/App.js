import React, { useState } from 'react';
import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './Sidebar/Search';

function App() {
  const [location, setLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleLocationChange = (loc) => {
    setLocation(loc);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className='Main-container'>
      <Search handleLocationChange={handleLocationChange} onSearchResults={handleSearchResults} />
      <KakaoMap searchResults={searchResults} />
    </div>
  );
}

export default App;
