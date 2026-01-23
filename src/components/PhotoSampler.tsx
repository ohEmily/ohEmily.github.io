// PhotoSampler.tsx
// Interactive portrait that cycles through multiple images when clicked
// Ported from the original site's vanilla JS implementation

import { useState } from "react";

// Array of image filenames to cycle through
const images = [
  "portrait.jpg",
  "snowboarding-alps.jpg",
  "bikes.jpg",
  "cold-california.jpg",
];

export default function PhotoSampler() {
  // Track which image is currently displayed
  const [imageIndex, setImageIndex] = useState(0);

  // Cycle to the next image when clicked
  const handleClick = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="photo-sampler">
      <img
        src={`/images/${images[imageIndex]}`}
        alt="Emily's photo"
        onClick={handleClick}
      />
      <div className="photo-hint">
        tap pic for good memories sampler
      </div>
    </div>
  );
}
