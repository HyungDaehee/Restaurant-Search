import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import useImages from '../../hooks/useSlider.jsx';
import useResponsiveSlides from '../../hooks/useResponsiveSlides';
import '../../styles/Slider.scss';

const SliderImg = () => {
  const images = useImages();
  const slidesPerView = useResponsiveSlides();
  const swiperRef = useRef(null);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className='carousel-container'>
      <div className="carousel-box">
        <h2 className='carousel-header'>#이런 음식 어때?</h2>
        <div className="carousel">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={5}
            slidesPerView={slidesPerView}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
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
      <button className="next-btn" onClick={handleNext}>
        <MdOutlineKeyboardArrowRight />
      </button>
      <button className="prev-btn" onClick={handlePrev}>
        <MdOutlineKeyboardArrowLeft />
      </button>
    </div>
  );
};

export default SliderImg;
