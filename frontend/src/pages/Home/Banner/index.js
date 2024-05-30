import { HOME_BANNER } from "#constants/media"
import React from "react"
import styles from "./banner.module.scss"

export const Banner = () => {
  return (
    <div className={styles.wrapper} aria-label='page banner'>
      <div className={styles.container}>
        <img
          aria-label='banner image'
          src={`${process.env.PUBLIC_URL}${HOME_BANNER}`}
          title='background'
        />
      </div>
    </div>
  )
}
