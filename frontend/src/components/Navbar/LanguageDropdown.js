import useLocaleContext from "#context/localeContext"
import React, { useState } from "react"
import styles from "./LanguageDropdown.module.scss"

const LanguageDropdown = () => {
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const { setLanguage } = useLocaleContext()

  const handleChangeLanguage = (lang) => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  return (
    <div>
      <span
        className='material-symbols-outlined'
        onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
      >
        language
      </span>
      {isLanguageDropdownOpen && (
        <div>
          <div className={styles.dropdown}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/united-kingdom.png`}
              onClick={() => handleChangeLanguage("en")}
              alt='en'
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/assets/germany.png`}
              onClick={() => handleChangeLanguage("de")}
              alt='de'
            ></img>
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
