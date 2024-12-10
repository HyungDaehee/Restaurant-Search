import React, { useState } from 'react';
import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './SearchBar/Search';
import { Router, Routes, Route } from 'react-router-dom';
import Login from './KakaoLogin/Login';
import { LoginText } from './KakaoLogin/LoginText';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className='Main-container'>
        <Search
          onSearchResults={handleSearchResults}
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <KakaoMap searchResults={paginatedResults} />
      </div>
      <Routes>
        <Route path='/' element={
          <>
            <KakaoMap />
            <Search />
          </>
        }></Route>
        <Route path="/oauth/callback/kakao" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
