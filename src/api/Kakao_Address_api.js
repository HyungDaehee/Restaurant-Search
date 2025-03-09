import axios from 'axios';

<<<<<<< HEAD
const KaKaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY;
=======
const KaKaoAPI = '6116026697d7c84da46212493aef754b';
>>>>>>> c97f007 (서버 도메인 설정)
const apiUrl = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';

export const AddressCoordinates = async (latitude, longitude) => {
    const { data } = await axios.get(apiUrl, {
        params: { x: longitude, y: latitude },
        headers: { Authorization: `KakaoAK ${KaKaoAPI}` },
    });

    if (data.documents && data.documents.length > 0) {
        const fullAddress = data.documents[0].address.address_name;
        const shortAddress = fullAddress.split(' ').slice(1, 3).join(' ');
        return shortAddress
    }
};