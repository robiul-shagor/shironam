import { useState, useEffect } from 'react';

const ProgressiveImage = ({ src, placeholder, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setIsLoading(false);
      setCurrentSrc(src);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      style={{
        filter: isLoading ? 'blur(20px)' : 'none',
        transition: 'filter 0.3s ease-in-out',
      }}
      alt={alt}
    />
  );
};

export default ProgressiveImage;
