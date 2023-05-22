import React, { useState, useEffect } from 'react';
import styles from './Carrousel.module.css'

const images = [
  process.env.PUBLIC_URL + '/assets/' +  'bannerHomePage1.png',
  process.env.PUBLIC_URL + '/assets/' +  'bannerHomePage2.png',
  process.env.PUBLIC_URL +'/assets/' +   'bannerHomePage3.png',
  process.env.PUBLIC_URL + '/assets/'  +   'bannerHomePage4.png',
  process.env.PUBLIC_URL + '/assets/' +    'bannerHomePage5.png',
];


const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const nextImage = () => {

    const newIndex = currentImageIndex + 1;
    setCurrentImageIndex(newIndex >= images.length ? 0 : newIndex);
  };

  const previousImage = () => {
    const newIndex = currentImageIndex - 1;
    setCurrentImageIndex(newIndex < 0 ? images.length - 1 : newIndex);
  };

  return (
    <div className={styles.carousel}>
    <button className={`${styles.previous}`} onClick={previousImage}>
      <span class="material-symbols-outlined">
        arrow_back_ios
      </span>
    </button>
    <img classeName={styles.image} src={images[currentImageIndex]} alt="" />
    <button className={`${styles.next}`} onClick={nextImage}>
      <span class="material-symbols-outlined">
        arrow_forward_ios
      </span>
    </button>
  </div>
  );
};

export default Carousel;
