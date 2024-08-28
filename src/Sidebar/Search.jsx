<<<<<<< HEAD
import '../Sidebar/Search.scss';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { KakaoAPI } from '../api/KakakoAPI.js';
import { Modal } from './Modal.jsx';
import { CurrentLocation } from './CurrentLoaction.jsx';
import PageNation from './PageNation.jsx';

export const Search = ({ handleLocationChange }) => {
    const [keyword, setKeyword] = useState('');
    const [restaurants, setRestaurants] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    
    const [activePage, setActivePage] = useState(1);
    const itemsCountPerPage = 5;

    const handleSearch = async () => {
        if (!keyword.trim()) return; 

        setLoading(true);
        setError(null);

        try {
            const results = await KakaoAPI(keyword); 
            setRestaurants(results);
            setActivePage(1);
            console.log(results);
        } catch (err) {
            setError('검색 중 오류가 발생했습니다.'); 
        } finally {
            setLoading(false);
        }
    };

    const openModal = (url) => {
        setModalContent(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    const indexOfLastRestaurant = activePage * itemsCountPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - itemsCountPerPage;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
    
    return (
        <div className='search-container'>
            <div className='bar-container'>
                <div className="current">
                    <CurrentLocation onLocationChange={handleLocationChange} />
                </div>
                <div className='search-bar'>
                    <input
                        type='text'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='지역, 가게명, 지하철역 검색'
                    />
                    <div className='search-i' onClick={handleSearch}>
                        <CiSearch />
                    </div>
                </div>
            </div>
            <div className="sidebar">
                {currentRestaurants.map((restaurant, index) => (
                    <div key={index} className="result-item">
                        <div className="title-category">
                            <h4 className='title'>
                                <a href="#" onClick={(e) => {e.preventDefault(); openModal(restaurant.place_url);}}>
                                    {restaurant.place_name}
                                </a>
                            </h4>
                            <p className='category'>{restaurant.category_name.split(' > ').pop()}</p>
                        </div>
                        <p className='address'>{restaurant.address_name}</p>
                        <p className='tel'>{restaurant.phone}</p>
                    </div>
                ))}
                 {restaurants.length > 0 && (
                <PageNation 
                    activePage={activePage} 
                    itemsCountPerPage={itemsCountPerPage} 
                    totalItemsCount={restaurants.length} 
                    onChange={handlePageChange} 
                />
            )}
            </div>
           

            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                content={modalContent} 
            />
        </div>
    );
};
=======
import '../Sidebar/Search.scss';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { KakaoAPI } from '../api/KakakoAPI.js';
import { Modal } from './Modal.jsx';
import { CurrentLocation } from './CurrentLoaction.jsx';

export const Search = ({ handleLocationChange }) => { // props 수정
    const [keyword, setKeyword] = useState('');
    const [restaurants, setRestaurants] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(''); 

    const handleSearch = async () => {
        if (!keyword.trim()) return; 

        setLoading(true);
        setError(null);

        try {
            const results = await KakaoAPI(keyword); 
            setRestaurants(results);
            console.log(results);
        } catch (err) {
            setError('검색 중 오류가 발생했습니다.'); 
        } finally {
            setLoading(false);
        }
    };

    const openModal = (url) => {
        setModalContent(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    return (
        <div className='search-container'>
            <div className='bar-container'>
                <div className='search-bar'>
                    <input
                        type='text'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder='지역, 가게명, 지하철역 검색'
                    />
                    <div className="current">
                    <CurrentLocation onLocationChange={handleLocationChange} />
                    </div>
                    
                    <div className='search-i' onClick={handleSearch}>
                        <CiSearch />
                    </div>
                </div>
            </div>
            <div className="sidebar">
                {restaurants.map((restaurant, index) => (
                    <div key={index} className="result-item">
                        <div className="title-category">
                            <h4 className='title'>
                                <a href="#" onClick={(e) => {e.preventDefault(); openModal(restaurant.place_url);}}>
                                    {restaurant.place_name}
                                </a>
                            </h4>
                            <p className='category'>{restaurant.category_name.split(' > ').pop()}</p>
                        </div>
                        <p className='address'>{restaurant.address_name}</p>
                        <p className='tel'>{restaurant.phone}</p>
                    </div>
                ))}
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                content={modalContent} 
            />
        </div>
    );
};
>>>>>>> 6a36482cd8deb2c2ec448fa19307072da7a6d8f3
