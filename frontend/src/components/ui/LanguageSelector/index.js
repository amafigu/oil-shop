import { ActionButton } from "#components/ui/ActionButton"
import { ROUTES_LOGIN, ROUTES_SIGN_UP } from "#constants/routes"
import { STYLES } from "#constants/styles"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { useTranslation } from "#hooks/useTranslation"
import { useLocation } from "react-router-dom"
import styles from "./languageSelector.module.scss"

export const LanguageSelector = ({ setShowLanguagesOptions }) => {
  const { setLanguage, language } = useTranslation()
  const { setShowMobileMenu } = useMenuOptions()

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowMobileMenu(false)
    setShowLanguagesOptions(false)
  }

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <ul
      className={styles.languageSelector}
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
      >
        <ActionButton
          action={() => changeLanguage("en")}
          text={"EN"}
          className={STYLES.BUTTONS.LANGUAGES_SELECTOR}
          ariaLabel={"translate to english"}
        />
      </li>
      <li
        className={`${styles.listItem} ${
          language === "de" ? styles.activeCategory : ""
        }`}
      >
        <ActionButton
          action={() => changeLanguage("de")}
          text={"DE"}
          className={STYLES.BUTTONS.LANGUAGES_SELECTOR}
          ariaLabel={"translate to german"}
        />
      </li>
    </ul>
  )
}
