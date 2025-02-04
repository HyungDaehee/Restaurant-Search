import React, { useEffect, useState } from 'react';
import './Search.scss';
import { CiSearch } from "react-icons/ci";
import { KakaoAPI } from '../api/Kakako_Search_API.js';
import { Modal } from '../Modal/Modal.jsx';
import PageNation from '../PageNation/PageNation.jsx';
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

export const Search = ({ onSearchResults, activePage, itemsCountPerPage, onPageChange }) => {
    const [keyword, setKeyword] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('query');
        if (searchQuery) {
            setKeyword(searchQuery);
            handleSearch(searchQuery);
        }
    }, [location.search]);

    const handleSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const results = await KakaoAPI(searchQuery);
            console.log('검색 결과:', results);
            setRestaurants(results);
            onSearchResults(results);
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(keyword);
                            }
                        }}
                    />
                    <div className='search-i' onClick={() => handleSearch(keyword)}>
                        <CiSearch />
                    </div>
                </div>
            </div>
            <div className="sidebar">
                {restaurants.slice((activePage - 1) * itemsCountPerPage, activePage * itemsCountPerPage).map((restaurant, index) => (
                    <div key={index} className="result-item">
                        <div className="title-category">
                            <h3 className='title'>
                                <a href="#" onClick={(e) => { e.preventDefault(); openModal(restaurant.place_url); }}>
                                    {restaurant.place_name}
                                </a>
                            </h3>
                            <p className='category'>{restaurant.category_name.split(' > ').pop()}</p>
                        </div>
                        <p className='address'><FaMapMarkerAlt className='address-icon' />{restaurant.road_address_name}</p>
                        <p className='tel'><FaPhone className='tel-icon' />{restaurant.phone}</p>
                    </div>
                ))}
                {restaurants.length > 0 && (
                    <PageNation
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={restaurants.length}
                        onChange={(page) => {
                            onPageChange(page);
                        }}
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
