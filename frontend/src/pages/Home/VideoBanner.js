import { VIDEO_BANNER_PATH } from "#constants/constants"
import React from "react"
import styles from "./videoBanner.module.scss"

export const VideoBanner = () => {
  return (
    <div className={styles.videoBannerWrapper}>
      <div className={styles.outerContainer}>
        <div className={styles.videoWrapper}>
          <video
            aria-label='background video'
            autoPlay
            muted
            playsInline
            loop
            className={styles.video}
            src={VIDEO_BANNER_PATH}
            title='background video'
            type='video/mp4'
          ></video>
        </div>
      </div>
    </div>
  )
}
