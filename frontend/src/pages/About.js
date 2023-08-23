import React from "react"
import useLocaleContext from "../context/localeContext"
import styles from "./about.module.scss"

const About = () => {
  const { translate } = useLocaleContext()
  const text = translate.pages.about

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
