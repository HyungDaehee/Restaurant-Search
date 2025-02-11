import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import './Slider.scss';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


export const SliderImg = () => {
  const [images, setImages] = useState([]);


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
    };
    fetchImages();
  }, []);

  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className='carousel-cantainer'>
      <div className="carousel-box">
        <h2 className='carousel-header'>#이런 음식 어때?</h2>
        <div className="carousel">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={5}
            slidesPerView={4}
            autoplay={{
              delay: 2000,
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
      </div>
      <button className="next-btn" onClick={handleNext}><MdOutlineKeyboardArrowRight /></button>
      <button className="prev-btn" onClick={handlePrev}><MdOutlineKeyboardArrowLeft /></button>
    </div>
  );
};
