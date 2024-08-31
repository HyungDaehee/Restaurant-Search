import React, { useState } from 'react';
import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './Sidebar/Search';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className='Main-container'>
      <Search onSearchResults={handleSearchResults} />
      <KakaoMap searchResults={searchResults}/>
    </div>
  );
}

export default App;
