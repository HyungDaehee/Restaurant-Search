import React, { useState } from 'react';
import { NaverAPI } from '../api/NaverAPI.jsx';
import '../Sidebar/Search.scss';
import { CiSearch } from "react-icons/ci";

export const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const items = await NaverAPI(query);
            setResults(items);
            console.log('검색 결과:', items);   
        } catch (err) {
            setError('검색 중 에러 발생');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='search-container'>
            <div className='bar-container'
>            <div className='search-bar'>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='지역,가게명,지하철역 검색'
                />
                <div className='search-i'onClick={handleSearch}><CiSearch /></div>
                </div>
            </div>
            <div className="sidebar">
                {results.length === 0 && !loading && !error && (
                    <p>검색 결과가 없습니다.</p>
                )}
                {results.map((result, index) => (
                    <div key={index} className="result-item">
                        <h4>{result.title}</h4>
                        <p>{result.address}</p>
                        <p>{result.roadAddress}</p>
                        <p>{result.telephone}</p>
                        <p>
                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                                자세히 보기
                            </a>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
