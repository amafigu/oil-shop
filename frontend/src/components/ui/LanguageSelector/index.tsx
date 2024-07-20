import { ActionButton } from "@/components/ui/ActionButton"
import { LOGIN, SIGN_UP } from "@/constants/routes"
import { STYLES } from "@/constants/styles"
import { useMenuContext } from "@/context/menuContext"
import { useTranslation } from "@/hooks/useTranslation"
import { useLocation } from "react-router-dom"
import styles from "./languageSelector.module.scss"

export const LanguageSelector = () => {
  const { setLanguage, language } = useTranslation()
  const { setShowMobileMenu } = useMenuContext()
  const location = useLocation()
  const currentPath = location.pathname

  type Langs = "de" | "en"

  const changeLanguage = (lang: Langs) => {
    setLanguage(lang)
    setShowMobileMenu(false)
  }

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
        />
      </li>
    </ul>
  )
}
