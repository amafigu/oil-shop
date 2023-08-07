import React from "react"
import styles from "./about.module.scss"
import useLocaleContext from "../context/localeContext"

const About = () => {
  const { translate } = useLocaleContext()
  const text = translate.pages.about

  return (
    <div className={styles.rootDiv}>
      <div className={styles.text}>{text.title}</div>
      <div className={styles.text}>{text.teaser}</div>
    </div>
  )
}

export default About
