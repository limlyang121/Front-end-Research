// import React, { useState, useRef } from 'react';
// import { Swipeable } from 'react-swipeable'; // Import Swipeable

// export default function LandingBox() {
//   const [activeSlide, setActiveSlide] = useState(0); // Track active slide index
//   const swipeRef = useRef(null); // Ref for swipe box element

//   const handleSwipeStart = () => {
//     // Reset translation on swipe start
//   };

//   const handleSwipeMove = (eventData) => {
//     // Implement smooth dragging animation (optional)
//   };

//   const handleSwipeEnd = (eventData) => {
//     const threshold = swipeRef.current.offsetWidth * 0.2; // Adjust swipe threshold
//     const numSlides = swipeRef.current.children.length - 1; // Calculate number of slides

//     if (eventData.deltaX > threshold) {
//       // Swipe right (previous slide)
//       setActiveSlide(Math.max(activeSlide - 1, 0)); // Clamp to 0 (first slide)
//     } else if (eventData.deltaX < -threshold) {
//       // Swipe left (next slide)
//       setActiveSlide(Math.min(activeSlide + 1, numSlides)); // Clamp to numSlides (last slide)
//     }
//   };

//   // Content for each slide (replace with your actual content)
//   const slides = [
//     <div className="slide">Slide 1 content</div>,
//     <div className="slide">Slide 2 content</div>,
//     // Add more slides as needed
//   ];

//   return (
//     <Swipeable
//       onSwipedLeft={handleSwipeEnd}
//       onSwipedRight={handleSwipeEnd}
//       onSwipeStart={handleSwipeStart}
//       onSwiping={handleSwipeMove} // Optional: Handle dragging
//       ref={swipeRef}
//       style={{ overflowX: 'hidden' }} // Prevent horizontal scrollbar
//     >
//       <div className="landingbox">
//         {slides.map((slide, index) => (
//           <div
//             key={index} // Key for each slide (important for React)
//             style={{
//               display: 'inline-block', // Display slides side-by-side
//               width: '100%', // Ensure slides fill the swipeable area
//               transform: `translateX(-${activeSlide * 100}%)`, // Translate slides based on active index
//             }}
//           >
//             {slide}
//           </div>
//         ))}
//       </div>
//     </Swipeable>
//   );
// }
