import { useState, useEffect } from 'react';
import { fetchImages } from '../api/Images.api';

const useSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const imagesData = await fetchImages();
      setImages(imagesData);
    };

    getImages();
  }, []);

  return images;
};

export default useSlider;
