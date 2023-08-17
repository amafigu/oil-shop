import React, { useCallback, useEffect, useState } from "react"
import styles from "./carousel.module.scss"

const videos = [
  { id: "YHYuQFBrJVc", start: 170, end: 185 },
  { id: "yicHmCVxmNQ", start: 16, end: 31 },
]

const Carousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const nextVideo = useCallback(() => {
    const newIndex = currentVideoIndex + 1
    setCurrentVideoIndex(newIndex >= videos.length ? 0 : newIndex)
  }, [currentVideoIndex])

  const previousVideo = useCallback(() => {
    const newIndex = currentVideoIndex - 1
    setCurrentVideoIndex(newIndex < 0 ? videos.length - 1 : newIndex)
  }, [currentVideoIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      nextVideo()
    }, 15000)

    return () => clearInterval(timer)
  }, [nextVideo])

  const currentVideo = videos[currentVideoIndex]
  const videoSrc = `https://www.youtube.com/embed/${currentVideo.id}?start=${currentVideo.start}&end=${currentVideo.end}&autoplay=1&loop=1&playlist=${currentVideo.id}&controls=0&modestbranding=1&mute=1`

  return (
    <div className={styles.carousel}>
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
