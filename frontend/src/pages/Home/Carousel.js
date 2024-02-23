import { TEASER_VIDEOS } from "#utils/constants"
import React, { useCallback, useEffect, useRef, useState } from "react"
import styles from "./carousel.module.scss"

export const Carousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const nextVideo = useCallback(() => {
    const newIndex = currentVideoIndex + 1
    setCurrentVideoIndex(newIndex >= TEASER_VIDEOS.length ? 0 : newIndex)
  }, [currentVideoIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      nextVideo()
    }, 15000)

    return () => clearInterval(timer)
  }, [nextVideo])

  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const currentVideo = TEASER_VIDEOS[currentVideoIndex]
  const videoSrc = `${process.env.PUBLIC_URL}/assets/${currentVideo.id}.mp4`

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.outerContainer}>
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className={styles.video}
            src={videoSrc}
            title='teaser video'
            type='video/mp4'
          ></video>
        </div>
      </div>
    </div>
  )
}
