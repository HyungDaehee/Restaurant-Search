import axios from 'axios';

export const KakaoAPI = async (query) => {
    try {
        const response = await axios.get('https://express-server-olive.vercel.app/api/search', {
            params: { query }
        });

        return response.data;
    } catch (error) {
        console.error('API 호출 실패:', error);
        return [];
    }
};
