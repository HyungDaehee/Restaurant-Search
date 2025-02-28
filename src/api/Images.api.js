import axios from 'axios';

const API_KEY = process.env.REACT_APP_IMAGES_API_KEY;
const apiUrl = 'https://api.pexels.com/v1/search';

export const fetchImages = async (query = 'korean restaurant') => {
  const response = await axios.get(apiUrl, {
    headers: { Authorization: API_KEY },
    params: { query, page: 2, per_page: 20 },
  });
  return response.data.photos.filter((image) => image.width > image.height);
};
