import '../Sidebar/Search.scss';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { KakaoAPI } from '../api/KakakoAPI.js';
import { Modal } from './Modal.jsx';

export const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [restaurants, setRestaurants] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [modalContent, setModalContent] = useState(''); // 모달에 표시할 URL

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
                    <div className='search-i' onClick={handleSearch}>
                        <CiSearch />
                    </div>
                </div>
            </div>
            <div className="sidebar">
                {loading && <p>로딩 중...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && restaurants.length === 0 && (
                    <p>검색 결과가 없습니다.</p>
                )}
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
