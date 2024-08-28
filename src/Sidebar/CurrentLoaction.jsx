<<<<<<< HEAD
import React, { useState } from 'react';
import { TbCurrentLocation } from "react-icons/tb";
import './CurrentLocation.scss';

export const CurrentLocation = ({ onLocationChange }) => {
    const [error, setError] = useState(null);

    const getCurrentLocation = () => {
        const success = (position) => {
            const lat = position.coords.latitude; 
            const lon = position.coords.longitude; 
            const loc = { lat, lon };
            onLocationChange(loc);
           
        };

        const error = (error) => {
            setError(error.message);
            
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <button className='current' onClick={getCurrentLocation}><TbCurrentLocation />내 위치</button>
        </div>
    );
};
=======
import React, { useState } from 'react';
import { TbCurrentLocation } from "react-icons/tb";

export const CurrentLocation = ({ onLocationChange }) => {
    const [error, setError] = useState(null);

    const getCurrentLocation = () => {
        const success = (position) => {
            const lat = position.coords.latitude; 
            const lon = position.coords.longitude; 
            const loc = { lat, lon };
            onLocationChange(loc);
           
        };

        const error = (error) => {
            setError(error.message);
            
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <button onClick={getCurrentLocation}><TbCurrentLocation /></button>
        </div>
    );
};
>>>>>>> 6a36482cd8deb2c2ec448fa19307072da7a6d8f3
