import React, { useState, useEffect, useRef } from 'react';

function CustomSlider({ images, autoplay = false, transitionSpeed = 500 }) {
   const [currentSlide, setCurrentSlide] = useState(0);
   const slideRef = useRef(null);

   // Handle autoplay using useEffect
   useEffect(() => {
       if (autoplay) {
           const intervalId = setInterval(() => {
               setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
           }, transitionSpeed);
           return () => clearInterval(intervalId);
       }
   }, [autoplay, images.length, transitionSpeed]);

   const handleNext = () => {
       const nextSlide = (currentSlide + 1) % images.length;
       setCurrentSlide(nextSlide);
       slideRef.current.style.transform = `translateX(-${nextSlide * 100}%)`;
   };

   const handlePrev = () => {
       const prevSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
       setCurrentSlide(prevSlide);
       slideRef.current.style.transform = `translateX(-${prevSlide * 100}%)`;
   };

   return (
       <div className="custom-slider">
           <div className="slider-container" ref={slideRef}>
               {images.map((image, index) => (
                   <div key={index} className="slide">
                       {/* Your slide content here */}
                   </div>
               ))}
           </div>
           <button onClick={handlePrev}>Prev</button>
           <button onClick={handleNext}>Next</button>
           <div className="dots">
               {images.map((_, index) => (
                   <div
                       key={index}
                       className={`dot ${currentSlide === index ? 'active' : ''}`}
                       onClick={() => setCurrentSlide(index)}
                   />
               ))}
           </div>
       </div>
   );
}

export default CustomSlider;
