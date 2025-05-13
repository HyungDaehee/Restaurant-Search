import React, { useEffect, useState } from 'react';
import { KakaoAPI } from '../../api/Kakako_Search_API.js';
import Modal from '../Modal/Modal.jsx';
import useModalStore from '../../store/ModalStore.js';
import PageNation from '../PageNation/PageNation.jsx';
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import useSearchStore from '../../store/SearchStore.js';
import usePaginationStore from '../../store/PaginationStore.js';
import useCurResStore from '../../store/CurResStors.js';
import '../../styles/Search.scss';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const { searchResults, setSearchResults } = useSearchStore();
  const { currentPage, setCurrentPage, itemsPerPage } = usePaginationStore();
  const { isOpen, openModal, closeModal, content } = useModalStore();
  const { CurResults, setCurResults } = useCurResStore();
  const [error, setError] = useState(null);
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
    setError(null);
    setCurResults([]);

    try {
      const results = await KakaoAPI(searchQuery);
      setSearchResults(results);
      setCurrentPage(1);
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
    }

  };

  return (
    <div className='search-container'>
      <div className="sidebar">
        {searchResults.length > 0 && !CurResults.length && (
          <>
            {searchResults
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((restaurant, index) => (
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
            <PageNation />
          </>
        )}

        {CurResults.length > 0 && (
          <>
            {CurResults
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((restaurant, index) => (
                <div key={index} className="result-item">
                  <div className="title-category">
                    <h3 className='title'>
                      <a href="#" onClick={(e) => { e.preventDefault(); openModal(restaurant.place_url); }}>
                        {restaurant.place_name}
                      </a>
                    </h3>
                    <p className='category'>{restaurant.category_name.split(' > ').pop()}</p>
                  </div>
                  <p className='address'>
                    <FaMapMarkerAlt className='address-icon' />
                    {restaurant.address_name}
                  </p>
                  <p className='tel'>
                    <FaPhone className='tel-icon' />
                    {restaurant.phone}
                  </p>
                </div>
              ))}
            <PageNation />
          </>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} content={content} />
    </div>
  );
};

export default Search;
