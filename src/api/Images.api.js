import axios from 'axios';

const API_KEY = '6116026697d7c84da46212493aef754b';
const apiUrl = 'https://api.pexels.com/v1/search';

export const fetchImages = async (query = 'korean restaurant') => {
  const response = await axios.get(apiUrl, {
    headers: { Authorization: API_KEY },
    params: { query, page: 2, per_page: 20 },
  });
  return response.data.photos.filter((image) => image.width > image.height);
};
