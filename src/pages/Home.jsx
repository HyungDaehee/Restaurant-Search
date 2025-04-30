import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAddressStore from '../store/AddressStore';
import Address from '../components/Address/Address.jsx';
import NavBar from '../components/Nav/NavBar.jsx';
import SearchInput from '../components/input/SearchInput.jsx';
import '../styles/Home.scss';

const Home = () => {
    const { shortAddress } = useAddressStore();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (shortAddress.trim()) {
            navigate(`/Search?query=${shortAddress}`);
        } else {
            console.log("주소가 비어있습니다.");
        }
    };

    return (
        <div className='home-container'>
            <div className='intro'>
                <div className='navbar'><NavBar /></div>
                <div className='address'><Address /></div>
                <div className='input'><SearchInput /> </div>
            </div>
        </div>
    );
};

export default Home;
