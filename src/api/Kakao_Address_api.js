import axios from 'axios';

const KaKaoAPI = process.env.REACT_APP_KAKAO_REST_API_KEY;
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