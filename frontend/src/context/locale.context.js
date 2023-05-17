import React, { createContext, useContext } from "react"

import deDe from "../i18n/de.json"
import enEn from "../i18n/en.json"

const LocaleContext = createContext({
  translate: enEn,
})

export const LocaleContextProvider = ({ children }) => {
  return (
    <LocaleContext.Provider value={{ translate: enEn }}>
      {children}
    </LocaleContext.Provider>
  )
}

const useLocaleContext = () => useContext(LocaleContext)

export default useLocaleContext
