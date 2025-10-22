import { useEffect, useState } from 'react';
import Loginbanner from '../../assets/Loginbanner.png';
import { LogoIcon } from '../Common/SVG/svg.function';

export default function LeftPanel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className='hidden md:flex md:w-1/2 bg-[#47136B] my-4 mx-4 p-4 lg:p-8 xl:p-10 flex-col justify-between items-center rounded-xl'>
      <div className='w-full flex justify-start'>
        <div className='flex items-center'>
          <div className='text-white font-bold flex items-center'>
            <LogoIcon />
            <span className='text-xl md:text-2xl ml-2'>Metie</span>
          </div>
        </div>
      </div>

      <div className='relative w-full max-w-xs md:max-w-sm lg:max-w-md'>
        <div className='relative z-10'>
          <img src={Loginbanner} alt='App showcase' className='w-full h-auto' />
        </div>
        <div className='absolute -z-10 bg-purple-800 rounded-full w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
      </div>

      <div className='text-center w-full max-w-xs md:max-w-sm lg:max-w-md'>
        <h2 className='text-lg md:text-xl lg:text-2xl font-bold mb-2 text-white'>
          {slides[currentSlide].title}
        </h2>
        <p className='text-gray-300 text-xs md:text-sm lg:text-base'>
          {slides[currentSlide].subtitle}
        </p>

        <div className='flex justify-center mt-4 md:mt-6 space-x-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
