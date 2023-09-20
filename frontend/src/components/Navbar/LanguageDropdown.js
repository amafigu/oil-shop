import useLocaleContext from "#context/localeContext"
import React from "react"
import styles from "./LanguageDropdown.module.scss"

const LanguageDropdown = ({ setMenuOpen }) => {
  const { setLanguage } = useLocaleContext()

  const handleChangeLanguage = (lang) => {
    console.log("handleLanguage", lang)
    setLanguage(lang)
    setMenuOpen(false)
  }

  return (
    <ul className={styles.dropdownMenu}>
      <li
        className={styles.listItem}
        onClick={() => handleChangeLanguage("en")}
      >
        <span className={styles.linkContent}>EN</span>
      </li>
      <li
        className={styles.listItem}
        onClick={() => handleChangeLanguage("de")}
      >
        <span className={styles.linkContent}>DE</span>
      </li>
    </ul>
  )
}

export default LanguageDropdown
