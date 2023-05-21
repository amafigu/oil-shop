import React, { useState } from 'react';
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

  const nextImage = () => {
    console.log('nextImage currentImageIndex ', currentImageIndex)
    const newIndex = currentImageIndex + 1;
    console.log('nextImage newIndex ', newIndex)
    setCurrentImageIndex(newIndex >= images.length ? 0 : newIndex);
  };

  const previousImage = () => {
    console.log('previousImage  currentImageIndex ', currentImageIndex)
    const newIndex = currentImageIndex - 1;
    console.log('previousImage newIndex ', newIndex)
    setCurrentImageIndex(newIndex < 0 ? images.length - 1 : newIndex);
  };

  return (
    <div className={styles.carousel}>
    <button className={`${styles.carousel} ${styles.previous}`} onClick={previousImage}>Previous</button>
    <img classeName={styles.image} src={images[currentImageIndex]} alt="" />
    <button className={`${styles.carousel} ${styles.next}`} onClick={nextImage}>Next</button>
  </div>
  );
};

export default Carousel;
