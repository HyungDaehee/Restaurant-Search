import React, { useState } from 'react';
import './App.scss';
import KakaoMap from './KakaoMap/KakaoMap';
import { Search } from './SearchBar/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './KakaoLogin/Login';

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
     <BrowserRouter>
    <Routes>
   <Route path="/Login"element={<Login/>}></Route>
   </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
