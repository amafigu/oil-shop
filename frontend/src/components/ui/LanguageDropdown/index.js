import { ROUTES_LOGIN, ROUTES_SIGN_UP } from "#constants/routes"
import { useTranslation } from "#hooks/useTranslation"
import React from "react"
import { useLocation } from "react-router-dom"
import styles from "./LanguageDropdown.module.scss"

const LanguageDropdown = ({ setMenuOpen }) => {
  const { setLanguage, language } = useTranslation()

  const handleChangeLanguage = (lang) => {
    setLanguage(lang)
    if (setMenuOpen) {
      setMenuOpen(false)
    }
  }

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <ul
      className={styles.dropdownMenu}
      style={
        currentPath.includes(ROUTES_SIGN_UP) ||
        currentPath.includes(ROUTES_LOGIN)
          ? { margin: "0" }
          : {}
      }
    >
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
