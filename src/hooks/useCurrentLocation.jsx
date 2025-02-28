import { useState } from 'react';
import { AddressCoordinates } from '../api/Kakao_Address_api.js';

const useCurrentLocation = () => {
    const [address, setAddress] = useState('');

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setAddressCoordinates(latitude, longitude);
                },
                (error) => {
                    console.error("위치 정보 오류:", error);
                }
            );
        }
    };

    const setAddressCoordinates = async (latitude, longitude) => {
        const shortAddress = await AddressCoordinates(latitude, longitude);
        setAddress(shortAddress);
    };

    return {
        address,
        getCurrentLocation,
    };
};

export default useCurrentLocation;
