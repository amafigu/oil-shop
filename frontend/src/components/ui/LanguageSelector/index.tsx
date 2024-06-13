import { ActionButton } from "#components/ui/ActionButton"
import { LOGIN, SIGN_UP } from "#constants/routes"
import { STYLES } from "#constants/styles"
import { useMenuOptions } from "#hooks/useMenuOptions"
import { useTranslation } from "#hooks/useTranslation"
import { useLocation } from "react-router-dom"
import styles from "./languageSelector.module.scss"

export const LanguageSelector = () => {
  const { setLanguage, language } = useTranslation()
  const { setShowMobileMenu } = useMenuOptions()

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowMobileMenu(false)
  }

  const location = useLocation()
  const currentPath = location.pathname

  return (
    <ul
      className={styles.list}
      style={
        currentPath.includes(SIGN_UP) || currentPath.includes(LOGIN)
          ? { margin: "0" }
          : {}
      }
    >
      <li
        className={`${styles.item} ${language === "en" ? styles.active : ""}`}
      >
        <ActionButton
          action={() => changeLanguage("en")}
          text={"EN"}
          className={STYLES.BUTTONS.LANGUAGES_SELECTOR}
          ariaLabel={"translate to english"}
        />
      </li>
      <li className={styles.divider}>I</li>
      <li
        className={`${styles.item} ${language === "de" ? styles.active : ""}`}
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
