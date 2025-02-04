import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Address.scss'

const Address = () => {
    const [address, setAddress] = useState('');

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    const KaKaoAPI = '6116026697d7c84da46212493aef754b';
                    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

                    axios.get(url, {
                        headers: {
                            Authorization: `KakaoAK ${KaKaoAPI}`,
                        },
                    }).then((response) => {
                        const data = response.data;
                        if (data.documents && data.documents.length > 0) {
                            const foundAddress = data.documents[0].address.address_name;
                            const addressParts = foundAddress.split(' ');
                            const titleAddress = addressParts.slice(1, 3).join(' ');
                            setAddress(titleAddress);
                            console.log('주소:', titleAddress);
                        } else {
                            console.log('주소 정보를 찾을 수 없습니다.');
                        }


                    });
                },

            );
        }
    };

    return (
        <div className='current-container'>
            <div className='t1'>당신을 위한</div>
            <div className='sec'>
                <div className='t2'>{address || '동네 맛집'}</div>
                <div className='t3'>맛집 찾기</div>
            </div>
            <div className='cur-btn' onClick={getCurrentLocation}>
                현재 위치 설정
            </div>
        </div>
    );
};

export default Address;
