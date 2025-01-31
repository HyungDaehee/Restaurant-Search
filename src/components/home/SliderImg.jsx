import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import './Slider.scss'

export const SliderImg = () => {
  const [images, setImages] = useState([])
 
  useEffect(() => {
    const fetchImages = async () => {
      const API_KEY = 'HUUJhxoA88kcYcgeGlrTLGAvZLdEYJJApvlLE3LcaBsnqEN77oeYAurj';
      const response = await fetch('https://api.pexels.com/v1/search?query=korean%30restaurant&page=2&per_page=20', {
        headers: {
          Authorization: API_KEY,
        },
      });

      const data = await response.json();
      const FillterImages = data.photos.filter((image) => 
        image.width > image.height);
      setImages(FillterImages);
    }
    fetchImages();
  }, [])
  return (
    <div className="carousel">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={5}
        slidesPerView={4}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay:2000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.src.medium}
              alt={image.alt}
              className="Swiper-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
