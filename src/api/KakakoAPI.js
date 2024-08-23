  import axios from 'axios';

  export const KakaoAPI = async (query) => {
    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: { query }
      });
      
      return response.data.documents; 
    } catch (error) {
      console.error('API 호출 실패:', error);
      return [];
    }
  };
