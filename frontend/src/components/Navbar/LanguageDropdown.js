import useLocaleContext from "#context/localeContext"
import React from "react"
import styles from "./LanguageDropdown.module.scss"

const LanguageDropdown = ({ setMenuOpen }) => {
  const { setLanguage, language } = useLocaleContext()

  const handleChangeLanguage = (lang) => {
    setLanguage(lang)
    if (setMenuOpen) {
      setMenuOpen(false)
    }
  }

  return (
    <ul className={styles.dropdownMenu}>
      <li
        className={`${styles.listItem} ${
          language === "en" ? styles.activeCategory : ""
        }`}
        onClick={() => handleChangeLanguage("en")}
      >
        <span className={styles.linkContent}>EN</span>
      </li>
      <li
        className={`${styles.listItem} ${
          language === "de" ? styles.activeCategory : ""
        }`}
        onClick={() => handleChangeLanguage("de")}
      >
        <span className={styles.linkContent}>DE</span>
      </li>
    </ul>
  )
}

export default LanguageDropdown
