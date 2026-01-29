// PhotoSampler.tsx
// Interactive portrait that cycles through multiple images when clicked
// Ported from the original site's vanilla JS implementation

import { useState } from "react";
import QRCodeOverlay from "./QRCodeOverlay.tsx";

// Array of image filenames to cycle through
const images = [
  "portrait.jpg",
  "snowboarding-alps.jpg",
  "bikes.jpg",
  "cold-california.jpg",
];

type PhotoSamplerProps = {
  showQr?: boolean;
};

export default function PhotoSampler({ showQr = false }: PhotoSamplerProps) {
  // Track which image is currently displayed
  const [imageIndex, setImageIndex] = useState(0);

  // Cycle to the next image when clicked
  const handleClick = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="photo-sampler">
      <div className="photo-frame">
        <img
          src={`images/${images[imageIndex]}`}
          alt="Emily's photo"
          onClick={handleClick}
        />
        {showQr && (
          <div className="photo-qr-overlay" aria-hidden="true">
            <QRCodeOverlay
              className="photo-qr-code"
              data="https://emilypakulski.com"
              size={240}
            />
          </div>
        )}
      </div>
      <div className="photo-hint">
        tap pic for good memories sampler
      </div>
    </div>
  );
}
