import { TEASER_VIDEOS } from "#utils/constants"
import React, { useCallback, useEffect, useState } from "react"
import styles from "./carousel.module.scss"

const Carousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const nextVideo = useCallback(() => {
    const newIndex = currentVideoIndex + 1
    setCurrentVideoIndex(newIndex >= TEASER_VIDEOS.length ? 0 : newIndex)
  }, [currentVideoIndex])

  const previousVideo = useCallback(() => {
    const newIndex = currentVideoIndex - 1
    setCurrentVideoIndex(newIndex < 0 ? TEASER_VIDEOS.length - 1 : newIndex)
  }, [currentVideoIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      nextVideo()
    }, 15000)

    return () => clearInterval(timer)
  }, [nextVideo])

  const currentVideo = TEASER_VIDEOS[currentVideoIndex]
  const videoSrc = `https://www.youtube.com/embed/${currentVideo.id}?start=${currentVideo.start}&end=${currentVideo.end}&autoplay=1&loop=1&playlist=${currentVideo.id}&controls=0&modestbranding=1&mute=1`

  return (
    <div className={styles.carouselWrapper}>
      <button
        className={`material-symbols-outlined ${styles.iconSlider}`}
        onClick={previousVideo}
      >
        arrow_back_ios
      </button>
      <div className={styles.videoWrapper}>
        <iframe
          key={videoSrc}
          className={styles.iframeVideo}
          src={videoSrc}
          title='teaser video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        ></iframe>
        <div className={styles.borderDiv}></div>
      </div>

      <button
        onClick={nextVideo}
        className={`material-symbols-outlined ${styles.iconSlider}`}
      >
        arrow_forward_ios
      </button>
    </div>
  )
}

export default Carousel
