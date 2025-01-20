import React, { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';  // BrowserRouter는 index.js에서 처리하므로 import할 필요 없음
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './SearchBar/Search';
import Login from './KakaoLogin/Login';
import Nav from './Nav/Nav';

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
      <Routes>
        <Route
          path="/"
          element={
            <div className="Main-container">
              <Search
                onSearchResults={handleSearchResults}
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
              <KakaoMap searchResults={paginatedResults} />
            </div>
          }
        />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}


export default App;
