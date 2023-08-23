import { useEffectScrollTop } from "#utils/utils"
import React from "react"
import styles from "./about.module.scss"

const About = () => {
  useEffectScrollTop()
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.page}>
        <div className={styles.text}>
          Hi, thanks for visiting my portfolio app.
        </div>

        <div className={styles.text}>
          To see the git please go to https://github.com/amafigu/oil-shop
        </div>
      </div>
    </div>
  )
}

export default About
