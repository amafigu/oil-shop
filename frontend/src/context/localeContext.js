import React, { createContext, useContext, useState } from "react"
import de from "../i18n/de.json"
import en from "../i18n/en.json"

const languages = { en, de }

export const LocaleContext = createContext()

export const LocaleContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  return (
    <LocaleContext.Provider
      value={{ translate: languages[language], language, setLanguage }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocaleContext = () => useContext(LocaleContext)
