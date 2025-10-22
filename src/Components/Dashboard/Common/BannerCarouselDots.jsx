// src/Components/BannerCarousel/BannerCarouselDots.jsx
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import BannerSlide from './BannerSlide';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const slides = [
//   {
//     title: "Fallback 1",
//     description: "Fallback",
//     image: "https://placehold.co/400x300",
//     buttonText: "View",
//     buttonLink: "#",
//   },
//   {
//     title: "Fallback 2",
//     description: "Fallback2",
//     image: "https://placehold.co/400x300",
//     buttonText: "View",
//     buttonLink: "#",
//   },
// ];

const BannerCarouselDots = ({ slides = [] }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false, // We'll use custom dots
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: false,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  if (!slides || slides.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl'>
        <p className='text-white'>No banners available</p>
      </div>
    );
  }

  return (
    <div className='relative w-full h-full overflow-hidden rounded-2xl'>
      {/* Main Slider */}
      <Slider ref={sliderRef} {...settings} className='h-full'>
        {slides.map((s, i) => (
          <div key={i} className='w-full h-full outline-none'>
            <BannerSlide {...s} />
          </div>
        ))}
      </Slider>

      {/* Custom Circle Dots Indicator */}
      <div className='absolute z-10 transform -translate-x-1/2 bottom-4 left-1/2'>
        <div className='flex items-center px-3 py-2 space-x-2 rounded-full bg-black/40 backdrop-blur-sm'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => sliderRef.current?.slickGoTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8 h-2' // Active dot: 2px height, 8px width (horizontal line)
                  : 'bg-white/40 w-2 h-2' // Inactive dot: small circle
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarouselDots;
