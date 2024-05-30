import { VIDEO_BANNER_PATH } from "#constants/media"
import React from "react"
import styles from "./banner.module.scss"

export const Banner = () => {
  return (
    <div className={styles.wrapper} aria-label='page banner'>
      <div className={styles.container}>
        <div className={styles.content}>
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
