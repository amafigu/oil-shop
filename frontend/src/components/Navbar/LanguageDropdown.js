import useLocaleContext from "#context/localeContext"
import React, { useEffect, useRef, useState } from "react"
import styles from "./LanguageDropdown.module.scss"

const LanguageDropdown = () => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const { setLanguage } = useLocaleContext()

  useEffect(() => {
    const listenClickOutsideLanguageDropdown = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", listenClickOutsideLanguageDropdown)
    return () => {
      document.removeEventListener(
        "mousedown",
        listenClickOutsideLanguageDropdown,
      )
    }
  }, [])
  const handleChangeLanguage = (lang) => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  const languageDropdownRef = useRef(null)

  return (
    <div ref={languageDropdownRef} className={styles.languageDropdownWrapper}>
      <div
        className={
          isLanguageDropdownOpen
            ? styles.dropdown
            : `${styles.dropdown} ${styles.hideDropdown}`
        }
      >
        <img
          tabIndex={isLanguageDropdownOpen ? 0 : -1}
          src={`${process.env.PUBLIC_URL}/assets/united-kingdom.png`}
          onClick={() => handleChangeLanguage("en")}
          alt='en'
        ></img>
        <img
          tabIndex={isLanguageDropdownOpen ? 0 : -1}
          src={`${process.env.PUBLIC_URL}/assets/germany.png`}
          onClick={() => handleChangeLanguage("de")}
          alt='de'
        ></img>
      </div>

      <span
        tabIndex={0}
        className={`${styles.openCloseButton} material-symbols-outlined`}
        onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
      >
        language
      </span>
    </div>
  )
}

export default LanguageDropdown
