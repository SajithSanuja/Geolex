import React, { useState, useEffect, useCallback } from "react";

interface BannerProps {
  images: string[];
  height?: string;
  autoSlideInterval?: number;
}

const Banner: React.FC<BannerProps> = ({
  images,
  height = "h-96",
  autoSlideInterval = 3000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  useEffect(() => {
    // Initialize loading states
    setImagesLoaded(new Array(images.length).fill(false));
  }, [images.length]);

  // Optimize image transitions and reduce repaints
  const goToSlide = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  // Optimize the main container
  return (
    <div
      className={`relative w-full ${height} overflow-hidden bg-gray-900 rounded-lg shadow-lg`}
      style={{
        transform: "translateZ(0)", // Force hardware acceleration
        willChange: "auto",
      }}
    >
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "translateZ(0)",
            willChange: index === currentImageIndex ? "opacity" : "auto",
          }}
        >
          <img
            src={image}
            alt={`Banner ${index + 1}`}
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
              width: "100%",
              height: "100%",
              transform: "translateZ(0)", // Hardware acceleration
              imageRendering: "auto",
            }}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/30 ${
                index === currentImageIndex
                  ? "bg-white scale-150"
                  : "bg-white/40 hover:bg-white/70 hover:scale-125"
              }`}
              style={{
                width: "10px",
                height: "10px",
                minWidth: "10px",
                minHeight: "10px",
                maxWidth: "10px",
                maxHeight: "10px",
                borderRadius: "50%",
                border: "none",
                padding: "0",
                flexShrink: 0,
              }}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows for larger screens */}
      {images.length > 1 && (
        <>
          {/* Previous Arrow */}
          <button
            onClick={() =>
              goToSlide(
                currentImageIndex === 0
                  ? images.length - 1
                  : currentImageIndex - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 opacity-75 hover:opacity-100"
            aria-label="Previous image"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            onClick={() =>
              goToSlide(
                currentImageIndex === images.length - 1
                  ? 0
                  : currentImageIndex + 1
              )
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 opacity-75 hover:opacity-100"
            aria-label="Next image"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Banner;
