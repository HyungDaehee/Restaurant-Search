import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom'; 
import KakaoMap from './components/KakaoMap/KakaoMap.jsx';
import Search from './components/SearchBar/Search';
import Login from './components/KakaoLogin/Login';
import Home from './pages/Home.jsx';
import NavBar from './components/Nav/NavBar.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route
          path="/Search"
          element={
            <>
              <NavBar />
              <div className="Search-container">
                <Search />
                <KakaoMap />
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
