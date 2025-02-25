import React, { useState } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom'; 
import KakaoMap from './components/KakaoMap/KakaoMap.jsx';
import { Search } from './components/SearchBar/Search';
import Login from './components/KakaoLogin/Login';
import  Home  from './pages/Home.jsx';
import NavBar from './components/Nav/NavBar.jsx';


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
        <Route path="/" element={<Home/>}></Route>
        <Route
          path="/Search"
          element={
            <>
            <NavBar/>
            <div className="Search-container">
              <Search
                onSearchResults={handleSearchResults}
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
              <KakaoMap searchResults={paginatedResults} />
            </div>
            </>
          }
        />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}


export default App;
