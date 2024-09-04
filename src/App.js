import React, { useState } from 'react';
import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './Sidebar/Search';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <div className='Main-container'>
      <Search onSearchResults={handleSearchResults} />
      <KakaoMap searchResults={searchResults} currentPage={currentPage}/>
    </div>
  );
}

export default App;
