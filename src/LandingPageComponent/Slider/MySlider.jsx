import React, { useState } from 'react';
import Slider from 'react-slick';
import "./MySlider.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IDContent, RegisterAndEditContent } from './MySliderText';




const IDContentDisplay = () => (
    <div>
        <IDContent />
    </div>
    // JSX for your ID section content (including table and notes)
);

//   const RegisterAndEditContent = () => (
//     // JSX for your Register & Edit User section content
//   );

//   const SystemWorkContent = () => (
//     // JSX for your How the System Works section content 
//   );


function MySlider() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    const slides = [
        <IDContent />,
        <RegisterAndEditContent />,
        //   <SystemWorkContent />,
    ]; // Assuming you have content for all slides

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div className="slide" key={index}> {/* Add the key prop here */}
                        {slide}
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default MySlider;
