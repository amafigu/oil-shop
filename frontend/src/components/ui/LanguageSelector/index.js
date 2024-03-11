import { ROUTES_LOGIN, ROUTES_SIGN_UP } from "#constants/routes"
import { useMenuMobile } from "#hooks/useMenuMobile"
import { useTranslation } from "#hooks/useTranslation"
import React from "react"
import { useLocation } from "react-router-dom"
import styles from "./languageSelector.module.scss"

export const LanguageSelector = ({ setShowLanguagesOptions }) => {
  const { setLanguage, language } = useTranslation()
  const { setShowMobileMenu } = useMenuMobile()

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowMobileMenu(false)
    setShowLanguagesOptions(false)
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
        onClick={() => changeLanguage("en")}
      >
        <span className={styles.linkContent}>EN</span>
      </li>
      <li
        className={`${styles.listItem} ${
          language === "de" ? styles.activeCategory : ""
        }`}
        onClick={() => changeLanguage("de")}
      >
        <span className={styles.linkContent}>DE</span>
      </li>
    </ul>
  )
}
